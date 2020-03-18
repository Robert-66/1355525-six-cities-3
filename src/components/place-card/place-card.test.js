import React from 'react';
import renderer from 'react-test-renderer';
import PlaceCard from './place-card';
import {CityNames} from '../../const';

const offer = {
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
};

it(`PlaceCard is rendered correctly`, () => {
  const placeCard = renderer.create(
      <PlaceCard
        offer={offer}
        onClickCardName={() => {}}
        onMouseEnterCard={() => {}}
        onMouseLeaveCard={() => {}}
      />
  ).toJSON();

  expect(placeCard).toMatchSnapshot();
});
