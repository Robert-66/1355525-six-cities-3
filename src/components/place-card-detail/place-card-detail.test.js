import React from 'react';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import renderer from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';
import {CityNames} from '../../const';
import {AuthorizationStatus} from '../../reducer/user/user';
import {PlaceCardDetail} from './place-card-detail';

const mockStore = configureStore([]);

const mocks = {
  offer: {
    data: {
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
    isLoading: false,
    isError: false,
  },
  offersNearby: [
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
  ],
  reviews: [
    {
      comment: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
      date: `2019-05-08T14:13:56.569Z`,
      id: 1,
      rating: 3,
      user: {
        avatarUrl: `img/1.png`,
        name: `Max`,
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
      }
    },
  ],
  reviewsForm: {
    data: [],
    isLoading: false,
    isError: false,
  },
  currentCityLocation: [52.37454, 4.897976],
};
mocks.offersNearbyMap = [mocks.offer.data, ...mocks.offersNearby];

it(`Should PlaceCardDetail render correctly`, () => {
  const store = mockStore({
    user: {
      authorizationStatus: AuthorizationStatus.AUTH,
    },
    data: {
      reviewsForm: mocks.reviewsForm,
    }
  });

  const tree = renderer
    .create(
        <Provider store={store}>
          <BrowserRouter>
            <PlaceCardDetail
              offer={mocks.offer}
              offersNearby={mocks.offersNearby}
              offersNearbyMap={mocks.offersNearbyMap}
              currentCityLocation={mocks.currentCityLocation}
              reviews={mocks.reviews}
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
