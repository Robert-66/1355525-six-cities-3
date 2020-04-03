import {extend, adapterApi} from '../../../utils';
import {ActionTypes as OffersActionType} from '../offers/offers.js';

const initialState = {
  data: [],
  isLoading: false,
  isError: false,
};

const ActionTypes = {
  FETCH_OFFERS_FAVORITE_START: `FETCH_OFFERS_FAVORITE_START`,
  FETCH_OFFERS_FAVORITE_SUCCESS: `FETCH_OFFERS_FAVORITE_SUCCESS`,
  FETCH_OFFERS_FAVORITE_FAILURE: `FETCH_OFFERS_FAVORITE_FAILURE`,
};

const ActionCreator = {
  fetchOffersFavoriteStart: () => ({
    type: ActionTypes.FETCH_OFFERS_FAVORITE_START,
  }),
  fetchOffersFavoriteSuccess: (data) => ({
    type: ActionTypes.FETCH_OFFERS_FAVORITE_SUCCESS,
    payload: data,
  }),
  fetchOffersFavoriteFailure: () => ({
    type: ActionTypes.FETCH_OFFERS_FAVORITE_FAILURE,
  }),
};

const Operation = {
  fetchOffersFavorite: () => (dispatch, getState, api) => {
    dispatch(ActionCreator.fetchOffersFavoriteStart());

    return api.get(`/favorite`)
      .then((response) => {
        dispatch(ActionCreator.fetchOffersFavoriteSuccess(adapterApi.transformOffers(response.data)));
      })
      .catch(() => {
        dispatch(ActionCreator.fetchOffersFavoriteFailure());
      });
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_OFFERS_FAVORITE_START:
      return extend(state, {isLoading: true, isError: false});
    case ActionTypes.FETCH_OFFERS_FAVORITE_SUCCESS:
      return extend(state, {data: action.payload, isLoading: false, isError: false,});
    case ActionTypes.FETCH_OFFERS_FAVORITE_FAILURE:
      return extend(state, {data: [], isLoading: false, isError: true,});
    case OffersActionType.UPDATE_OFFER:
      return Object.assign({}, state, {
        data: state.data.filter((offer) => offer.id !== action.payload.id)
      });
  }

  return state;
};

export {ActionCreator, ActionTypes, Operation, reducer};
