import React from 'react';
import {connect} from 'react-redux';
import {Router, Switch, Route} from 'react-router-dom';
import history from '../../history';
import {AppRoute} from '../../const';
import Page from '../page/page';
import Main from '../main/main';
import SignIn from '../sign-in/sign-in';
import PlaceCardDetail from '../place-card-detail/place-card-detail';
import Favorites from '../favorites/favorites';
import PrivateRoute from '../private-route/private-route';
import withSignIn from '../../hocs/with-sign-in/with-sign-in';
import PropTypes from 'prop-types';

const SignInWrapped = withSignIn(SignIn);

function App(props) {
  const {isLoading, isError} = props;

  if (!isLoading && !isError) {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path={AppRoute.ROOT}>
            <Page className="page--gray page--main">
              <Main />
            </Page>
          </Route>
          <Route exact path={AppRoute.LOGIN}>
            <Page className="page--gray page--login">
              <SignInWrapped />
            </Page>
          </Route>
          <Route exact path={`${AppRoute.ROOM}/:id`} render={(routeProps) => (
            <Page>
              <PlaceCardDetail offerId={routeProps.match.params.id} />
            </Page>
          )}
          />
          <PrivateRoute
            exact
            path={AppRoute.FAVORITES}
            render={() => (
              <Page>
                <Favorites/>
              </Page>
            )}
          />
        </Switch>
      </Router>
    );
  } else {
    return null;
  }
}

App.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    isLoading: state.data.offers.isLoading,
    isError: state.data.offers.isError,
  };
}

export {App};
export default connect(mapStateToProps)(App);
