import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import {BrowserRouter} from 'react-router-dom';
import {Main} from './main';
import {CityNames} from '../../const';
import {AuthorizationStatus} from '../../reducer/user/user';
import {Provider} from 'react-redux';

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

const cities = [
  `Amsterdam`,
  `Paris`
];

const sortingOptions = [`Popular`, `Price: low to high`, `Price: high to low`, `Top rated first`];

describe(`Should Main render correctly`, () => {
  const store = mockStore({
    user: {
      authorizationStatus: AuthorizationStatus.NO_AUTH,
      email: ``,
    }
  });

  it(`when offers are`, () => {
    const tree = renderer
      .create(
          <Provider store={store}>
            <BrowserRouter>
              <Main
                offers={offers}
                sortedOffers={offers.data}
                cities={cities}
                currentCity="Paris"
                currentCityLocation={[48.877610000000004, 2.333499]}
                sortingOptions={sortingOptions}
                onSelectSortByOptionIndex={() => {}}
                onClickCity={() => {}}
                onMouseEnterCard={() => {}}
                onMouseLeaveCard={() => {}}
                onChangeFavoriteStatus={() => {}}
              />
            </BrowserRouter>
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

  it(`when there are no offers`, () => {
    offers.data = [];

    const tree = renderer
      .create(
          <Main
            offers={offers}
            onSelectSortByOptionIndex={() => {}}
            onClickCity={() => {}}
            onMouseEnterCard={() => {}}
            onMouseLeaveCard={() => {}}
            onChangeFavoriteStatus={() => {}}
          />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});


