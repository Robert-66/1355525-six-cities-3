import React from 'react';
import renderer from 'react-test-renderer';
import App from './app';

const offers = [
  {
    id: 11,
    name: `Apartments Prinsengracht`,
    price: 120,
    coords: [52.3909553943508, 4.85309666406198],
  },
  {
    id: 21,
    name: `Lovely Studio With Canal Views`,
    price: 99,
    coords: [52.369553943508, 4.85309666406198],
  },
  {
    id: 31,
    name: `Zandberg - Canal view apartments`,
    price: 140,
    coords: [52.3909553943508, 4.929309666406198],
  },
  {
    id: 41,
    name: `Bright & new apartment with canal view`,
    price: 125,
    coords: [52.3809553943508, 4.939309666406198]
  }
];

it(`Render App`, () => {
  const tree = renderer
    .create(
        <App
          offers={offers}
        />,
        {
          createNodeMock: () => {
            return document.createElement(`div`);
          }
        }
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
