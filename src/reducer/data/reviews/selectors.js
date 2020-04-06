import {createSelector} from 'reselect';
import {extend} from '../../../utils';

function getTransformedReviews(reviews) {
  return reviews
    .slice(-10)
    .sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
}

export const getReviews = createSelector(
    (state) => state.data.reviews,
    (reviews) => extend({}, {
      data: getTransformedReviews(reviews.data),
      isLoadingFetchReview: reviews.isLoadingFetchReview,
      isErrorFetchReview: reviews.isErrorFetchReview,
    })
);

export const getReviewsForm = createSelector(
    (state) => state.data.reviews,
    (reviews) => extend({}, {
      data: getTransformedReviews(reviews.data),
      isLoadingCreateReview: reviews.isLoadingCreateReview,
      isErrorCreateReview: reviews.isErrorCreateReview,
    })
);
