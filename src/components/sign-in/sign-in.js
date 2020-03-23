import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {Operation, AuthorizationStatus} from '../../reducer/user/user';
import PropTypes from 'prop-types';

function SignIn(props) {
  const {authorizationStatus, onSubmit} = props;
  let emailRef = React.createRef();
  let passwordRef = React.createRef();

  function handleSubmit(e) {
    e.preventDefault();

    onSubmit({
      email: emailRef.current.value,
      password: passwordRef.current.value,
    });
  }

  return (
    <>
      {authorizationStatus === AuthorizationStatus.AUTH ? (
        <Redirect to="/" />
      ) : (
        <main className="page__main page__main--login">
          <div className="page__login-container container">
            <section className="login">
              <h1 className="login__title">Sign in</h1>
              <form
                className="login__form form"
                action=""
                onSubmit={handleSubmit}
              >
                <div className="login__input-wrapper form__input-wrapper">
                  <label className="visually-hidden">E-mail</label>
                  <input className="login__input form__input" type="email" name="email" placeholder="Email" required="" ref={emailRef} />
                </div>
                <div className="login__input-wrapper form__input-wrapper">
                  <label className="visually-hidden">Password</label>
                  <input className="login__input form__input" type="password" name="password" placeholder="Password" required="" ref={passwordRef} />
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
  onSubmit: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    authorizationStatus: state.user.authorizationStatus,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onSubmit: (authData) => dispatch(Operation.login(authData)),
  };
}

export {SignIn};
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
