import React from 'react';
import renderer from 'react-test-renderer';
import Main from './main';

const offers = [
  {
    id: 11,
    name: `Apartments Prinsengracht`,
    price: 120,
  },
  {
    id: 21,
    name: `Lovely Studio With Canal Views`,
    price: 99,
  },
  {
    id: 31,
    name: `Zandberg - Canal view apartments`,
    price: 140,
  },
  {
    id: 41,
    name: `Bright & new apartment with canal view`,
    price: 125,
  }
];

it(`Should Main render correctly`, () => {
  const tree = renderer
    .create(<Main
      offers={offers}
      onClickCardName={() => {}}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
