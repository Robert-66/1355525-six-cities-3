import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../../../api';
import {reducer, ActionTypes, ActionCreator, Operation} from './offers-nearby';
import {ActionCreators as OffersActionCreators} from '../offers/offers.js';
import {CityNames} from '../../../const';
import {adapterApi} from '../../../utils';
import {extend} from '../../../utils';

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
    description: `description`,
    bedrooms: 2,
    maxAdults: 3,
    goods: [`Air conditioning`, `Washer`, `Dishwasher`],
    images: [`img/image1.jpg`, `img/image2.jpg`],
    isFavorite: false,
    previewImage: `img/apartment-01.jpg`,
    isPremium: false,
    type: `apartment`,
    id: 11,
    name: `Apartments Prinsengracht`,
    price: 120,
    coords: [52.3909553943508, 4.85309666406198],
    rating: 4.3,
    host: {
      name: `Angelina`,
      isPro: true,
      avatarUrl: `img/avatar-angelina.jpg`,
    },
  },
  {
    city: {
      name: CityNames.AMSTERDAM,
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 13
      }
    },
    description: `description`,
    bedrooms: 1,
    maxAdults: 2,
    goods: [`Air conditioning`, `Washer`, `Dishwasher`],
    images: [`img/image1.jpg`, `img/image2.jpg`],
    isFavorite: true,
    previewImage: `img/apartment-02.jpg`,
    isPremium: false,
    type: `apartment`,
    id: 21,
    name: `Lovely Studio With Canal Views`,
    price: 99,
    coords: [52.369553943508, 4.85309666406198],
    rating: 3.1,
    host: {
      name: `Angelina`,
      isPro: true,
      avatarUrl: `img/avatar-angelina.jpg`,
    },
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
    description: `description`,
    bedrooms: 2,
    max_adults: 3,
    goods: [`Air conditioning`, `Washer`, `Dishwasher`],
    images: [`img/image1.jpg`, `img/image2.jpg`],
    is_favorite: false,
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
    id: 11,
    host: {
      name: `Angelina`,
      is_pro: true,
      avatar_url: `img/avatar-angelina.jpg`,
    },
  },
  {
    city: {
      name: CityNames.AMSTERDAM,
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 13
      }
    },
    description: `description`,
    bedrooms: 1,
    max_adults: 2,
    goods: [`Air conditioning`, `Washer`, `Dishwasher`],
    images: [`img/image1.jpg`, `img/image2.jpg`],
    is_favorite: false,
    preview_image: `img/apartment-01.jpg`,
    is_premium: false,
    rating: 4.3,
    type: `apartment`,
    title: `Lovely Studio With Canal Views`,
    price: 99,
    location: {
      latitude: 52.369553943508,
      longitude: 4.85309666406198,
      zoom: 16
    },
    id: 21,
    host: {
      name: `Angelina`,
      is_pro: true,
      avatar_url: `img/avatar-angelina.jpg`,
    },
  },
];

describe(`Offers nearby reducer work correctly`, () => {

  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(undefined, {})).toEqual({
      data: [],
      isLoading: false,
      isError: false,
    });
  });

  it(`FETCH_OFFERS_NEARBY_START`, () => {
    expect(reducer({
      data: [],
      isLoading: false,
      isError: false,
    }, ActionCreator.fetchOffersNearbyStart())).toEqual({
      data: [],
      isLoading: true,
      isError: false,
    });
  });

  it(`FETCH_OFFERS_NEARBY_SUCCESS`, () => {
    expect(reducer({
      data: [],
      isLoading: true,
      isError: false,
    }, ActionCreator.fetchOffersNearbySuccess(offers))).toEqual({
      data: offers,
      isLoading: false,
      isError: false,
    });
  });

  it(`FETCH_OFFERS_NEARBY_FAILURE`, () => {
    expect(reducer({
      data: [],
      isLoading: true,
      isError: false,
    }, ActionCreator.fetchOffersNearbyFailure())).toEqual({
      data: [],
      isLoading: false,
      isError: true,
    });
  });

  it(`UPDATE_OFFER`, () => {
    const updatedOffer = extend({}, offers[0]);
    updatedOffer.isFavorite = true;

    const updatedOffers = offers.map((offer) => offer.id === updatedOffer.id ? updatedOffer : offer);

    expect(reducer({
      data: offers,
      isLoading: false,
      isError: false,
    }, OffersActionCreators.updateOffer(updatedOffer))).toEqual({
      data: updatedOffers,
      isLoading: false,
      isError: false,
    });
  });
});

describe(`Operation work correctly`, () => {

  it(`Should make a correct API call to //hotels/1/nearby finished successfully`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const offersLoader = Operation.fetchOffersNearby(1);

    const expectedActions = [
      {type: ActionTypes.FETCH_OFFERS_NEARBY_START},
      {type: ActionTypes.FETCH_OFFERS_NEARBY_SUCCESS, payload: adapterApi.transformOffers(serverOffers)},
    ];

    apiMock
      .onGet(`/hotels/1/nearby`)
      .reply(200, serverOffers);

    return offersLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch.mock.calls[0][0]).toEqual(expectedActions[0]);
        expect(dispatch.mock.calls[1][0]).toEqual(expectedActions[1]);
      });
  });

  it(`Should make a correct API call to /hotels/1/nearby finished failure`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const offersLoader = Operation.fetchOffersNearby(1);

    const expectedActions = [
      {type: ActionTypes.FETCH_OFFERS_NEARBY_START},
      {type: ActionTypes.FETCH_OFFERS_NEARBY_FAILURE}
    ];

    apiMock
      .onGet(`/hotels/1/nearby`)
      .reply(400);

    return offersLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch.mock.calls[0][0]).toEqual(expectedActions[0]);
        expect(dispatch.mock.calls[1][0]).toEqual(expectedActions[1]);
      });
  });
});
