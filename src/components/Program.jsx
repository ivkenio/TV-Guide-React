import React from 'react';
import { connect } from 'react-redux';
import { fetchProgram } from '../actions/programs';

class Program extends React.Component {

  componentWillMount() {
    this.props.fetchProgram(this.props.params);
    this._handleRatingVote = this._handleRatingVote.bind(this);
  }

  _handleRatingVote(event) {
    console.log(event);
  }

  programTiming(program) {
    return `${program.tid.slice(0, -3)}-${program.slut.slice(0, -3)}`;
  }

  renderRatingStars() {
    return [1, 2, 3, 4, 5].map((rating) =>
      <div key={ rating }
        onClick={ this._handleRatingVote }
        className="subscribe rating_stars glyphicon glyphicon-star rating-empty"
      ></div>
    );
  }

  render() {
    const { channel } = this.props;
    if (!channel) {
      return <div>Loading...</div>;
    }
    const program = channel.Programs[0];
    const image = program.image_url ? program.image_url : `/app/img/program-images/no-thumbnail-320x250-${channel.logo}@2x.jpg`;
    return (
      <div id="program-overlay">
        <div className="program-overlay">
          <div className="program-poster-info">
            <div className="top-info">
              <div className="channel-logo-container">
                <amp-img src={`/app/img/channel_logos/${channel.logo}.png`}
                  alt="" className="channel_logo dr1 get_channel_schedule"
                />
              </div>
              <div className="title col-xs-7 npr npl">
                <h1 className="ui-load-related-programs">
                  { program.navn }
                </h1>
              </div>
            </div>
            <img className="col-xs-12 npr npl program-poster"
              src={ image } alt={ program.navn }
            />
            <div className="bottom-info">
              <h4 className="program-genre">
                <a className="genre-list-item close_and_go">
                  { program.genre }
                </a>
              </h4>
              <h5 className="program-timing">
                { this.programTiming(program) }
              </h5>
              <div className="rating program-rating-conversation">
                { this.renderRatingStars() }
              </div>
            </div>
          </div>
          <div className="social-connect">
            <a href="" className="ui-share-link program-social-link facebook">
                <i className="fa fa-facebook"></i>
            </a>
            <a href="" className="ui-share-link program-social-link twitter">
                <i className="fa fa-twitter"></i>
            </a>
            <a href="" className="ui-share-link program-social-link google">
                <i className="fa fa-google-plus"></i>
            </a>
            <a href="" className="ui-share-link program-social-link email">
                <i className="fa fa-envelope"></i>
            </a>
          </div>
          <div className="clearfix"></div>

          <div className="program-icons-wrapper">
            <div className="program-icons without-trailer">
              <div className="program-icon icon-data-item time-left">
               <div className="icon-data time-left">
                 <div className="circle-info">
                   <div className="canvas"></div>
                   <p className="circle-icon-text">
                     <span className="countdown active">8:00:00</span>
                   </p>
                 </div>
                 <div className="header">Tilbage</div>
               </div>
              </div>

              <div className="program-icon icon-data-item alert-me">
                 <div className="icon-data reminder">
                     <div className="icon-data">
                         <div className="circle-info">
                           <div className="canvas"></div>
                             <div className="icon-action">
                                 <a className="glyphicon glyphicon-bell trigger-alerts data-holder"></a>
                             </div>
                         </div>
                         <div className="header">Alarm</div>
                     </div>
                 </div>
              </div>
            </div>
          </div>
          <div dangerouslySetInnerHTML={{ __html: program.forklaring }}
            className="program-description"
          >
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { channel: state.programs.program };
}

Program.propTypes = {
  fetchProgram: React.PropTypes.func,
  channel: React.PropTypes.object,
  params: React.PropTypes.object,
};

export default connect(mapStateToProps, { fetchProgram })(Program);
