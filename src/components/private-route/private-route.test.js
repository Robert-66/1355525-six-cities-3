import React from 'react';
import renderer from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';
import PrivateRoute from './private-route';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {AuthorizationStatus} from '../../reducer/user/user';

const mockStore = configureStore([]);
const store = mockStore({
  user: {
    authorizationStatus: AuthorizationStatus.AUTH,
    email: ``,
  }
});

it(`PrivateRoute is rendered correctly`, () => {
  const tree = renderer
    .create(
        <Provider store={store}>
          <BrowserRouter>
            <PrivateRoute
              exact
              path={`path`}
              render={() => (
                <div />
              )}
            />
          </BrowserRouter>
        </Provider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
