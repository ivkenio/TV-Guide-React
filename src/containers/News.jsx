import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSingleNews } from '../actions/news';
import { Link } from 'react-router';

class News extends Component {
  constructor(props) {
    super(props);
    this.state = { id: '', name: '' };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.fetchSingleNews(this.props.params.id);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps.params);
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.props.params.id !== nextState.id) {
      window.scrollTo(0, 0);
      this.props.fetchSingleNews(nextProps.params.id);
    }
  }

  mainImage(news) {
    return news.forside_billede.replace(
      /..\/images\/tvnyheder\/forside|..\/images\/tvnyheder/,
      '//img.tvguide.dk/tvnyheder'
    );
  }

  smallImage(news) {
    return news.billede.replace(/..\/images|images/, '//img.tvguide.dk');
  }

  bodyText(news) {
    return <div dangerouslySetInnerHTML={{ __html: news.body }}></div>;
  }

  render() {
    const { news } = this.props;
    if (!news) {
      return <div>Loading...</div>;
    }
    return (
      <div className="news-item-reader">
        <div className="news-overlay">
          <div className="news-main-image">
            <div className="bottom-info">
              <div className="item-start-time">{ news.dato }</div>
            </div>
            <img alt={ news.overskrift} src={ this.mainImage(news) }
              className="item-thumbnail lazy-load lazy-load-visible"
            />
          <Link to="/" className="close-popup-button" />
          </div>
          <div className="social-connect">
            <a className="ui-share-link social-link facebook">
              <i className="fa fa-facebook"></i>
            </a>
            <a className="ui-share-link social-link twitter">
              <i className="fa fa-twitter"></i>
            </a>
            <a className="ui-share-link social-link google">
              <i className="fa fa-google-plus"></i>
            </a>
            <a className="ui-share-link social-link rss">
              <i className="fa fa-rss"></i>
            </a>
            <a className="ui-share-link social-link email">
              <i className="fa fa-envelope"></i>
            </a>
          </div>
          <div className="news-overlay-container">
            <h3>
              <div className="item-title">
                { news.overskrift }
              </div>
            </h3>
            <div className="news-content">
            <div className="news-small-image">
              <img src={ this.smallImage(news) } alt={ news.overskrift }
                className="lazy-load item-thumbnail-small lazy-load-visible"
              />
            </div>
              {this.bodyText(news)}
            </div>

          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    news: state.news.singleNews,
  };
}

News.propTypes = {
  news: React.PropTypes.object,
  fetchSingleNews: React.PropTypes.func,
  params: React.PropTypes.object,
};

export default connect(mapStateToProps, { fetchSingleNews })(News);
