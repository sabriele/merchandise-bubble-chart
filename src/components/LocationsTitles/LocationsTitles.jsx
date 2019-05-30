import React from 'react';

export default function LocationsTitles({ locationCenters }) {
  return (
    <g>
      {Object.keys(locationCenters).map(location => (
        <text
          key={location}
          x={locationCenters[location].x}
          y={50}
          fontSize="35"
          textAnchor="middle"
          alignmentBaseline="middle"
        >
          {location}
        </text>
      ))}
    </g>
  );
}
