import React from 'react';
import { connect } from 'react-redux';
import { fetchChannel } from '../actions/channels';
import moment from 'moment';
import { Link } from 'react-router';

class Channel extends React.Component {
  componentWillMount() {
    this.props.fetchChannel(this.props.params.id);
  }

  programDate(program) {
    return moment(program.dato).format('YYYY-MM-DD');
  }

  programTime(program) {
    return program.tid.slice(0, -3);
  }

  programNameForUrl(program) {
    return program.navn.replace(/ /g, '_');
  }

  renderProgramms() {
    return this.props.channel.Programs.map((program, index) =>
      <div className="schedule-item" key={ index }>
        <h3>
          <Link
            to={ `/programmer/${this.props.channel.channel_code}/${this.programDate(program)}/${program.tid}/${this.programNameForUrl(program)}`}
          >
            <span className="item-start-time">{ this.programTime(program) }</span>
            <span className="item-title">{ program.navn }</span>
          </Link>
        </h3>
      </div>
    );
  }

  render() {
    const { channel } = this.props;
    if (!channel) {
      return <div>Loading...</div>;
    }
    return (
      <div id="single-channel-schedule" className="channel-schedule cf">
        <div className="schedule-header col-xs-12 data-holder">
          <div className="channel-logo-container">
            <amp-img className={`channel_logo ${channel.channel_code}`}
              src={`/app/img/channel_logos/${channel.logo}.png`}
              alt={channel.navn}
            />
          </div>
          <div className="channel-schedule-date">
            { moment(channel.dato).format('YYYY-MM-DD') }
          </div>
        </div>
        { this.renderProgramms() }
      </div>
    );
  }

}

function mapStateToProps(state) {
  return { channel: state.channels.channel };
}

Channel.propTypes = {
  channel: React.PropTypes.object,
  fetchChannel: React.PropTypes.func,
  params: React.PropTypes.object,
};

export default connect(mapStateToProps, { fetchChannel })(Channel);
