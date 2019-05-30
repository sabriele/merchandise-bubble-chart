import React from 'react';

export default function BubbleChart({ width, height, children }) {
  return (
    <svg className="bubbleChart" width={width} height={height}>
      {children}
    </svg>
  );
}
