import {extend, adapterApi} from '../../../utils';

const initialState = {
  data: [],
  isLoading: false,
  isError: false
};

const ActionTypes = {
  FETCH_OFFERS_START: `FETCH_OFFERS_START`,
  FETCH_OFFERS_SUCCESS: `FETCH_OFFERS_SUCCESS`,
  FETCH_OFFERS_FAILURE: `FETCH_OFFERS_FAILURE`,
  UPDATE_OFFER: `UPDATE_OFFER`,
};

const ActionCreators = {
  fetchOffersStart: () => ({
    type: ActionTypes.FETCH_OFFERS_START,
  }),
  fetchOffersSuccess: (data) => ({
    type: ActionTypes.FETCH_OFFERS_SUCCESS,
    payload: data,
  }),
  fetchOffersFailure: () => ({
    type: ActionTypes.FETCH_OFFERS_FAILURE,
  }),
  updateOffer: (offer) => ({
    type: ActionTypes.UPDATE_OFFER,
    payload: offer,
  })
};

const Operation = {
  fetchOffers: () => (dispatch, getState, api) => {
    dispatch(ActionCreators.fetchOffersStart());

    return api.get(`/hotels`)
      .then((response) => {
        dispatch(ActionCreators.fetchOffersSuccess(adapterApi.transformOffers(response.data)));
      })
      .catch(() => {
        dispatch(ActionCreators.fetchOffersFailure());
      });
  },
  changeOfferFavoriteStatus: (offerId, status) => (dispatch, getState, api) => {
    return api.post(`/favorite/${offerId}/${status}`)
      .then((response) => {
        dispatch(ActionCreators.updateOffer(adapterApi.transformOffer(response.data)));
      });
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_OFFERS_START:
      return extend(state, {isLoading: true});
    case ActionTypes.FETCH_OFFERS_SUCCESS:
      return extend(state, {data: action.payload, isLoading: false});
    case ActionTypes.FETCH_OFFERS_FAILURE:
      return extend(state, {isError: true, isLoading: false});
    case ActionTypes.UPDATE_OFFER:
      return extend(state, {data: state.data.map((offer) => offer.id === action.payload.id ? action.payload : offer)});
  }

  return state;
};

export {ActionCreators, ActionTypes, Operation, reducer};
