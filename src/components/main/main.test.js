import React from 'react';
import renderer from 'react-test-renderer';
import Main from './main';

const offers = [
  `Apartments Prinsengracht`,
  `Lovely Studio With Canal Views`,
  `Zandberg - Canal view apartments`,
  `Bright & new apartment with canal view`,
  `1637: Historic Canal View Suites`
];

it(`Should Main render correctly`, () => {
  const tree = renderer
    .create(<Main
      offersCount={6}
      offers={offers}
      onClickOfferName={() => {}}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
