import {extend} from './utils';
import offers from './mocks/offers';
import {CityNames} from './const';

const initialState = {
  city: CityNames.PARIS,
  offers
};

const ActionTypes = {
  CHANGE_CITY: `CHANGE_CITY`,
  SET_OFFERS: `SET_OFFERS`,
};

const ActionCreators = {
  changeCity: (city) => ({
    type: ActionTypes.CHANGE_CITY,
    payload: city,
  }),
  setOffers: (data) => ({
    type: ActionTypes.SET_OFFERS,
    payload: data,
  })
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.CHANGE_CITY:
      return extend(state, {city: action.payload});
    case ActionTypes.SET_OFFERS:
      return extend(state, {offers: action.payload});
  }

  return state;
};

export {ActionCreators, ActionTypes, reducer};
