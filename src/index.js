import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {createAPI} from './api.js';
import reducer from './reducer/reducer';
import {Operation as OffersOperation} from './reducer/data/offers/offers.js';
import {Operation as UserOperation, ActionCreator, AuthorizationStatus} from './reducer/user/user';
import {Provider} from 'react-redux';
import App from './components/app/app';

function onUnauthorized() {
  store.dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH));
}

const api = createAPI(onUnauthorized);

const store = createStore(
    reducer,
    compose(
        applyMiddleware(thunk.withExtraArgument(api)),
        window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
    )
);

store.dispatch(OffersOperation.fetchOffers());
store.dispatch(UserOperation.checkAuth());

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById(`root`)
);
