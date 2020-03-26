import React from 'react';
import renderer from 'react-test-renderer';
import ReviewsItem from './reviews-item';

const review = {
  comment: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
  date: `2019-05-08T14:13:56.569Z`,
  id: 1,
  rating: 3,
  user: {
    avatarUrl: `img/1.png`,
    name: `Max`,
  }
};

it(`ReviewsItem is rendered correctly`, () => {
  const tree = renderer
    .create(
        <ReviewsItem review={review} />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
