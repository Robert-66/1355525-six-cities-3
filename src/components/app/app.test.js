import React from 'react';
import renderer from 'react-test-renderer';
import App from './app';

const offers = [
  `Apartments Prinsengracht`,
  `Lovely Studio With Canal Views`,
  `Zandberg - Canal view apartments`,
  `Bright & new apartment with canal view`,
  `1637: Historic Canal View Suites`
];

it(`Render App`, () => {
  const tree = renderer
    .create(<App
      offersCount={6}
      offers={offers}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
