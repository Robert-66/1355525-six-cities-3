import React from 'react';
import PropTypes from 'prop-types';
import {reviewType} from '../../types/reviews-types';

function withReviewsForm(Component) {
  class WithReviewsForm extends React.PureComponent {
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

      if (prevProps.reviews.isLoadingCreateReview && !this.props.reviews.isLoadingCreateReview && !this.props.reviews.isErrorCreateReview) {
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
      const {
        ratings,
        review,
        isButtonSubmitDisabled,
        isFormDisabled,
      } = this.state;

      return (
        <Component
          {...this.props}
          ratings={ratings}
          review={review}
          isButtonSubmitDisabled={isButtonSubmitDisabled}
          isFormDisabled={isFormDisabled}
          reviews={this.props.reviews}
          onChangeTextareaReview={this.handleTextareaReviewChange}
          onChangeInputRating={this.handleInputRatingChange}
          onSubmit={this.handleSubmit}
        >
        </Component>
      );
    }
  }

  WithReviewsForm.propTypes = {
    reviews: PropTypes.shape({
      data: PropTypes.arrayOf(reviewType).isRequired,
      isLoadingCreateReview: PropTypes.bool.isRequired,
      isErrorCreateReview: PropTypes.bool.isRequired,
    }).isRequired,
    onResetState: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
  };

  return WithReviewsForm;
}

export default withReviewsForm;
