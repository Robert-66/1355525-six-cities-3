import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import App from './app';
import {CityNames} from '../../const';
import {AuthorizationStatus} from '../../reducer/user/user';

const mockStore = configureStore([]);

const offers = {
  data: [
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
  ],
  isLoading: true,
  isError: false,
};

it(`Should App render correctly`, () => {
  const store = mockStore({
    data: {
      offers,
    },
    app: {
      city: `Amsterdam`,
    },
    user: {
      authorizationStatus: AuthorizationStatus.NO_AUTH,
      email: ``,
    }
  });

  const tree = renderer
    .create(
        <Provider store={store}>
          <App />
        </Provider>,
        {
          createNodeMock: () => {
            return document.createElement(`section`);
          }
        }
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
