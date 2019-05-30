import React from 'react';

export default function StallsTitles({ stallCenters }) {
  return (
    <g>
      {Object.keys(stallCenters).map(stall => (
        <text
          key={stall}
          x={stallCenters[stall].x}
          y={50}
          fontSize="35"
          textAnchor="middle"
          alignmentBaseline="middle"
        >
          {stall}
        </text>
      ))}
    </g>
  );
}
