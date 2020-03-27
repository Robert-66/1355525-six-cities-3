import React from 'react';
import ReviewsItem from '../reviews-item/reviews-item';
import {reviewType} from '../../types/reviews-types.js';
import PropTypes from 'prop-types';

function ReviewsList(props) {
  const {reviews} = props;

  return (
    <ul className="reviews__list">
      {reviews.map((review) => (
        <ReviewsItem key={review.id} review={review} />
      ))}
    </ul>
  );
}

ReviewsList.propTypes = {
  reviews: PropTypes.arrayOf(reviewType).isRequired,
};

export default ReviewsList;
