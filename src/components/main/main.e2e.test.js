import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Main from './main';

Enzyme.configure({
  adapter: new Adapter(),
});

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

it(`Should offer name be pressed`, () => {
  const handleCardNameClick = jest.fn();
  const main = mount(
      <Main
        offers={offers}
        onClickCardName={handleCardNameClick}
      />
  );
  const cardName = main.find(`.place-card__name a`).first();

  cardName.simulate(`click`);

  expect(handleCardNameClick.mock.calls.length).toBe(1);
});
