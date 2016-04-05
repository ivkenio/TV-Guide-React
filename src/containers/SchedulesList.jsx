import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { fetchChannels } from '../actions/channels';
import Schedule from './Schedule.jsx';
import moment from 'moment';
import View from 'react-flexbox';

class SchedulesList extends Component {

  constructor(props) {
    super(props);
    this.state = { time: 'now-next' };
  }

  componentDidMount() {
    let time = '';
    if (!this.props.params.time) {
      time = this.state.time;
    } else {
      time = this.props.params.time;
    }
    this.props.fetchChannels(time);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ time: nextProps.params.time });
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.props.params.time !== nextState.time) {
      this.props.fetchChannels(nextProps.params.time);
    }
  }

  getProgramIndicator(program) {
    const today = moment(new Date()).format('YYYY-MM-DD');
    const startTime = Date.parse(`${today} ${program.tid}`);
    const totalTime = Date.parse(`${today} ${program.slut}`);
    const actualTime = Date.now();

    let indicator = '';
    if (actualTime < totalTime) {
      const runTime = (totalTime - startTime) / 60;
      const elapsed = (actualTime - startTime) / 60;
      const timeSpent = elapsed / runTime;
      const progress = timeSpent * 100;
      indicator = (
        <div className="time-bar">
          <div className="progress enabled">
            <div className="bar progress-bar" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      );
    }
    if (actualTime < startTime) {
      indicator = (
        <div className="countdown active">
          time left
        </div>
      );
    }
    return indicator;
  }

  getDate(program) {
    return moment(program.dato).format('YYYY-MM-DD');
  }

  getTime(program) {
    return program.tid.slice(0, -3);
  }

  nameForUrl(program) {
    return program.navn.replace(/ /g, '_');
  }

  firstProgram(channel) {
    const program = channel.Programs[0];
    const channelCode = channel.channel_code;
    const date = this.getDate(program);
    const nameForUrl = this.nameForUrl(program);
    return (
      <div className="schedule-entry on-air-item type-series">
        <div className="schedule-entry-channel">
          <Link to={ `/kanaler/${channelCode}` } className="get_channel_schedule clickable">
            <img src={`/app/img/channel_logos/main-${channelCode}@2x.png`}
              alt={channel.navn} className={`channel_logo ${channelCode}`}
            />
          </Link>
        </div>
        <div className="schedule-entry-starts">
          { this.getTime(program) }
        </div>
        <div className="schedule-entry-info">
          <Link to={ `/programmer/${channelCode}/${date}/${program.tid}/${nameForUrl}` }>
            <h4 className="schedule-entry-title">{ program.navn }</h4>
          </Link>
          { this.getProgramIndicator(program) }
        </div>
      </div>
    );
  }

  renderList() {
    const { channels } = this.props;
    return channels.map((channel, index) =>
      <View column auto className="channel-container npr npl col-xs-6"
        style={{ marginTop: 8 }} key={index}
      >
        <div className="channel-schedule">
          <div className="schedule-container">
              { this.firstProgram(channel) }
            <Schedule programs={ channel.Programs } channel={ channel } />
          </div>
        </div>
      </View>
    );
  }

  render() {
    return (
      <div>
        { this.renderList() }
      </div>
    );
  }
}

function mapStateToProps(state) {
  // const { gender } = state.programs;
  // const channels = (state.channels.all).filter(channel => channel.Programs.length > 0);
  // const programs = [];
  // _.forEach(channels, (channel) =>
  //   _.forEach(channel.Programs, (program) => {
  //     if (program.genre.includes(gender)) {
  //       programs[programs.length] = program;
  //     }
  //   })
  // );
  // const filteredPrograms = programs.filter((program) => program.genre.includes(gender));
  return {
    channels: state.channels.all,
    // programs: programs.filter((program) => program.),
  };
}

SchedulesList.propTypes = {
  channels: React.PropTypes.array,
  fetchChannels: React.PropTypes.func,
  params: React.PropTypes.object,
};

export default connect(mapStateToProps, { fetchChannels })(SchedulesList);
