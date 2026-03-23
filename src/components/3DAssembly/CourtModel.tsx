import React, { useRef, useLayoutEffect, useMemo } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useThree } from '@react-three/fiber';

gsap.registerPlugin(ScrollTrigger);

export const CourtModel = () => {
  const groupRef = useRef<THREE.Group>(null);
  const floorRef = useRef<THREE.Group>(null);
  const glassRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Group>(null);
  const polesRef = useRef<THREE.Group>(null);
  const netRef = useRef<THREE.Group>(null);
  
  const { viewport } = useThree();
  const isMobile = viewport.width < 15;
  const scale = isMobile ? 0.4 : 0.9; // Adjusted for better mobile fit

  // Generate realistic diamond chain-link texture for the metal mesh
  const meshTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#000000'; // Transparent part
      ctx.fillRect(0, 0, 256, 256);
      ctx.strokeStyle = '#ffffff'; // Solid part
      ctx.lineWidth = 12;
      ctx.beginPath();
      ctx.moveTo(128, 0);
      ctx.lineTo(256, 128);
      ctx.lineTo(128, 256);
      ctx.lineTo(0, 128);
      ctx.closePath();
      ctx.stroke();
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.anisotropy = 16;
    return tex;
  }, []);

  // Generate realistic turf noise texture
  const turfTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#0A3D91';
      ctx.fillRect(0, 0, 512, 512);
      // Add noise for artificial grass look
      for (let i = 0; i < 100000; i++) {
        ctx.fillStyle = Math.random() > 0.5 ? '#08337A' : '#0C47A8';
        ctx.fillRect(Math.random() * 512, Math.random() * 512, 2, 2);
      }
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(8, 16);
    tex.anisotropy = 16;
    return tex;
  }, []);

  // Generate net texture
  const netTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, 64, 64);
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(32, 0); ctx.lineTo(64, 32); ctx.lineTo(32, 64); ctx.lineTo(0, 32); ctx.closePath();
      ctx.stroke();
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(80, 8);
    tex.anisotropy = 8;
    return tex;
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Initial state: Ground is visible, everything else is hidden far above or below
      gsap.set(floorRef.current!.position, { y: 0 });
      gsap.set(glassRef.current!.position, { y: 35 }); // Hidden far above
      gsap.set(meshRef.current!.position, { y: -35 }); // Hidden far below
      gsap.set(polesRef.current!.position, { y: 45 }); // Hidden far above
      gsap.set(netRef.current!.position, { y: -25 }); // Hidden far below
      
      // Assembly animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '#assembly-container',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.5,
        }
      });

      // Build sequence: Glass (drops down) -> Mesh (rises up) -> Poles (drop down) -> Net (rises up)
      tl.to(glassRef.current!.position, { y: 0, duration: 1.5, ease: "power3.out" }, 0)
        .to(meshRef.current!.position, { y: 0, duration: 1.5, ease: "power3.out" }, 0.2)
        .to(polesRef.current!.position, { y: 0, duration: 1.5, ease: "back.out(1.2)" }, 0.4)
        .to(netRef.current!.position, { y: 0, duration: 1.5, ease: "back.out(1.2)" }, 0.6)
        
        // Hide scroll indicator
        .to('#scroll-indicator', { opacity: 0, y: 20, duration: 0.5 }, 0.8)
        
        // Show hero text at the end
        .to('#hero-text', { opacity: 1, scale: 1, y: 0, duration: 1.5, ease: "power3.out" }, 1.0);

      // Continuous slow rotation
      gsap.to(groupRef.current!.rotation, {
        y: Math.PI * 2,
        duration: 40,
        repeat: -1,
        ease: 'none'
      });
    });

    return () => ctx.revert();
  }, []);

  const courtWidth = 10;
  const courtLength = 20;
  const wallHeight = 3;
  const glassColor = "#e0f7fa";
  const structureColor = "#111111";

  // Clone textures with different repeats for different walls
  const sideMeshTex = meshTexture.clone();
  sideMeshTex.repeat.set(48, 9);
  
  const backMeshTex = meshTexture.clone();
  backMeshTex.repeat.set(30, 9);

  return (
    <group ref={groupRef} scale={scale}>
      {/* 1. FLOOR & LINES */}
      <group ref={floorRef}>
        {/* Turf */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[courtWidth, courtLength]} />
          <meshStandardMaterial map={turfTexture} roughness={0.8} metalness={0.1} />
        </mesh>
        
        {/* Lines (White) */}
        <group position={[0, 0.01, 0]}>
          {/* Perimeter */}
          <mesh position={[0, 0, courtLength/2 - 0.025]} rotation={[-Math.PI/2, 0, 0]} receiveShadow><planeGeometry args={[courtWidth, 0.05]}/><meshStandardMaterial color="#ffffff" roughness={0.9}/></mesh>
          <mesh position={[0, 0, -courtLength/2 + 0.025]} rotation={[-Math.PI/2, 0, 0]} receiveShadow><planeGeometry args={[courtWidth, 0.05]}/><meshStandardMaterial color="#ffffff" roughness={0.9}/></mesh>
          <mesh position={[courtWidth/2 - 0.025, 0, 0]} rotation={[-Math.PI/2, 0, 0]} receiveShadow><planeGeometry args={[0.05, courtLength]}/><meshStandardMaterial color="#ffffff" roughness={0.9}/></mesh>
          <mesh position={[-courtWidth/2 + 0.025, 0, 0]} rotation={[-Math.PI/2, 0, 0]} receiveShadow><planeGeometry args={[0.05, courtLength]}/><meshStandardMaterial color="#ffffff" roughness={0.9}/></mesh>
          
          {/* Service Lines (6.95m from net) */}
          <mesh position={[0, 0, 6.95]} rotation={[-Math.PI/2, 0, 0]} receiveShadow><planeGeometry args={[courtWidth, 0.05]}/><meshStandardMaterial color="#ffffff" roughness={0.9}/></mesh>
          <mesh position={[0, 0, -6.95]} rotation={[-Math.PI/2, 0, 0]} receiveShadow><planeGeometry args={[courtWidth, 0.05]}/><meshStandardMaterial color="#ffffff" roughness={0.9}/></mesh>
          
          {/* Center Line */}
          <mesh position={[0, 0, 0]} rotation={[-Math.PI/2, 0, 0]} receiveShadow><planeGeometry args={[0.05, 13.9]}/><meshStandardMaterial color="#ffffff" roughness={0.9}/></mesh>
        </group>
      </group>

      {/* 2. GLASS WALLS & BACK STRUCTURE */}
      <group ref={glassRef}>
        {/* Back Glass (Ends) */}
        {[-courtLength/2, courtLength/2].map((z, idx) => (
          <group key={`back-glass-${idx}`} position={[0, wallHeight/2, z]}>
            <mesh castShadow receiveShadow>
              <boxGeometry args={[courtWidth, wallHeight, 0.05]} />
              <meshPhysicalMaterial 
                color={glassColor} 
                transmission={0.98} 
                opacity={1} 
                transparent 
                roughness={0.02} 
                ior={1.5} 
                thickness={0.1}
                clearcoat={1}
                clearcoatRoughness={0.1}
              />
            </mesh>
            {/* Structural Pillars for back wall */}
            {[-5, -3, -1, 1, 3, 5].map((x, pIdx) => (
              <mesh key={`pillar-${pIdx}`} position={[x === -5 ? -4.95 : x === 5 ? 4.95 : x, 0, z > 0 ? 0.05 : -0.05]} castShadow>
                <boxGeometry args={[0.1, wallHeight, 0.1]} />
                <meshStandardMaterial color={structureColor} metalness={0.9} roughness={0.2} />
              </mesh>
            ))}
          </group>
        ))}

        {/* Side Glass (First 2m from corners) */}
        {[-courtWidth/2, courtWidth/2].map((x, i) => 
          [-courtLength/2 + 1, courtLength/2 - 1].map((z, j) => (
            <mesh key={`side-glass-${i}-${j}`} position={[x, wallHeight/2, z]} castShadow receiveShadow>
              <boxGeometry args={[0.05, wallHeight, 2]} />
              <meshPhysicalMaterial 
                color={glassColor} 
                transmission={0.98} 
                opacity={1} 
                transparent 
                roughness={0.02} 
                ior={1.5} 
                thickness={0.1}
                clearcoat={1}
                clearcoatRoughness={0.1}
              />
            </mesh>
          ))
        )}
      </group>

      {/* 3. METAL MESH WALLS & SIDE STRUCTURE */}
      <group ref={meshRef}>
        {/* Side Mesh (Middle 16m) */}
        {[-courtWidth/2, courtWidth/2].map((x, i) => (
          <group key={`side-mesh-${i}`} position={[x, wallHeight/2, 0]}>
            <mesh castShadow>
              <planeGeometry args={[16, wallHeight]} rotation={[0, x > 0 ? Math.PI/2 : -Math.PI/2, 0]} />
              <meshStandardMaterial 
                color={structureColor} 
                alphaMap={sideMeshTex} 
                transparent 
                alphaTest={0.5} 
                side={THREE.DoubleSide} 
                metalness={0.9} 
                roughness={0.3} 
              />
            </mesh>
            {/* Side Pillars */}
            {[-8, -6, -4, -2, 0, 2, 4, 6, 8].map((z, pIdx) => (
              <mesh key={`side-pillar-${pIdx}`} position={[x > 0 ? 0.05 : -0.05, 0, z]} castShadow>
                <boxGeometry args={[0.1, wallHeight, 0.1]} />
                <meshStandardMaterial color={structureColor} metalness={0.9} roughness={0.2} />
              </mesh>
            ))}
          </group>
        ))}
      </group>

      {/* 4. LIGHTING POLES */}
      <group ref={polesRef}>
        {[-courtWidth/2 - 0.2, courtWidth/2 + 0.2].map((x, i) => 
          [-courtLength/4, courtLength/4].map((z, j) => (
            <group key={`pole-${i}-${j}`} position={[x, 0, z]}>
              {/* Main Pole */}
              <mesh position={[0, 3, 0]} castShadow>
                <boxGeometry args={[0.15, 6, 0.15]} />
                <meshStandardMaterial color={structureColor} metalness={0.9} roughness={0.2} />
              </mesh>
              {/* Light Arm */}
              <mesh position={[x > 0 ? -0.5 : 0.5, 6, 0]} rotation={[0, 0, x > 0 ? Math.PI/8 : -Math.PI/8]}>
                <boxGeometry args={[1.2, 0.1, 0.3]} />
                <meshStandardMaterial color={structureColor} metalness={0.9} roughness={0.2} />
              </mesh>
              {/* LED Panel */}
              <mesh position={[x > 0 ? -0.8 : 0.8, 5.9, 0]} rotation={[x > 0 ? Math.PI/6 : -Math.PI/6, 0, 0]}>
                <boxGeometry args={[0.8, 0.05, 0.4]} />
                <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={5} />
              </mesh>
              {/* Actual Light Source */}
              <spotLight 
                position={[x > 0 ? -0.8 : 0.8, 5.9, 0]} 
                target-position={[0, 0, z]} 
                intensity={2.5} 
                angle={Math.PI/3} 
                penumbra={0.8} 
                castShadow 
                color="#fff5e6"
              />
            </group>
          ))
        )}
      </group>

      {/* 5. NET & POSTS */}
      <group ref={netRef} position={[0, 0, 0]}>
        {/* Net Posts */}
        <mesh position={[-courtWidth/2 + 0.1, 0.45, 0]} castShadow>
          <cylinderGeometry args={[0.06, 0.06, 0.9]} />
          <meshStandardMaterial color={structureColor} metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh position={[courtWidth/2 - 0.1, 0.45, 0]} castShadow>
          <cylinderGeometry args={[0.06, 0.06, 0.9]} />
          <meshStandardMaterial color={structureColor} metalness={0.9} roughness={0.2} />
        </mesh>
        
        {/* Net Body */}
        <mesh position={[0, 0.45, 0]}>
          <planeGeometry args={[courtWidth - 0.2, 0.9]} />
          <meshStandardMaterial 
            color="#ffffff" 
            alphaMap={netTexture} 
            transparent 
            alphaTest={0.5} 
            side={THREE.DoubleSide} 
            roughness={0.9}
          />
        </mesh>
        
        {/* Net Top Band */}
        <mesh position={[0, 0.9, 0]}>
          <boxGeometry args={[courtWidth - 0.2, 0.06, 0.02]} />
          <meshStandardMaterial color="#ffffff" roughness={0.9} />
        </mesh>
      </group>
      
    </group>
  );
};
