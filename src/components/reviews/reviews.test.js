import React from 'react';
import renderer from 'react-test-renderer';
import {AuthorizationStatus} from '../../reducer/user/user';
import {Reviews} from './reviews';

const mocks = {
  reviews: [
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
  ],
  reviewsForm: {
    data: [],
    isLoading: false,
    isError: false,
  }
};

describe(`Reviews is rendered correctly`, () => {

  it(`when the user is authorized`, () => {
    const tree = renderer
      .create(
          <Reviews
            reviews={mocks.reviews}
            reviewsForm={mocks.reviewsForm}
            authorizationStatus={AuthorizationStatus.AUTH}
            offerId={1}
            onSubmitReview={() => {}}
            onResetReviewFormState={() => {}}
          />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`when the user is unauthorized`, () => {
    const tree = renderer
      .create(
          <Reviews
            reviews={mocks.reviews}
            reviewsForm={mocks.reviewsForm}
            authorizationStatus={AuthorizationStatus.NO_AUTH}
            offerId={1}
            onSubmitReview={() => {}}
            onResetReviewFormState={() => {}}
          />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
