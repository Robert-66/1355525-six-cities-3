import {extend} from '../../utils';
import {CityNames} from '../../const';

const initialState = {
  city: CityNames.PARIS,
  sortBySelectedOptionIndex: 0,
  hoverOfferId: null,
};

const ActionTypes = {
  CHANGE_CITY: `CHANGE_CITY`,
  SET_OFFERS: `SET_OFFERS`,
  SET_SORT_BY_SELECTED_OPTION_INDEX: `SET_SORT_BY_SELECTED_OPTION_INDEX`,
  SET_HOVER_OFFER_ID: `SET_HOVER_OFFER_ID`,
  RESET_HOVER_OFFER_ID: `RESET_HOVER_OFFER_ID`,
};

const ActionCreators = {
  changeCity: (city) => ({
    type: ActionTypes.CHANGE_CITY,
    payload: city,
  }),
  setSortBySelectedOptionIndex: (index) => ({
    type: ActionTypes.SET_SORT_BY_SELECTED_OPTION_INDEX,
    payload: index,
  }),
  setHoverOfferId: (id) => ({
    type: ActionTypes.SET_HOVER_OFFER_ID,
    payload: id,
  }),
  resetHoverOfferId: () => ({
    type: ActionTypes.RESET_HOVER_OFFER_ID,
  })
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.CHANGE_CITY:
      return extend(state, {city: action.payload});
    case ActionTypes.SET_SORT_BY_SELECTED_OPTION_INDEX:
      return extend(state, {sortBySelectedOptionIndex: action.payload});
    case ActionTypes.SET_HOVER_OFFER_ID:
      return extend(state, {hoverOfferId: action.payload});
    case ActionTypes.RESET_HOVER_OFFER_ID:
      return extend(state, {hoverOfferId: null});
  }

  return state;
};

export {ActionCreators, ActionTypes, reducer};
