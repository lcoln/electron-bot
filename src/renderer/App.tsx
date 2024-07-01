'use client';

import React, { useRef } from 'react';
import { useMouse, useRenderBox, useScreenShot } from './hooks';
import './App.css';

function ThreeCube() {
  const mountRef = useRef<HTMLDivElement>(null);
  useMouse();
  useScreenShot();
  useRenderBox(mountRef);

  return <div id="draggable-header" ref={mountRef} />;
}

export default ThreeCube;
