import {reducer, ActionCreators, ActionTypes} from './reducer.js';
import {CityNames} from '../const';

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
    isPremium: true,
    type: `apartment`,
    id: 21,
    name: `Lovely Studio With Canal Views`,
    price: 99,
    coords: [52.369553943508, 4.85309666406198],
    rating: 3.1,
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
    previewImage: `img/apartment-01.jpg`,
    isPremium: true,
    type: `apartment`,
    id: 31,
    name: `Zandberg - Canal view apartments`,
    price: 140,
    coords: [52.3909553943508, 4.929309666406198],
    rating: 5,
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
    previewImage: `img/apartment-01.jpg`,
    isPremium: false,
    type: `room`,
    id: 41,
    name: `Bright & new apartment with canal view`,
    price: 125,
    coords: [52.3809553943508, 4.939309666406198],
    rating: 4.9,
  },
  {
    city: {
      name: CityNames.PARIS,
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13
      }
    },
    previewImage: `img/apartment-01.jpg`,
    isPremium: true,
    type: `room`,
    id: 51,
    name: `Tile House`,
    price: 125,
    coords: [48.877610000000004, 2.333499],
    rating: 3.5,
  },
  {
    city: {
      name: CityNames.PARIS,
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13
      }
    },
    previewImage: `img/apartment-01.jpg`,
    isPremium: false,
    type: `apartment`,
    id: 61,
    name: `Waterfront with extraordinary view`,
    price: 210,
    coords: [48.85761, 2.358499],
    rating: 4.8,
  }
];

describe(`Reducer work correctly`, () => {

  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(undefined, {})).toEqual({
      city: CityNames.PARIS,
      offers,
      sortBySelectedOptionIndex: 0,
      hoverOfferId: null,
    });
  });

  it(`Reducer should set offers by a given value`, () => {
    expect(reducer({
      city: CityNames.PARIS,
      offers: [],
    }, ActionCreators.setOffers(offers))).toEqual({
      city: CityNames.PARIS,
      offers,
    });
  });

  it(`Reducer should change city by a given value`, () => {
    expect(reducer({
      city: ``,
      offers: [],
    }, ActionCreators.changeCity(CityNames.PARIS))).toEqual({
      city: CityNames.PARIS,
      offers: [],
    });
  });

  it(`Reducer should set selected option index sort by a given value`, () => {
    expect(reducer({
      sortBySelectedOptionIndex: 0,
      offers: [],
    }, ActionCreators.setSortBySelectedOptionIndex(1))).toEqual({
      sortBySelectedOptionIndex: 1,
      offers: [],
    });
  });

  it(`Reducer should set the identifier of the offer that the cursor is over by a given value`, () => {
    expect(reducer({
      hoverOfferId: null,
      offers: [],
    }, ActionCreators.setHoverOfferId(11))).toEqual({
      hoverOfferId: 11,
      offers: [],
    });
  });

  it(`Reducer should set the offer identifier to null when the cursor leaves the offer by a given value`, () => {
    expect(reducer({
      hoverOfferId: 11,
      offers: [],
    }, ActionCreators.resetHoverOfferId())).toEqual({
      hoverOfferId: null,
      offers: [],
    });
  });
});

describe(`Action creators work correctly`, () => {

  it(`Action creator for change city returns correct action`, () => {
    expect(ActionCreators.changeCity(CityNames.PARIS)).toEqual({
      type: ActionTypes.CHANGE_CITY,
      payload: CityNames.PARIS
    });
  });

  it(`Action creator for set offers returns correct action`, () => {
    expect(ActionCreators.setOffers(offers)).toEqual({
      type: ActionTypes.SET_OFFERS,
      payload: offers
    });
  });

  it(`Action creator for selected option index sort returns correct action`, () => {
    expect(ActionCreators.setSortBySelectedOptionIndex(1)).toEqual({
      type: ActionTypes.SET_SORT_BY_SELECTED_OPTION_INDEX,
      payload: 1
    });
  });

  it(`Action creator for set the identifier of the offer that the cursor is over returns correct action`, () => {
    expect(ActionCreators.setHoverOfferId(11)).toEqual({
      type: ActionTypes.SET_HOVER_OFFER_ID,
      payload: 11
    });
  });

  it(`Action creator for set the offer identifier to null when the cursor leaves the offer returns correct action`, () => {
    expect(ActionCreators.resetHoverOfferId()).toEqual({
      type: ActionTypes.RESET_HOVER_OFFER_ID,
    });
  });
});
