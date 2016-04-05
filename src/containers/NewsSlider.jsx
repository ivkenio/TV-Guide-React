import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchNews } from '../actions/news';
import { Link } from 'react-router';
import Slider from 'react-slick';

class NewsSlider extends Component {

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

  renderSlides() {
    const { newsList } = this.props;
    const sliderNewsList = newsList.slice(0, 11);
    return sliderNewsList.map((news, index) =>
      <div className="top-news-item" key={index}>
        <Link to={`/nyheder/${news.id}/${this.newsName(news)}`}
          className="load-news"
        >
          <div className="news-item-container">
            <div className="thumb col-xs-6 npl">
              <img alt={ news.overskrift } src={ this.image(news) }
                className="lazy-load lazy-load-visible"
              />
            </div>
            <div className="news-item-content">
              <h4>{ news.overskrift }</h4>
              <small>{ news.dato }</small>
            </div>
          </div>
        </Link>
      </div>
    );
  }

  render() {
    const settings = {
      dots: false,
      infinite: true,
      autoplay: true,
      autoplaySpeed: 4000,
      speed: 1000,
      fade: true,
      prevArrow: 'div',
      nextArrow: 'div',
      lazyLoad: true,
      swipe: true,
      slidesToShow: 1,
    };
    return (
      <Slider {...settings}>
        { this.renderSlides() }
      </Slider>
    );
  }
}

function mapStateToProps(state) {
  return {
    newsList: state.news.all,
  };
}

NewsSlider.propTypes = {
  newsList: React.PropTypes.array,
  fetchNews: React.PropTypes.func,
};

export default connect(mapStateToProps, { fetchNews })(NewsSlider);
