import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {AuthorizationStatus} from '../../reducer/user/user';
import PropTypes from 'prop-types';

function SignIn(props) {
  const {
    authorizationStatus,
    redirectUrl,
    onChangeInput,
    onSubmit
  } = props;

  return (
    <>
      {authorizationStatus === AuthorizationStatus.AUTH ? (
        <Redirect to={redirectUrl} />
      ) : (
        <main className="page__main page__main--login">
          <div className="page__login-container container">
            <section className="login">
              <h1 className="login__title">Sign in</h1>
              <form
                className="login__form form"
                action=""
                onSubmit={onSubmit}
              >
                <div className="login__input-wrapper form__input-wrapper">
                  <label className="visually-hidden">E-mail</label>
                  <input
                    className="login__input form__input"
                    type="email"
                    name="email"
                    placeholder="Email"
                    required=""
                    onChange={onChangeInput}
                  />
                </div>
                <div className="login__input-wrapper form__input-wrapper">
                  <label className="visually-hidden">Password</label>
                  <input
                    className="login__input form__input"
                    type="password"
                    name="password"
                    placeholder="Password"
                    required=""
                    onChange={onChangeInput}
                  />
                </div>
                <button className="login__submit form__submit button" type="submit">Sign in</button>
              </form>
            </section>
            <section className="locations locations--login locations--current">
              <div className="locations__item">
                <a className="locations__item-link" href="#">
                  <span>Amsterdam</span>
                </a>
              </div>
            </section>
          </div>
        </main>
      )}
    </>
  );
}

SignIn.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  redirectUrl: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  onChangeInput: PropTypes.func.isRequired,
};

SignIn.defaultProps = {
  redirectUrl: `/`,
};

function mapStateToProps(state) {
  return {
    authorizationStatus: state.user.authorizationStatus,
  };
}

export {SignIn};
export default connect(mapStateToProps)(SignIn);
