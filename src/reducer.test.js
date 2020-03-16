import {reducer, ActionCreators, ActionTypes} from './reducer.js';
import {CityNames} from './const';

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
    id: 11,
    name: `Apartments Prinsengracht`,
    price: 120,
    coords: [52.3909553943508, 4.85309666406198],
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
    id: 21,
    name: `Lovely Studio With Canal Views`,
    price: 99,
    coords: [52.369553943508, 4.85309666406198],
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
    id: 31,
    name: `Zandberg - Canal view apartments`,
    price: 140,
    coords: [52.3909553943508, 4.929309666406198],
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
    id: 41,
    name: `Bright & new apartment with canal view`,
    price: 125,
    coords: [52.3809553943508, 4.939309666406198]
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
    id: 51,
    name: `Tile House`,
    price: 125,
    coords: [48.877610000000004, 2.333499]
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
    id: 61,
    name: `Waterfront with extraordinary view`,
    price: 210,
    coords: [48.85761, 2.358499]
  }
];

describe(`Reducer work correctly`, () => {

  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(undefined, {})).toEqual({
      city: CityNames.PARIS,
      offers,
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
});
