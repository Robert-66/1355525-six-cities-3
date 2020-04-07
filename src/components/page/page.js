import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';
import PropTypes from 'prop-types';
import {AuthorizationStatus} from '../../reducer/user/user';

function Page(props) {
  const {
    children,
    className,
    user
  } = props;

  return (
    <div className={`page${className ? ` ` + className : ``}`}>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link header__logo-link--active">
                <img className="header__logo" src="/img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link className="header__nav-link header__nav-link--profile" to={user.authorizationStatus === AuthorizationStatus.AUTH ? AppRoute.FAVORITES : AppRoute.LOGIN}>
                    <div className="header__avatar-wrapper user__avatar-wrapper" />
                    {user.authorizationStatus === AuthorizationStatus.AUTH ? (
                      <span className="header__user-name user__name">{user.email}</span>
                    ) : (
                      <span className="header__login">Sign in</span>
                    )}
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      {children}
    </div>
  );
}

Page.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  className: PropTypes.string,
  user: PropTypes.shape({
    authorizationStatus: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
};

function mapStateToProps(state) {
  return {
    user: {
      authorizationStatus: state.user.authorizationStatus,
      email: state.user.email,
    }
  };
}

export {Page};
export default connect(mapStateToProps)(Page);
