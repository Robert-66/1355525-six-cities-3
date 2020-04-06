import {combineReducers} from 'redux';
import {reducer as offers} from './data/offers/offers';
import {reducer as offersFavorite} from './data/offers-favorite/offers-favorite';
import {reducer as offersNearby} from './data/offers-nearby/offers-nearby';
import {reducer as reviews} from './data/reviews/reviews';
import {reducer as app} from './app/app';
import {reducer as user} from './user/user';

export default combineReducers({
  data: combineReducers({
    offers,
    offersFavorite,
    offersNearby,
    reviews,
  }),
  app,
  user,
});
