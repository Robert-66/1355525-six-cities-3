import {combineReducers} from 'redux';
import {reducer as offers} from './data/offers/offers';
import {reducer as app} from './app/app';
import {reducer as user} from './user/user';

export default combineReducers({
  data: combineReducers({
    offers,
  }),
  app,
  user,
});
