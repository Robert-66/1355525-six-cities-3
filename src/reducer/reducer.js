import {combineReducers} from 'redux';
import {reducer as offers} from './data/offers/offers';
import {reducer as app} from './app/app';

export default combineReducers({
  data: combineReducers({
    offers,
  }),
  app,
});
