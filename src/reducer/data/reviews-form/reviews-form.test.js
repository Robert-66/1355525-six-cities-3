import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../../../api';
import {reducer, ActionTypes, ActionCreators, Operation} from './reviews-form';

const api = createAPI(() => {});

const mocks = {
  offerId: 11,
  reviewFormData: {
    comment: `comment`,
    rating: 5,
  },
};

describe(`Reviews form reducer work correctly`, () => {

  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(undefined, {})).toEqual({
      data: [],
      isLoading: false,
      isError: false,
    });
  });

  it(`FETCH_REVIEWS_FORM_START`, () => {
    expect(reducer({
      data: [],
      isLoading: false,
      isError: false,
    }, ActionCreators.fetchReviewsFormStart())).toEqual({
      data: [],
      isLoading: true,
      isError: false,
    });
  });

  it(`FETCH_REVIEWS_FORM_SUCCESS`, () => {
    expect(reducer({
      data: [],
      isLoading: true,
      isError: false,
    }, ActionCreators.fetchReviewsFormSuccess(`data`))).toEqual({
      data: `data`,
      isLoading: false,
      isError: false,
    });
  });

  it(`FETCH_REVIEWS_FORM_FAILURE`, () => {
    expect(reducer({
      data: [],
      isLoading: true,
      isError: false,
    }, ActionCreators.fetchReviewsFormFailure())).toEqual({
      data: [],
      isLoading: false,
      isError: true,
    });
  });

  it(`RESET_REVIEWS_FORM_STATE`, () => {
    expect(reducer({
      data: [],
      isLoading: false,
      isError: true,
    }, ActionCreators.resetReviewsFormState())).toEqual({
      data: [],
      isLoading: false,
      isError: false,
    });
  });

});

describe(`Operation work correctly`, () => {

  it(`Should make a correct API call to /comments/11 finished successfully`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const reviewsFormLoader = Operation.fetchReviewsForm(mocks.offerId, mocks.reviewFormData);

    const expectedActions = [
      {type: ActionTypes.FETCH_REVIEWS_FORM_START},
      {type: ActionTypes.FETCH_REVIEWS_FORM_SUCCESS, payload: `data`},
    ];

    apiMock
      .onPost(`/comments/${mocks.offerId}`)
      .reply(200, `data`);

    return reviewsFormLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch.mock.calls[0][0]).toEqual(expectedActions[0]);
        expect(dispatch.mock.calls[1][0]).toEqual(expectedActions[1]);
      });
  });

  it(`Should make a correct API call to /comments/11 finished failure`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const reviewsFormLoader = Operation.fetchReviewsForm(mocks.offerId, mocks.reviewFormData);

    const expectedActions = [
      {type: ActionTypes.FETCH_REVIEWS_FORM_START},
      {type: ActionTypes.FETCH_REVIEWS_FORM_FAILURE}
    ];

    apiMock
      .onGet(`/comments/${mocks.offerId}`)
      .reply(400);

    return reviewsFormLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch.mock.calls[0][0]).toEqual(expectedActions[0]);
        expect(dispatch.mock.calls[1][0]).toEqual(expectedActions[1]);
      });
  });
});
