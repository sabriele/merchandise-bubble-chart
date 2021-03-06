import React from 'react';
import * as d3 from 'd3';
import './App.css';
import BubbleChart from './components/BubbleChart/BubbleChart';
import Bubbles from './components/Bubbles/Bubbles';
import StallsTitles from './components/StallsTitles/StallsTitles';
import LocationsTitles from './components/LocationsTitles/LocationsTitles';
import GroupingPicker from './components/GroupingPicker/GroupingPicker';
import { createNodes } from './tools/utils';
import {
  width,
  height,
  center,
  stallCenters,
  locationCenters,
} from './tools/constants';

export default class App extends React.Component {
  state = {
    data: [],
    grouping: 'all',
  };

  componentDidMount() {
    d3.csv('data/data.csv', (err, data) => {
      if (err) {
        console.log(err);
        return;
      }
      this.setState({ data: createNodes(data) });
    });
  }

  onGroupingChanged = newGrouping => {
    this.setState({ grouping: newGrouping });
  };

  render() {
    const { data, grouping } = this.state;
    return (
      <div className="App">
        <GroupingPicker onChanged={this.onGroupingChanged} active={grouping} />
        <BubbleChart width={width} height={height}>
          <Bubbles
            data={data}
            forceStrength={0.04}
            center={center}
            stallCenters={stallCenters}
            locationCenters={locationCenters}
            groupByStall={grouping === 'stall'}
            groupByLocation={grouping === 'location'}
          />
          {grouping === 'stall' && (
            <StallsTitles width={width} stallCenters={stallCenters} />
          )}
          {grouping === 'location' && (
            <LocationsTitles width={width} locationCenters={locationCenters} />
          )}
        </BubbleChart>
      </div>
    );
  }
}
