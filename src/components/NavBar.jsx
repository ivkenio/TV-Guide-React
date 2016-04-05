import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { filterPrograms } from '../actions/programs';
import { fetchChannels } from '../actions/channels';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeCategoryLink: '',
      activeGenderLink: '',
      currentTime: moment(new Date()).format('HHa'),
    };
    this.activeCategoryLink = this.activeCategoryLink.bind(this);
    this.activeGenderLink = this.activeGenderLink.bind(this);
  }

  activeCategoryLink(event) {
    const link = event.target.text;
    this.setState({
      activeCategoryLink: link,
    });
  }

  activeGenderLink(event) {
    const linkText = event.target.text;
    this.setState({
      activeGenderLink: linkText,
    });
    this.props.filterPrograms(linkText);
  }

  render() {
    return (
      <Navbar default fixedTop>
        <Nav>
          <LinkContainer to="/">
            <NavItem>
              <amp-img src="/app/img/logo.png" alt="Forside" title="Forside" width="40" height="33">
              </amp-img>
            </NavItem>
          </LinkContainer>
          <NavDropdown eventKey={1} title="Now/Next" id="basic-nav-dropdown">
            <LinkContainer onClick={this.activeCategoryLink}
              to={{ pathname: '/kategori/now-next', state: 'now-next' }}
            ><NavItem>Now/Next</NavItem>
            </LinkContainer>
            <LinkContainer onClick={this.activeCategoryLink}
              to={{ pathname: '/kategori/now', state: 'now' }}
            ><NavItem>Now</NavItem>
            </LinkContainer>
            <LinkContainer onClick={this.activeCategoryLink}
              to={{ pathname: '/kategori/next', state: 'next' }}
            ><NavItem>Next</NavItem>
            </LinkContainer>
            <LinkContainer onClick={this.activeCategoryLink}
              to={{ pathname: '/kategori/today', state: 'today' }}
            ><NavItem>Today</NavItem>
            </LinkContainer>
            <MenuItem divider />
            { moment().get('hour') <= 12 ?
              <LinkContainer onClick={this.activeCategoryLink}
                to={{ pathname: '/kategori/9-12', state: '9-12' }}
              ><NavItem>9-12</NavItem></LinkContainer> : '' }
            { moment().get('hour') <= 17 ?
              <LinkContainer onClick={this.activeCategoryLink}
                to={{ pathname: '/kategori/12-17', state: '12-17' }}
              ><NavItem>12-17</NavItem></LinkContainer> : '' }
            { moment().get('hour') <= 24 ?
              <LinkContainer onClick={this.activeCategoryLink}
                to={{ pathname: '/kategori/17-24', state: '17-24' }}
              ><NavItem>17-24</NavItem></LinkContainer> : '' }
          </NavDropdown>
          <NavDropdown eventKey={2} title="Genre" id="basic-nav-dropdown">
            <LinkContainer to="alle">
              <NavItem>Alle</NavItem>
            </LinkContainer>
            <LinkContainer to="film">
              <NavItem>Film</NavItem>
            </LinkContainer>
            <LinkContainer to="sport">
              <NavItem>Sport</NavItem>
            </LinkContainer>
            <LinkContainer to="serier">
              <NavItem>Serier</NavItem>
            </LinkContainer>
            <LinkContainer to="born">
              <NavItem>Born</NavItem>
            </LinkContainer>
          </NavDropdown>
          <NavItem className="navbar-item" eventKey={3} href="#">
            <span className="glyphicon glyphicon-search"></span>
          </NavItem>
          <LinkContainer to="/login">
            <NavItem>
              <span className="glyphicon glyphicon-user"></span>
            </NavItem>
          </LinkContainer>
        </Nav>
      </Navbar>
    );
  }
}

NavBar.propTypes = {
  filterPrograms: React.PropTypes.func,
  fetchChannels: React.PropTypes.func,
};

export default connect(null, { fetchChannels, filterPrograms })(NavBar);
