import React from 'react';
import renderer from 'react-test-renderer';
import {CityNames} from '../../const';
import {PlaceCardDetail} from './place-card-detail';

const offer = {
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
};

it(`Should PlaceCardDetail render correctly`, () => {
  const tree = renderer
    .create(
        <PlaceCardDetail offer={offer} />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
