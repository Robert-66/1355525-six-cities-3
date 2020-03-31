import {extend} from '../../../utils';

const initialState = {
  data: [],
  isLoading: false,
  isError: false
};

const ActionTypes = {
  FETCH_REVIEWS_FORM_START: `FETCH_REVIEWS_FORM_START`,
  FETCH_REVIEWS_FORM_SUCCESS: `FETCH_REVIEWS_FORM_SUCCESS`,
  FETCH_REVIEWS_FORM_FAILURE: `FETCH_REVIEWS_FORM_FAILURE`,
  RESET_REVIEWS_FORM_STATE: `RESET_REVIEWS_FORM_STATE`,
};

const ActionCreators = {
  fetchReviewsFormStart: () => ({
    type: ActionTypes.FETCH_REVIEWS_FORM_START,
  }),
  fetchReviewsFormSuccess: (data) => ({
    type: ActionTypes.FETCH_REVIEWS_FORM_SUCCESS,
    payload: data,
  }),
  fetchReviewsFormFailure: () => ({
    type: ActionTypes.FETCH_REVIEWS_FORM_FAILURE,
  }),
  resetReviewsFormState: () => ({
    type: ActionTypes.RESET_REVIEWS_FORM_STATE,
  })
};

const Operation = {
  fetchReviewsForm: (offerId, {comment, rating}) => (dispatch, getState, api) => {
    dispatch(ActionCreators.fetchReviewsFormStart());

    return api.post(`/comments/${offerId}`, {
      comment,
      rating,
    })
      .then((response) => {
        dispatch(ActionCreators.fetchReviewsFormSuccess(response.data));
      })
      .catch(() => {
        dispatch(ActionCreators.fetchReviewsFormFailure());
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_REVIEWS_FORM_START:
      return extend(state, {
        data: [],
        isLoading: true,
        isError: false
      });
    case ActionTypes.FETCH_REVIEWS_FORM_SUCCESS:
      return extend(state, {
        data: action.payload,
        isLoading: false,
      });
    case ActionTypes.FETCH_REVIEWS_FORM_FAILURE:
      return extend(state, {
        isError: true,
        isLoading: false
      });
    case ActionTypes.RESET_REVIEWS_FORM_STATE:
      return initialState;
  }

  return state;
};

export {ActionCreators, ActionTypes, Operation, reducer};
