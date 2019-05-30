import * as d3 from 'd3';

export function createNodes(rawData) {
  const maxAmount = d3.max(rawData, d => +d.price);

  const radiusScale = d3
    .scalePow()
    .exponent(3)
    .domain([0, maxAmount])
    .range([10, 50]);

  const myNodes = rawData.map(d => ({
    radius: radiusScale(+d.price),
    price: +d.price,
    name: d.name,
    stall: d.stall,
    location: d.location,
    x: Math.random() * 900,
    y: Math.random() * 800,
  }));

  myNodes.sort((a, b) => b.value - a.value);

  return myNodes;
}

export const fillColor = d3
  .scaleOrdinal()
  .domain(['Stall A', 'Stall B', 'Stall C', 'Stall D'])
  .range(['#871D03', '#FCEDB6', '#F9A374', '#58A6A6']);
