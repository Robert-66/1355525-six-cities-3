import React from 'react';
import PropTypes from 'prop-types';
import {reviewType} from "../../types/reviews-types";

class ReviewsForm extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      ratings: [false, false, false, false, false],
      review: ``,
      isButtonSubmitDisabled: true,
      isFormDisabled: false,
    };

    this.handleTextareaReviewChange = this.handleTextareaReviewChange.bind(this);
    this.handleInputRatingChange = this.handleInputRatingChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate(prevProps) {
    const isRatingSet = this.state.ratings.some((rating) => rating === true);

    if (isRatingSet
      && this.state.review.length >= 50
      && this.state.review.length <= 300
      && !this.props.reviews.isLoadingCreateReview
    ) {
      this.setState({
        isButtonSubmitDisabled: false,
      });
    } else {
      this.setState({
        isButtonSubmitDisabled: true,
      });
    }

    if (!prevProps.reviews.isLoadingCreateReview && this.props.reviews.isLoadingCreateReview) {
      this.setState({
        isFormDisabled: true,
        isButtonSubmitDisabled: true,
      });
    }

    if (prevProps.reviews.data !== this.props.reviews.data) {
      this.setState({
        ratings: [false, false, false, false, false],
        review: ``,
        isFormDisabled: false,
      });
    }

    if (!prevProps.reviews.isErrorCreateReview && this.props.reviews.isErrorCreateReview) {
      this.setState({
        isFormDisabled: false,
      });
    }
  }

  componentWillUnmount() {
    this.props.onResetState();
  }

  handleTextareaReviewChange(e) {
    this.setState({
      review: e.target.value,
    });
  }

  handleInputRatingChange(e, i) {
    this.setState({
      ratings: this.state.ratings.map((rating, index) => i === index),
    });
  }

  handleSubmit(e) {
    const {ratings, review} = this.state;
    const {onSubmit} = this.props;
    e.preventDefault();

    onSubmit({
      comment: review,
      rating: ratings.indexOf(true) + 1,
    });
  }

  render() {
    const {handleTextareaReviewChange, handleInputRatingChange, handleSubmit} = this;
    const {ratings, review, isButtonSubmitDisabled, isFormDisabled} = this.state;
    const {reviews} = this.props;
    const ratingsLabelTitle = [`perfect`, `good`, `not bad`, `badly`, `terribly`];
    const ratingsLabelTitleLength = ratingsLabelTitle.length;

    return (
      <form className="reviews__form form" action="#" onSubmit={handleSubmit}>
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
                  onChange={(e) => handleInputRatingChange(e, numberInput - 1)}
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
          onChange={handleTextareaReviewChange}
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
}

ReviewsForm.propTypes = {
  reviews: PropTypes.shape({
    data: PropTypes.arrayOf(reviewType).isRequired,
    isLoadingCreateReview: PropTypes.bool.isRequired,
    isErrorCreateReview: PropTypes.bool.isRequired,
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
  onResetState: PropTypes.func.isRequired,
};

export default ReviewsForm;
