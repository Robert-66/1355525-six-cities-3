import React from 'react';
import renderer from 'react-test-renderer';
import ReviewsForm from './reviews-form';

const reviewsForm = {
  data: [],
  isLoadingCreateReview: false,
  isErrorCreateReview: false,
};
const review = `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`;

it(`ReviewsForm is rendered correctly`, () => {
  const tree = renderer
    .create(
        <ReviewsForm
          ratings={[false, false, false, false, false]}
          review={review}
          isButtonSubmitDisabled={false}
          isFormDisabled={false}
          onChangeTextareaReview={() => {}}
          onChangeInputRating={() => {}}
          onSubmit={() => {}}
          onResetState={() => {}}
          reviews={reviewsForm}
        />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

