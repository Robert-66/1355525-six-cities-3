import React from 'react';
import renderer from 'react-test-renderer';
import PlaceCard from './place-card';

const offer = {
  id: 11,
  name: `Apartments Prinsengracht`,
  price: 120,
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
