import React from 'react';
import * as d3 from 'd3';
import { fillColor } from '../../tools/utils';
import tooltip from '../Tooltip/Tooltip';

export default class Bubbles extends React.Component {
  constructor(props) {
    super(props);
    const { forceStrength, center } = props;
    this.simulation = d3
      .forceSimulation()
      .velocityDecay(0.2)
      .force(
        'x',
        d3
          .forceX()
          .strength(forceStrength)
          .x(center.x)
      )
      .force(
        'y',
        d3
          .forceY()
          .strength(forceStrength)
          .y(center.y)
      )
      .force('charge', d3.forceManyBody().strength(this.charge.bind(this)))
      .force('center', d3.forceCenter(center.x, center.y))
      .force(
        'collision',
        d3.forceCollide().radius(function(d) {
          return d.radius;
        })
      )
      .on('tick', this.ticked.bind(this))
      .stop();
  }

  state = {
    g: null,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.props.data) {
      this.renderBubbles(nextProps.data);
    }
    if (nextProps.groupByStall !== this.props.groupByStall) {
      this.regroupBubbles(nextProps.groupByStall);
    }
  }

  shouldComponentUpdate() {
    return false;
  }

  onRef = ref => {
    this.setState({ g: d3.select(ref) }, () =>
      this.renderBubbles(this.props.data)
    );
  };

  ticked() {
    this.state.g
      .selectAll('.bubble')
      .attr('cx', d => d.x)
      .attr('cy', d => d.y);
  }

  charge(d) {
    return -this.props.forceStrength * d.radius ** 2.0;
  }

  regroupBubbles = groupByStall => {
    const { forceStrength, stallCenters, center } = this.props;
    if (groupByStall) {
      this.simulation
        .force(
          'x',
          d3
            .forceX()
            .strength(forceStrength)
            .x(d => stallCenters[d.stall].x)
        )
        .force(
          'y',
          d3
            .forceY()
            .strength(forceStrength)
            .y(d => stallCenters[d.stall].y)
        );
    } else {
      this.simulation
        .force(
          'x',
          d3
            .forceX()
            .strength(forceStrength)
            .x(center.x)
        )
        .force(
          'y',
          d3
            .forceY()
            .strength(forceStrength)
            .y(center.y)
        );
    }
    this.simulation.alpha(1).restart();
  };

  renderBubbles(data) {
    const bubbles = this.state.g.selectAll('.bubble').data(data, d => d.id);

    bubbles.exit().remove();

    const bubblesE = bubbles
      .enter()
      .append('circle')
      .classed('bubble', true)
      .attr('r', 0)
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
      .attr('fill', d => fillColor(d.stall))
      .attr('stroke', d => d3.rgb(fillColor(d.stall)).darker())
      .attr('stroke-width', 1.5)
      .on('mouseover', showDetail)
      .on('mouseout', hideDetail);

    bubblesE
      .transition()
      .duration(2000)
      .attr('r', d => d.radius)
      .on('end', () => {
        this.simulation
          .nodes(data)
          .alpha(1)
          .restart();
      });
  }

  render() {
    return <g ref={this.onRef} className="bubbles" />;
  }
}

export function showDetail(d) {
  d3.select(this).attr('stroke', 'black');

  const content =
    `<span class="name">Title: </span><span class="value">${
      d.name
    }</span><br/>` +
    `<span class="name">Price: </span><span class="value">$${
      d.price
    }</span><br/>`;

  tooltip.showTooltip(content, d3.event);
}

export function hideDetail(d) {
  d3.select(this).attr('stroke', d => d3.rgb(fillColor(d.stall)).darker());

  tooltip.hideTooltip();
}
