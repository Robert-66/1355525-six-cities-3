import React from 'react';
import PropTypes from 'prop-types';
import {reviewType} from "../../types/reviews-types";

function ReviewsForm(props) {
  const {
    ratings,
    review,
    isButtonSubmitDisabled,
    isFormDisabled,
    reviews,
    onChangeTextareaReview,
    onChangeInputRating,
    onSubmit
  } = props;
  const ratingsLabelTitle = [`perfect`, `good`, `not bad`, `badly`, `terribly`];
  const ratingsLabelTitleLength = ratingsLabelTitle.length;

  return (
    <form className="reviews__form form" action="#" onSubmit={onSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {ratingsLabelTitle.map((ratingLabelTitle, index) => {
          const numberInput = ratingsLabelTitleLength - index;

          return (
            <React.Fragment key={`${ratingLabelTitle}-${index}`}>
              <input
                className="form__rating-input visually-hidden"
                name="rating"
                value={numberInput}
                id={`${numberInput}-stars`}
                type="radio"
                checked={ratings[numberInput - 1]}
                onChange={(e) => onChangeInputRating(e, numberInput - 1)}
                disabled={isFormDisabled}
              />
              <label
                htmlFor={`${ratingsLabelTitleLength - index}-stars`}
                className="reviews__rating-label form__rating-label"
                title="perfect"
              >
                <svg className="form__star-image" width="37" height="33">
                  <use xlinkHref="#icon-star" />
                </svg>
              </label>
            </React.Fragment>
          );
        })}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={review}
        onChange={onChangeTextareaReview}
        disabled={isFormDisabled}
      />
      {reviews.isErrorCreateReview && (
        <div style={{color: `red`, border: `1px solid red`, padding: `10px`, marginBottom: `10px`, borderRadius: `2px`}}>Что-то пошло не так :(</div>
      )}
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your
          stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={isButtonSubmitDisabled}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

ReviewsForm.propTypes = {
  ratings: PropTypes.arrayOf(PropTypes.bool).isRequired,
  review: PropTypes.string.isRequired,
  isButtonSubmitDisabled: PropTypes.bool.isRequired,
  isFormDisabled: PropTypes.bool.isRequired,
  reviews: PropTypes.shape({
    data: PropTypes.arrayOf(reviewType).isRequired,
    isLoadingCreateReview: PropTypes.bool.isRequired,
    isErrorCreateReview: PropTypes.bool.isRequired,
  }).isRequired,
  onChangeTextareaReview: PropTypes.func.isRequired,
  onChangeInputRating: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onResetState: PropTypes.func.isRequired,
};

export default ReviewsForm;
