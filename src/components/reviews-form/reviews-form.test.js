import React from 'react';
import renderer from 'react-test-renderer';
import ReviewsForm from './reviews-form';

const reviewsForm = {
  data: [],
  isLoading: false,
  isError: false,
};

it(`ReviewsForm is rendered correctly`, () => {
  const tree = renderer
    .create(
        <ReviewsForm
          reviews={reviewsForm}
          onSubmit={() => {}}
          onResetState={() => {}}
        />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

