import React from 'react';
import renderer from 'react-test-renderer';
import Reviews from './reviews';

const reviews = [
  {
    comment: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
    date: `2019-05-08T14:13:56.569Z`,
    id: 1,
    rating: 3,
    user: {
      avatarUrl: `img/1.png`,
      name: `Max`,
    }
  },
  {
    comment: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
    date: `2017-08-08T14:13:56.569Z`,
    id: 2,
    rating: 5,
    user: {
      avatarUrl: `img/2.png`,
      name: `Anna`,
    }
  },
];

it(`Reviews is rendered correctly`, () => {
  const tree = renderer
    .create(
        <Reviews reviews={reviews} />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
