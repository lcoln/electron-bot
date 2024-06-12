'use client';

import { useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

export function useRenderBox(ref) {
  useEffect(() => {
    // Three.js setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(400, 400);
    renderer.setClearColor(0x000000, 0);
    ref?.current?.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 2;

    const animate = () => {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    const loader = new GLTFLoader();
    // const dracoLoader = new DRACOLoader();
    // dracoLoader.setDecoderPath('/draco/');
    // dracoLoader.preload();
    // loader.setDRACOLoader(dracoLoader);

    loader.load(
      '/3d/box.glb',
      function (gltf) {
        console.log({ gl: gltf });
        scene.add(gltf.scene);
      },
      undefined,
      function (error) {
        console.error(error);
      },
    );
    animate();
  }, []);
}
