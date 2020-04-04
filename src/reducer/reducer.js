import {combineReducers} from 'redux';
import {reducer as offers} from './data/offers/offers';
import {reducer as offersFavorite} from './data/offers-favorite/offers-favorite';
import {reducer as reviewsForm} from './data/reviews-form/reviews-form';
import {reducer as app} from './app/app';
import {reducer as user} from './user/user';

export default combineReducers({
  data: combineReducers({
    offers,
    offersFavorite,
    reviewsForm,
  }),
  app,
  user,
});
