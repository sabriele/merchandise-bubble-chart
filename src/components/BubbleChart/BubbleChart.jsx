import React from 'react';

export default function BubbleChart({ width, height, children }) {
  return (
    <svg width={width} height={height}>
      {children}
    </svg>
  );
}
