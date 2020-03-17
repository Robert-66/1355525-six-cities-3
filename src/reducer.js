import {extend} from './utils';
import offers from './mocks/offers';
import {CityNames} from './const';

const initialState = {
  city: CityNames.PARIS,
  offers,
  sortBySelectedOptionIndex: 0,
};

const ActionTypes = {
  CHANGE_CITY: `CHANGE_CITY`,
  SET_OFFERS: `SET_OFFERS`,
  SET_SORT_BY_SELECTED_OPTION_INDEX: `SET_SORT_BY_SELECTED_OPTION_INDEX`,
};

const ActionCreators = {
  changeCity: (city) => ({
    type: ActionTypes.CHANGE_CITY,
    payload: city,
  }),
  setOffers: (data) => ({
    type: ActionTypes.SET_OFFERS,
    payload: data,
  }),
  setSortBySelectedOptionIndex: (index) => ({
    type: ActionTypes.SET_SORT_BY_SELECTED_OPTION_INDEX,
    payload: index,
  })
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.CHANGE_CITY:
      return extend(state, {city: action.payload});
    case ActionTypes.SET_OFFERS:
      return extend(state, {offers: action.payload});
    case ActionTypes.SET_SORT_BY_SELECTED_OPTION_INDEX:
      return extend(state, {sortBySelectedOptionIndex: action.payload});
  }

  return state;
};

export {ActionCreators, ActionTypes, reducer};
