// src/Components/Hero/Background.jsx
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const Background = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const current = mountRef.current;

    // Scene, Camera, Renderer Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    current.appendChild(renderer.domElement);

    // Starfield Setup
    const stars = [];
    const speeds = [];
    const geometry = new THREE.SphereGeometry(0.05, 8, 8);
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff });

    for (let i = 0; i < 300; i++) {
      const star = new THREE.Mesh(geometry, material);
      star.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        Math.random() * -20
      );
      scene.add(star);
      stars.push(star);
      speeds.push(Math.random() * 0.05 + 0.01); // different speeds
    }

    // Animation Loop
    const animate = () => {
      requestAnimationFrame(animate);

      stars.forEach((star, idx) => {
        star.position.z += speeds[idx];
        if (star.position.z > 10) {
          star.position.z = -20;
        }
      });

      renderer.render(scene, camera);
    };
    animate();

    // Responsive Resizing
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      current.removeChild(renderer.domElement);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        zIndex: -1,
      }}
    />
  );
};

export default Background;
