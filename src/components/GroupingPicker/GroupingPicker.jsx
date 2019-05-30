import React from 'react';
import './GroupingPicker.css';

export default class GroupingPicker extends React.Component {
  onBtnClick = event => {
    this.props.onChanged(event.target.name);
  };
  render() {
    const { active } = this.props;
    return (
      <div className="GroupingPicker">
        <button
          className={`button ${active === 'all' && 'active'}`}
          name="all"
          onClick={this.onBtnClick}
        >
          All
        </button>
        <button
          className={`button ${active === 'stall' && 'active'}`}
          name="stall"
          onClick={this.onBtnClick}
        >
          Group by Stall
        </button>
        <button
          className={`button ${active === 'location' && 'active'}`}
          name="location"
          onClick={this.onBtnClick}
        >
          Group by Location
        </button>
      </div>
    );
  }
}
