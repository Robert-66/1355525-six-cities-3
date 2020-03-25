import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {AppRoute} from '../../const';
import Page from '../page/page';
import Main from '../main/main';
import SignIn from '../sign-in/sign-in';
import PlaceCardDetail from '../place-card-detail/place-card-detail';

function handleCardNameClick() {
  return {};
}

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={AppRoute.ROOT}>
          <Page className="page--gray page--main">
            <Main
              onClickCardName={handleCardNameClick}
            />
          </Page>
        </Route>
        <Route exact path={AppRoute.LOGIN}>
          <Page className="page--gray page--login">
            <SignIn />
          </Page>
        </Route>
        <Route exact path={`${AppRoute.ROOM}/:id`} render={(routeProps) => (
          <Page>
            <PlaceCardDetail {...routeProps} />
          </Page>
        )}
        />
      </Switch>
    </BrowserRouter>

  );
}

export default App;
