import React from 'react';
import {Router, Switch, Route} from 'react-router-dom';
import history from '../../history';
import {AppRoute} from '../../const';
import Page from '../page/page';
import Main from '../main/main';
import SignIn from '../sign-in/sign-in';
import PlaceCardDetail from '../place-card-detail/place-card-detail';
import Favorites from '../favorites/favorites';
import PrivateRoute from '../private-route/private-route';

function App() {
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
            <SignIn />
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
}

export default App;
