import React, { Component } from 'react';
import { Link } from 'react-router';
import moment from 'moment';

class Schedule extends Component {
  programDate(program) {
    return moment(program.dato).format('YYYY-MM-DD');
  }

  programTime(program) {
    return program.tid.slice(0, -3);
  }

  programNameForUrl(program) {
    return program.navn.replace(/ /g, '_');
  }

  renderProgram(program, index) {
    const channelCode = this.props.channel.channel_code;
    const programDate = this.programDate(program);
    const programTime = this.programTime(program);
    const programNameForUrl = this.programNameForUrl(program);
    return (
      <div key={ index } className="schedule-item type-series">
        <h3>
          <Link className="load-show"
            to={ `/programmer/${channelCode}/${programTime}/${programDate}/${programNameForUrl}` }
          >
            <span className="item-start-time">{ program.tid.slice(0, -3) }</span>
            <span className="item-title">{ program.navn }</span>
          </Link>
        </h3>
      </div>
    );
  }

  render() {
    const programs = this.props.programs.splice(1);
    return (
      <div clasName="schedule-items-container">
        { programs.map((program, index) => this.renderProgram(program, index)) }
      </div>
    );
  }
}

Schedule.propTypes = {
  channel: React.PropTypes.object,
  programs: React.PropTypes.array,
};

export default Schedule;
