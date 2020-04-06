import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../../../api';
import {reducer, ActionTypes, ActionCreators, Operation} from './reviews';
import {adapterApi} from "../../../utils";

const api = createAPI(() => {});

const mocks = {
  offerId: 11,
  reviews: [
    {
      comment: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
      date: `2019-05-08T14:13:56.569Z`,
      id: 1,
      rating: 3,
      user: {
        avatarUrl: `img/1.png`,
        name: `Max`,
        id: 11,
        isPro: true,
      }
    },
    {
      comment: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
      date: `2017-08-08T14:13:56.569Z`,
      id: 2,
      rating: 5,
      user: {
        avatarUrl: `img/2.png`,
        name: `Anna`,
        id: 21,
        isPro: false,
      }
    },
  ],
  /* eslint-disable camelcase */
  serverReviews: [
    {
      comment: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
      date: `2019-05-08T14:13:56.569Z`,
      id: 1,
      rating: 3,
      user: {
        avatar_url: `img/1.png`,
        name: `Max`,
        id: 11,
        is_pro: true,
      }
    },
    {
      comment: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
      date: `2017-08-08T14:13:56.569Z`,
      id: 2,
      rating: 5,
      user: {
        avatar_url: `img/2.png`,
        name: `Anna`,
        id: 21,
        is_pro: false,
      }
    },
  ],
  reviewFormData: {
    comment: `comment`,
    rating: 5,
  },
};

describe(`Reviews reducer work correctly`, () => {

  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(undefined, {})).toEqual({
      data: [],
      isLoadingFetchReview: false,
      isLoadingCreateReview: false,
      isErrorFetchReview: false,
      isErrorCreateReview: false,
    });
  });

  it(`FETCH_REVIEWS_START`, () => {
    expect(reducer({
      data: [],
      isLoadingFetchReview: false,
      isLoadingCreateReview: false,
      isErrorFetchReview: false,
      isErrorCreateReview: false,
    }, ActionCreators.fetchReviewsStart())).toEqual({
      data: [],
      isLoadingFetchReview: true,
      isLoadingCreateReview: false,
      isErrorFetchReview: false,
      isErrorCreateReview: false,
    });
  });

  it(`FETCH_REVIEWS_SUCCESS`, () => {
    expect(reducer({
      data: [],
      isLoadingFetchReview: true,
      isLoadingCreateReview: false,
      isErrorFetchReview: false,
      isErrorCreateReview: false,
    }, ActionCreators.fetchReviewsSuccess(mocks.reviews))).toEqual({
      data: mocks.reviews,
      isLoadingFetchReview: false,
      isLoadingCreateReview: false,
      isErrorFetchReview: false,
      isErrorCreateReview: false,
    });
  });

  it(`FETCH_REVIEWS_FAILURE`, () => {
    expect(reducer({
      data: [],
      isLoadingFetchReview: true,
      isLoadingCreateReview: false,
      isErrorFetchReview: false,
      isErrorCreateReview: false,
    }, ActionCreators.fetchReviewsFailure())).toEqual({
      data: [],
      isLoadingFetchReview: false,
      isLoadingCreateReview: false,
      isErrorFetchReview: true,
      isErrorCreateReview: false,
    });
  });

  it(`FETCH_REVIEW_START`, () => {
    expect(reducer({
      data: [],
      isLoadingFetchReview: false,
      isLoadingCreateReview: false,
      isErrorFetchReview: false,
      isErrorCreateReview: false,
    }, ActionCreators.createReviewStart())).toEqual({
      data: [],
      isLoadingFetchReview: false,
      isLoadingCreateReview: true,
      isErrorFetchReview: false,
      isErrorCreateReview: false,
    });
  });

  it(`FETCH_REVIEW_SUCCESS`, () => {
    expect(reducer({
      data: [],
      isLoadingFetchReview: false,
      isLoadingCreateReview: true,
      isErrorFetchReview: false,
      isErrorCreateReview: false,
    }, ActionCreators.createReviewSuccess(mocks.reviews))).toEqual({
      data: mocks.reviews,
      isLoadingFetchReview: false,
      isLoadingCreateReview: false,
      isErrorFetchReview: false,
      isErrorCreateReview: false,
    });
  });

  it(`FETCH_REVIEW_FAILURE`, () => {
    expect(reducer({
      data: [],
      isLoadingFetchReview: false,
      isLoadingCreateReview: true,
      isErrorFetchReview: false,
      isErrorCreateReview: false,
    }, ActionCreators.createReviewFailure())).toEqual({
      data: [],
      isLoadingFetchReview: false,
      isLoadingCreateReview: false,
      isErrorFetchReview: false,
      isErrorCreateReview: true,
    });
  });

  it(`RESET_REVIEW_STATE`, () => {
    expect(reducer({
      data: [],
      isLoadingFetchReview: false,
      isLoadingCreateReview: false,
      isErrorFetchReview: false,
      isErrorCreateReview: true,
    }, ActionCreators.resetReviewState())).toEqual({
      data: [],
      isLoadingFetchReview: false,
      isLoadingCreateReview: false,
      isErrorFetchReview: false,
      isErrorCreateReview: false,
    });
  });

});

describe(`Operation work correctly`, () => {
  it(`Should make a correct API call method get to /comments/11 finished successfully`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const reviewsFormLoader = Operation.fetchReviews(mocks.offerId);

    const expectedActions = [
      {type: ActionTypes.FETCH_REVIEWS_START},
      {type: ActionTypes.FETCH_REVIEWS_SUCCESS, payload: adapterApi.transformReviews(mocks.serverReviews)},
    ];

    apiMock
      .onGet(`/comments/${mocks.offerId}`)
      .reply(200, mocks.serverReviews);

    return reviewsFormLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch.mock.calls[0][0]).toEqual(expectedActions[0]);
        expect(dispatch.mock.calls[1][0]).toEqual(expectedActions[1]);
      });
  });

  it(`Should make a correct API call method get to /comments/11 finished failure`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const reviewsFormLoader = Operation.fetchReviews(mocks.offerId);

    const expectedActions = [
      {type: ActionTypes.FETCH_REVIEWS_START},
      {type: ActionTypes.FETCH_REVIEWS_FAILURE}
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

  it(`Should make a correct API call method post to /comments/11 finished successfully`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const reviewsFormLoader = Operation.createReview(mocks.offerId, mocks.reviewFormData);

    const expectedActions = [
      {type: ActionTypes.CREATE_REVIEW_START},
      {type: ActionTypes.CREATE_REVIEW_SUCCESS, payload: adapterApi.transformReviews(mocks.serverReviews)},
    ];

    apiMock
      .onPost(`/comments/${mocks.offerId}`)
      .reply(200, mocks.serverReviews);

    return reviewsFormLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch.mock.calls[0][0]).toEqual(expectedActions[0]);
        expect(dispatch.mock.calls[1][0]).toEqual(expectedActions[1]);
      });
  });

  it(`Should make a correct API call method post to /comments/11 finished failure`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const reviewsFormLoader = Operation.createReview(mocks.offerId, mocks.reviewFormData);

    const expectedActions = [
      {type: ActionTypes.CREATE_REVIEW_START},
      {type: ActionTypes.CREATE_REVIEW_FAILURE}
    ];

    apiMock
      .onPost(`/comments/${mocks.offerId}`)
      .reply(400);

    return reviewsFormLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch.mock.calls[0][0]).toEqual(expectedActions[0]);
        expect(dispatch.mock.calls[1][0]).toEqual(expectedActions[1]);
      });
  });
});
