'use client';

import { useEffect } from 'react';

export function useMouse() {
  useEffect(() => {
    let isDragging = false;
    let initialMouseX = 0;
    let initialMouseY = 0;

    const draggableHeader = document.getElementById('draggable-header');

    if (draggableHeader) {
      draggableHeader.addEventListener('mousedown', (event) => {
        isDragging = true;
        initialMouseX = event.screenX;
        initialMouseY = event.screenY;
        event.preventDefault();
      });

      document.addEventListener('mousemove', (event) => {
        if (isDragging) {
          const currentMouseX = event.screenX;
          const currentMouseY = event.screenY;

          const deltaX = currentMouseX - initialMouseX;
          const deltaY = currentMouseY - initialMouseY;

          window.electron.moveWindow(deltaX, deltaY);

          initialMouseX = currentMouseX;
          initialMouseY = currentMouseY;
        }
      });

      document.addEventListener('mouseup', () => {
        isDragging = false;
        initialMouseX = 0;
        initialMouseY = 0;
      });
    }

    // 清除事件监听器
    return () => {
      if (draggableHeader) {
        draggableHeader.removeEventListener('mousedown', () => {});
      }
      document.removeEventListener('mousemove', () => {});
      document.removeEventListener('mouseup', () => {});
    };
  }, []);
}
