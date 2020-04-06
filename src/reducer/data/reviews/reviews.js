import {extend} from '../../../utils';

const initialState = {
  data: [],
  isLoadingFetchReview: false,
  isLoadingCreateReview: false,
  isErrorFetchReview: false,
  isErrorCreateReview: false,
};

const ActionTypes = {
  FETCH_REVIEWS_START: `FETCH_REVIEWS_START`,
  FETCH_REVIEWS_SUCCESS: `FETCH_REVIEWS_SUCCESS`,
  FETCH_REVIEWS_FAILURE: `FETCH_REVIEWS_FAILURE`,
  CREATE_REVIEW_START: `CREATE_REVIEW_START`,
  CREATE_REVIEW_SUCCESS: `CREATE_REVIEW_SUCCESS`,
  CREATE_REVIEW_FAILURE: `CREATE_REVIEW_FAILURE`,
  RESET_REVIEW_STATE: `RESET_REVIEW_STATE`,
};

const ActionCreators = {
  fetchReviewsStart: () => ({
    type: ActionTypes.FETCH_REVIEWS_START,
  }),
  fetchReviewsSuccess: (data) => ({
    type: ActionTypes.FETCH_REVIEWS_SUCCESS,
    payload: data,
  }),
  fetchReviewsFailure: () => ({
    type: ActionTypes.FETCH_REVIEWS_FAILURE,
  }),
  createReviewStart: () => ({
    type: ActionTypes.CREATE_REVIEW_START,
  }),
  createReviewSucces: (data) => ({
    type: ActionTypes.CREATE_REVIEW_SUCCESS,
    payload: data
  }),
  createReviewFailure: () => ({
    type: ActionTypes.CREATE_REVIEW_FAILURE,
  }),
  resetReviewState: () => ({
    type: ActionTypes.RESET_REVIEW_STATE,
  })
};

const Operation = {
  fetchReviews: (offerId) => (dispatch, getState, api) => {
    dispatch(ActionCreators.fetchReviewsStart());
    return api.get(`/comments/${offerId}`)
      .then((response) => {
        dispatch(ActionCreators.fetchReviewsSuccess(response.data));
      })
      .catch(() => {
        dispatch(ActionCreators.fetchReviewsFailure());
      });
  },
  createReview: (offerId, data) => (dispatch, getState, api) => {
    return api.post(`/comments/${offerId}`, data)
      .then((response) => {
        dispatch(ActionCreators.createReviewSucces(response.data));
      })
      .catch(() => {
        dispatch(ActionCreators.createReviewFailure());
      });
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_REVIEWS_START:
      return extend(state, {isLoadingFetchReview: true, isErrorFetchReview: false});
    case ActionTypes.FETCH_REVIEWS_SUCCESS:
      return extend(state, {data: action.payload, isLoadingFetchReview: false});
    case ActionTypes.FETCH_REVIEWS_FAILURE:
      return extend(state, {data: [], isLoadingFetchReview: false, isErrorFetchReview: true});
    case ActionTypes.CREATE_REVIEW_START:
      return extend(state, {isLoadingCreateReview: true, isErrorCreateReview: false});
    case ActionTypes.CREATE_REVIEW_SUCCESS:
      return extend(state, {data: action.payload, isLoadingCreateReview: false});
    case ActionTypes.CREATE_REVIEW_FAILURE:
      return extend(state, {isLoadingCreateReview: false, isErrorCreateReview: true});
    case ActionTypes.RESET_REVIEW_STATE:
      return extend(state, {isLoadingCreateReview: false, isErrorCreateReview: false});
  }

  return state;
};

export {ActionCreators, ActionTypes, Operation, reducer};
