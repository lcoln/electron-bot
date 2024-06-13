'use client';

import React, { useRef } from 'react';
import { useMouse, useRenderBox, useScreenShot } from './hooks';

function ThreeCube() {
  const mountRef = useRef<HTMLDivElement>(null);
  useMouse();
  useScreenShot();
  useRenderBox(mountRef);

  return (
    <div
      id="draggable-header"
      ref={mountRef}
      style={{ width: '100%', height: '100%', cursor: 'grab' }}
    />
  );
}

export default ThreeCube;
