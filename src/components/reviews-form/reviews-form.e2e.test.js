import React from 'react';
import {configure, shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ReviewsForm from './reviews-form';

configure({
  adapter: new Adapter(),
});

const reviewsForm = {
  data: [],
  isLoading: false,
  isError: false,
};

const reviewFormData = {
  comment: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
  rating: 4,
};

describe(`ReviewsForm`, () => {

  it(`When user submit review form is not sent`, () => {
    const onSubmit = jest.fn();
    const tree = shallow(
        <ReviewsForm
          reviews={reviewsForm}
          onSubmit={onSubmit}
          onResetState={() => {}}
        />
    );

    const form = tree.find(`form`);
    const formSendPrevention = jest.fn();
    form.simulate(`submit`, {
      preventDefault: formSendPrevention,
    });

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(formSendPrevention).toHaveBeenCalledTimes(1);
  });

  it(`When user submit review onSubmit gets the data in the correct format`, () => {
    const onSubmit = jest.fn();
    const tree = mount(
        <ReviewsForm
          reviews={reviewsForm}
          onSubmit={onSubmit}
          onResetState={() => {}}
        />
    );
    const form = tree.find(`form`);
    const inputRating = tree.find(`input`).at(1);
    const textareaReview = tree.find(`textarea`);

    inputRating.simulate(`change`);
    textareaReview.instance().value = reviewFormData.comment;
    textareaReview.simulate(`change`);
    form.simulate(`submit`, {preventDefault() {}});

    expect(onSubmit).toHaveBeenCalledTimes(1);

    expect(onSubmit.mock.calls[0][0]).toEqual(reviewFormData);
  });
});
