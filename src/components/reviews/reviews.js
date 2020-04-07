import React from 'react';
import ReviewsList from '../reviews-list/reviews-list';
import ReviewsForm from '../reviews-form/reviews-form';
import {reviewType} from '../../types/reviews-types.js';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {AuthorizationStatus} from '../../reducer/user/user';
import {ActionCreators} from '../../reducer/data/reviews/reviews';
import {Operation as ReviewsOperation} from "../../reducer/data/reviews/reviews";
import {getReviewsForm} from "../../reducer/data/reviews/selectors";

function Reviews(props) {
  const {
    className,
    reviews,
    offerId,
    reviewsForm,
    authorizationStatus,
    onSubmitReview,
    onResetReviewFormState,
  } = props;

  function handleReviewSubmit(reviewData) {
    onSubmitReview(offerId, reviewData);
  }

  return (
    <section className={`reviews${className ? ` ` + className : ``}`}>
      {reviews.data.length > 0 && (
        <>
          <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.data.length}</span></h2>
          <ReviewsList reviews={reviews.data}/>
          {authorizationStatus === AuthorizationStatus.AUTH && (
            <ReviewsForm
              reviews={reviewsForm}
              onSubmit={handleReviewSubmit}
              onResetState={onResetReviewFormState}
            />
          )}
        </>
      )}
    </section>
  );
}

Reviews.propTypes = {
  className: PropTypes.string,
  reviews: PropTypes.shape({
    data: PropTypes.arrayOf(reviewType).isRequired,
    isLoadingFetchReview: PropTypes.bool.isRequired,
    isErrorFetchReview: PropTypes.bool.isRequired,
  }).isRequired,
  reviewsForm: PropTypes.shape({
    data: PropTypes.arrayOf(reviewType).isRequired,
    isLoadingCreateReview: PropTypes.bool.isRequired,
    isErrorCreateReview: PropTypes.bool.isRequired,
  }).isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  offerId: PropTypes.number.isRequired,
  onSubmitReview: PropTypes.func.isRequired,
  onResetReviewFormState: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    reviewsForm: getReviewsForm(state),
    authorizationStatus: state.user.authorizationStatus,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onSubmitReview: (offerId, reviewData) => dispatch(ReviewsOperation.createReview(offerId, reviewData)),
    onResetReviewFormState: () => dispatch(ActionCreators.resetReviewState()),
  };
}

export {Reviews};
export default connect(mapStateToProps, mapDispatchToProps)(Reviews);
