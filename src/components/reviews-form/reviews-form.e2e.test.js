import React from 'react';
import {configure, shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ReviewsForm from './reviews-form';

configure({
  adapter: new Adapter(),
});

const reviewsForm = {
  data: [],
  isLoadingCreateReview: false,
  isErrorCreateReview: false,
};

const review = `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`;

describe(`ReviewsForm`, () => {

  it(`onSubmit is called`, () => {
    const onSubmit = jest.fn();
    const tree = shallow(
        <ReviewsForm
          ratings={[false, false, false, false, false]}
          review={review}
          isButtonSubmitDisabled={false}
          isFormDisabled={false}
          reviews={reviewsForm}
          onChangeTextareaReview={() => {}}
          onChangeInputRating={() => {}}
          onSubmit={onSubmit}
          onResetState={() => {}}
        />
    );

    const form = tree.find(`form`);
    form.simulate(`submit`);

    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it(`onChangeTextareaReview is called`, () => {
    const onChangeTextareaReview = jest.fn();
    const tree = mount(
        <ReviewsForm
          ratings={[false, false, false, false, false]}
          review={review}
          isButtonSubmitDisabled={false}
          isFormDisabled={false}
          reviews={reviewsForm}
          onChangeTextareaReview={onChangeTextareaReview}
          onChangeInputRating={() => {}}
          onSubmit={() => {}}
          onResetState={() => {}}
        />
    );

    const textarea = tree.find(`textarea`);
    textarea.instance().value = review;
    textarea.simulate(`change`);

    expect(onChangeTextareaReview).toHaveBeenCalledTimes(1);
  });

  it(`onChangeInputRating is called`, () => {
    const onChangeInputRating = jest.fn();
    const tree = mount(
        <ReviewsForm
          ratings={[false, false, false, false, false]}
          review={review}
          isButtonSubmitDisabled={false}
          isFormDisabled={false}
          reviews={reviewsForm}
          onChangeTextareaReview={() => {}}
          onChangeInputRating={onChangeInputRating}
          onSubmit={() => {}}
          onResetState={() => {}}
        />
    );

    const inputRating = tree.find(`input`).at(0);
    inputRating.instance().checked = true;
    inputRating.simulate(`change`);

    expect(onChangeInputRating).toHaveBeenCalledTimes(1);
  });
});
