import React from 'react';
import ReviewsList from '../reviews-list/reviews-list';
import ReviewsForm from '../reviews-form/reviews-form';
import {reviewType} from '../../types/reviews-types.js';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {AuthorizationStatus} from '../../reducer/user/user';
import {Operation} from '../../reducer/data/reviews-form/reviews-form';
import {ActionCreators} from '../../reducer/data/reviews-form/reviews-form';

function Reviews(props) {
  const {
    className,
    reviews,
    reviewsForm,
    authorizationStatus,
    offerId,
    onSubmitReview,
    onResetReviewFormState,
  } = props;

  function handleReviewSubmit(reviewData) {
    onSubmitReview(offerId, reviewData);
  }

  return (
    <section className={`reviews${className ? ` ` + className : ``}`}>
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
      <ReviewsList reviews={reviews} />
      {authorizationStatus === AuthorizationStatus.AUTH && (
        <ReviewsForm
          reviews={reviewsForm}
          onSubmit={handleReviewSubmit}
          onResetState={onResetReviewFormState}
        />
      )}
    </section>
  );
}

Reviews.propTypes = {
  className: PropTypes.string,
  reviews: PropTypes.arrayOf(reviewType).isRequired,
  reviewsForm: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    isLoading: PropTypes.bool.isRequired,
    isError: PropTypes.bool.isRequired,
  }).isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  offerId: PropTypes.number.isRequired,
  onSubmitReview: PropTypes.func.isRequired,
  onResetReviewFormState: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    authorizationStatus: state.user.authorizationStatus,
    reviewsForm: state.data.reviewsForm,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onSubmitReview: (offerId, reviewData) => dispatch(Operation.fetchReviewsForm(offerId, reviewData)),
    onResetReviewFormState: () => dispatch(ActionCreators.resetReviewsFormState()),
  };
}

export {Reviews};
export default connect(mapStateToProps, mapDispatchToProps)(Reviews);
