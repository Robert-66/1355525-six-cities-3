import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../../../api';
import {reducer, ActionTypes, ActionCreators, Operation} from './offers';
import {CityNames} from '../../../const';

const api = createAPI(() => {});

const offers = [
  {
    city: {
      name: CityNames.AMSTERDAM,
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 13
      }
    },
    previewImage: `img/apartment-01.jpg`,
    isPremium: false,
    type: `apartment`,
    id: 11,
    name: `Apartments Prinsengracht`,
    price: 120,
    coords: [52.3909553943508, 4.85309666406198],
    rating: 4.3,
  },
];

/* eslint-disable camelcase */
const serverOffers = [
  {
    city: {
      name: CityNames.AMSTERDAM,
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 13
      }
    },
    preview_image: `img/apartment-01.jpg`,
    is_premium: false,
    rating: 4.3,
    type: `apartment`,
    title: `Apartments Prinsengracht`,
    price: 120,
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
      zoom: 16
    },
    id: 11
  }
];

describe(`Offers reducer work correctly`, () => {

  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(undefined, {})).toEqual({
      data: [],
      isLoading: false,
      isError: false,
    });
  });

  it(`FETCH_OFFERS_START`, () => {
    expect(reducer({
      data: [],
      isLoading: false,
      isError: false,
    }, ActionCreators.fetchOffersStart())).toEqual({
      data: [],
      isLoading: true,
      isError: false,
    });
  });

  it(`FETCH_OFFERS_SUCCESS`, () => {
    expect(reducer({
      data: [],
      isLoading: true,
      isError: false,
    }, ActionCreators.fetchOffersSuccess(serverOffers))).toEqual({
      data: offers,
      isLoading: false,
      isError: false,
    });
  });

  it(`FETCH_OFFERS_FAILURE`, () => {
    expect(reducer({
      data: [],
      isLoading: true,
      isError: false,
    }, ActionCreators.fetchOffersFailure())).toEqual({
      data: [],
      isLoading: false,
      isError: true,
    });
  });

});

describe(`Operation work correctly`, () => {

  it(`Should make a correct API call to /hotels finished successfully`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const offersLoader = Operation.fetchOffers();

    const expectedActions = [
      {type: ActionTypes.FETCH_OFFERS_START},
      {type: ActionTypes.FETCH_OFFERS_SUCCESS, payload: serverOffers},
    ];

    apiMock
      .onGet(`/hotels`)
      .reply(200, serverOffers);

    return offersLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch.mock.calls[0][0]).toEqual(expectedActions[0]);
        expect(dispatch.mock.calls[1][0]).toEqual(expectedActions[1]);
      });
  });

  it(`Should make a correct API call to /hotels finished failure`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const offersLoader = Operation.fetchOffers();

    const expectedActions = [
      {type: ActionTypes.FETCH_OFFERS_START},
      {type: ActionTypes.FETCH_OFFERS_FAILURE}
    ];

    apiMock
      .onGet(`/hotels`)
      .reply(400);

    return offersLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch.mock.calls[0][0]).toEqual(expectedActions[0]);
        expect(dispatch.mock.calls[1][0]).toEqual(expectedActions[1]);
      });
  });
});
