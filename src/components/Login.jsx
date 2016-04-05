import React from 'react';
import { IndexLink, Link } from 'react-router';

class Login extends React.Component {

  render() {
    return (
      <div className="login-container">
        <nav role="navigation" className="navbar navbar-default navbar-fixed-top">
          <div className="navbar-item" style={{ position: 'absolute', left: 10, top: 10 }}>
            <IndexLink to="/">
              <amp-img src="/app/img/logo.png" alt="Forside" title="Forside" width="40" height="33">
              </amp-img>
            </IndexLink>
          </div>
          <div className="navbar-item">
            <h4>Tvguide.dk Profil</h4>
          </div>
          <div className="navbar-item" style={{ position: 'absolute', right: 10, top: 20 }}>
            <Link to="/">
              <span className="glyphicon glyphicon-remove"></span>
            </Link>
          </div>
        </nav>
        <div className="login-box">
          <a href="#" className="login-box-facebook">
            <span className="z-icon-facebook"></span>
            <span className="icon-button">Log på med Facebook</span>
          </a>
          <hr />
          <h4 className="icon-button">Har du en TVguide profil, log på her:</h4>
          <form action="" id="login-box-form">
            <div className="row">
              <div className="col-xs-6">
                <input type="text" name="email" placeholder="Brugernavn" />
              </div>
              <div className="col-xs-6">
                <input type="password" name="password" placeholder="Adgangskode" />
              </div>
            </div>
            <input type="submit" className="login-box-submit" name="Log Ind" value="Log ind" />
          </form>
        </div>
      </div>
    );
  }

}

export default Login;
