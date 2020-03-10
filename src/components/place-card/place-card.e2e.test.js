import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import PlaceCard from './place-card';

configure({
  adapter: new Adapter(),
});

const offer = {
  id: 11,
  name: `Apartments Prinsengracht`,
  price: 120,
};

describe(`PlaceCard callbacks`, () => {

  it(`When the cursor over the offer card in the callback onMouseEnterCard gets information about the offer`, () => {
    const handleMouseEnterCard = jest.fn();
    const placeCard = shallow(<PlaceCard
      offer={offer}
      onClickCardName={() => {}}
      onMouseEnterCard={handleMouseEnterCard}
      onMouseLeaveCard={() => {}}
    />);

    placeCard.simulate(`mouseEnter`);

    expect(handleMouseEnterCard).toHaveBeenCalledTimes(1);

    expect(handleMouseEnterCard.mock.calls[0][0]).toMatchObject(offer);
  });

  it(`When the cursor leaves the offer card, the callback onMouseLeaveCard is called`, () => {
    const handleMouseLeaveCard = jest.fn();
    const placeCard = shallow(<PlaceCard
      offer={offer}
      onClickCardName={() => {}}
      onMouseEnterCard={() => {}}
      onMouseLeaveCard={handleMouseLeaveCard}
    />);

    placeCard.simulate(`mouseLeave`);

    expect(handleMouseLeaveCard).toHaveBeenCalledTimes(1);
  });

  it(`Clicking on a offer name causes a callback`, () => {
    const handleCardNameClick = jest.fn();
    const placeCard = shallow(<PlaceCard
      offer={offer}
      onClickCardName={handleCardNameClick}
      onMouseEnterCard={() => {}}
      onMouseLeaveCard={() => {}}
    />);
    const cardName = placeCard.find(`.place-card__name a`);

    cardName.simulate(`click`);

    expect(handleCardNameClick).toHaveBeenCalledTimes(1);
  });
});

