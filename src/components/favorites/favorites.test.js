import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import {BrowserRouter} from "react-router-dom";
import {Favorites} from './favorites';
import {CityNames} from '../../const';
import {AuthorizationStatus} from "../../reducer/user/user";

const mockStore = configureStore([]);

const offersGroup = {
  [CityNames.AMSTERDAM]: [
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
  ],
  [CityNames.PARIS]: [
    {
      city: {
        name: CityNames.PARIS,
        location: {
          latitude: 48.85661,
          longitude: 2.351499,
          zoom: 13
        }
      },
      description: `description`,
      bedrooms: 1,
      maxAdults: 2,
      goods: [`Air conditioning`, `Washer`, `Dishwasher`],
      images: [`img/image1.jpg`, `img/image2.jpg`],
      isFavorite: true,
      previewImage: `img/apartment-01.jpg`,
      isPremium: true,
      type: `room`,
      id: 51,
      name: `Tile House`,
      price: 125,
      coords: [48.877610000000004, 2.333499],
      rating: 3.5,
      host: {
        name: `Angelina`,
        isPro: true,
        avatarUrl: `img/avatar-angelina.jpg`,
      },
    },
  ],
};

it(`Favorites is rendered correctly`, () => {
  const store = mockStore({
    user: {
      authorizationStatus: AuthorizationStatus.NO_AUTH,
      email: ``,
    }
  });
  const tree = renderer
    .create(
        <Provider store={store}>
          <BrowserRouter>
            <Favorites
              offersGroup={offersGroup}
              isLoading={false}
              isError={false}
              onFetchOffersFavorite={() => {}}
              onChangeFavoriteStatus={() => {}}
            />
          </BrowserRouter>
        </Provider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
