import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Main from './main';

Enzyme.configure({
  adapter: new Adapter(),
});

const offers = [
  `Apartments Prinsengracht`,
  `Lovely Studio With Canal Views`,
  `Zandberg - Canal view apartments`,
  `Bright & new apartment with canal view`,
  `1637: Historic Canal View Suites`
];

it(`Should offer name be pressed`, () => {
  const handleOfferNameClick = jest.fn();
  const mainScreen = shallow(
      <Main
        offersCount={6}
        offers={offers}
        onClickOfferName={handleOfferNameClick}
      />
  );

  const offerName = mainScreen.find(`.place-card__name`).first();

  offerName.props().onClick();

  expect(handleOfferNameClick.mock.calls.length).toBe(1);
});
