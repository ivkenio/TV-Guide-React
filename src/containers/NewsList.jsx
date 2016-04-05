import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchNews } from '../actions/news';
import { Link } from 'react-router';

class NewsList extends Component {

  constructor(props) {
    super(props);
    this.state = { visibleNews: 10 };
    this.loadMore = this.loadMore.bind(this);
  }

  componentDidMount() {
    this.props.fetchNews();
  }

  newsName(news) {
    const lCase = news.overskrift.toLowerCase();
    return lCase.replace(/ /g, '-');
  }

  image(news) {
    return news.forside_billede.replace(
      /..\/images\/tvnyheder\/forside|..\/images\/tvnyheder/,
      '//img.tvguide.dk/tvnyheder'
    );
  }

  loadMore() {
    this.setState({ visibleNews: this.state.visibleNews + 10 });
  }

  renderList() {
    const { newsList } = this.props;
    const newsListVisible = newsList.slice(0, this.state.visibleNews);
    return newsListVisible.map((news, index) =>
      <div key={ index } className="bottom-news-item">
        <Link to={`/nyheder/${news.id}/${this.newsName(news)}`}
          className="load-news"
        >
          <div className="news-item-container">
            <div className="thumb col-xs-6 npl">
              <img alt={ news.overskrift } src={ this.image(news) }
                className="lazy-load lazy-load-visible"
              />
            </div>
            <div className="col-xs-6 news-item-content">
              <h4>{ news.overskrift }</h4>
              <small>{ news.dato }</small>
            </div>
          </div>
        </Link>
      </div>
    );
  }
  render() {
    return (
      <div className="col-xs-12 bottom-news cf npr npl">
        <h3 style={{ opacity: 1, display: 'block' }}>
          <i style={{ marginRight: 10 }} className="glyphicon glyphicon-globe"></i>
          Seneste Nyheder
        </h3>
        <div className="slides col-xs-12">
          { this.renderList() }
          <h3 className="more-recent-news-button"
            style={{ opacity: 1, display: 'block', cursor: 'pointer' }}
            onClick={this.loadMore}
          >
            <i className="glyphicon glyphicon-download"></i>
             Hent Flere Nyheder
          </h3>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    newsList: state.news.all,
  };
}

NewsList.propTypes = {
  newsList: React.PropTypes.array,
  fetchNews: React.PropTypes.func,
};

export default connect(mapStateToProps, { fetchNews })(NewsList);
