import React, { Component } from 'react';
import NavBar from './NavBar.jsx';
import NewsSlider from '../containers/NewsSlider.jsx';
import NewsList from '../containers/NewsList.jsx';
import Contact from './Contact.jsx';
import { connect } from 'react-redux';
import Loader from 'react-loader';

class App extends Component {
  render() {
    const loaded = this.props.channels.length > 0 ? true : false;
    return (
      <Loader loaded={true}>
        <div className="container-all scrollable cf">
          <NavBar />
          <NewsSlider />
          <div className="main-channels cf">
            { this.props.children }
          </div>
          <NewsList />
          <Contact />
        </div>
      </Loader>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.object,
};

function mapStateToProps(state) {
  return {
    channels: state.channels.all,
  };
}

export default connect(mapStateToProps)(App);
