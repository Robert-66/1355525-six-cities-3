import {extend, adapterApi} from '../../../utils';
import {ActionTypes as OffersActionType} from '../offers/offers';

const initialState = {
  data: [],
  isLoading: false,
  isError: false,
};

const ActionTypes = {
  FETCH_OFFERS_NEARBY_START: `FETCH_OFFERS_NEARBY_START`,
  FETCH_OFFERS_NEARBY_SUCCESS: `FETCH_OFFERS_NEARBY_SUCCESS`,
  FETCH_OFFERS_NEARBY_FAILURE: `FETCH_OFFERS_NEARBY_FAILURE`,
};

const ActionCreator = {
  fetchOffersNearbyStart: () => ({
    type: ActionTypes.FETCH_OFFERS_NEARBY_START,
  }),
  fetchOffersNearbySuccess: (data) => ({
    type: ActionTypes.FETCH_OFFERS_NEARBY_SUCCESS,
    payload: data,
  }),
  fetchOffersNearbyFailure: () => ({
    type: ActionTypes.FETCH_OFFERS_NEARBY_FAILURE,
  })
};

const Operation = {
  fetchOffersNearby: (offerId) => (dispatch, getState, api) => {
    dispatch(ActionCreator.fetchOffersNearbyStart());

    return api.get(`/hotels/${offerId}/nearby`)
      .then((response) => {
        dispatch(ActionCreator.fetchOffersNearbySuccess(adapterApi.transformOffers(response.data)));
      })
      .catch(() => {
        dispatch(ActionCreator.fetchOffersNearbyFailure());
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_OFFERS_NEARBY_START:
      return extend(state, {isLoading: true, isError: false});
    case ActionTypes.FETCH_OFFERS_NEARBY_SUCCESS:
      return extend(state, {data: action.payload, isError: false, isLoading: false});
    case ActionTypes.FETCH_OFFERS_NEARBY_FAILURE:
      return extend(state, {data: [], isError: true, isLoading: false});
    case OffersActionType.UPDATE_OFFER:
      return extend(state, {data: state.data.map((offer) => offer.id === action.payload.id ? action.payload : offer)});
  }

  return state;
};

export {ActionCreator, ActionTypes, Operation, reducer};
