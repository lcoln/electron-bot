'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// 创建一个 Raycaster 和一个 Vector2 来保存鼠标位置
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

export function useRenderBox(ref) {
  const objRef = useRef();
  const isMouseMove = useRef(false);
  useEffect(() => {
    // Three.js setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000); // 视野角：75，长宽比：1（因为窗口是260x260），近平面：0.1，远平面：1000

    // 设置相机位置，使其能看到整个场景
    camera.position.set(2.5, 2.5, 2.5); // 可根据你的场景调整这个值，保证能看到你所需要展示的内容
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(240, 240);
    renderer.setClearColor(0x000000, 0);
    ref?.current?.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1); // 增加环境光强度
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // 增加方向光强度
    directionalLight.position.set(5, 5, 5).normalize();
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0xffffff, 20); // 添加点光源
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    camera.position.z = 2;

    // Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation is enabled
    controls.dampingFactor = 0.25;
    controls.screenSpacePanning = false;
    controls.minDistance = 1;
    controls.maxDistance = 100;
    controls.enableZoom = false; // 禁止缩放
    controls.enableRotate = false; // 默认禁用旋转

    const animate = () => {
      requestAnimationFrame(animate);

      // Required if controls.enableDamping or controls.autoRotate are set to true
      controls.update();
      if (objRef.current && !isMouseMove.current) {
        // 添加旋转逻辑
        // objRef.current.rotation.x += 0.01; // 根据需要调整旋转速度
        objRef.current.rotation.y += 0.01; // 根据需要调整旋转速度
      }

      renderer.render(scene, camera);
    };

    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/node_modules/three/examples/jsm/libs/draco/');
    dracoLoader.preload();
    loader.setDRACOLoader(dracoLoader);

    loader.load(
      '/assets/3d/box.glb',
      function (obj) {
        console.log({ obj });
        scene.add(obj.scene);
        // 重新计算包围盒
        const box = new THREE.Box3().setFromObject(obj.scene);
        const center = box.getCenter(new THREE.Vector3());

        // 调整对象位置，使其以中心点旋转
        obj.scene.position.sub(center);
        // 遍历模型网格，并调整材质
        obj.scene.traverse(function (child) {
          if (child.isMesh) {
            child.material = new THREE.MeshStandardMaterial({
              color: child.material.color,
              transparent: true,
              opacity: 1,
            });
          }
        });
        objRef.current = obj.scene;
      },
      function (xhr) {
        console.log(`${(xhr.loaded / xhr.total) * 100}% loaded`);
      },
      function (error) {
        console.error(error);
      },
    );

    const onMouseMove = (event) => {
      // 更新鼠标位置
      const canvasBounds = renderer.domElement.getBoundingClientRect();
      mouse.x =
        ((event.clientX - canvasBounds.left) / canvasBounds.width) * 2 - 1;
      mouse.y =
        -((event.clientY - canvasBounds.top) / canvasBounds.height) * 2 + 1;

      // 通过摄像机和鼠标位置更新射线投射
      raycaster.setFromCamera(mouse, camera);

      // 计算物体和射线的焦点
      if (objRef.current) {
        const intersects = raycaster.intersectObject(objRef.current, true);
        isMouseMove.current = !!intersects.length;
      }
    };

    window.addEventListener('mousemove', onMouseMove);

    animate();
    // 清理事件监听器
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, [ref]);
}
