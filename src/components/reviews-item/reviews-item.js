import React from 'react';
import {reviewType} from '../../types/reviews-types.js';

function ReviewsItem(props) {
  const {
    comment,
    date,
    user,
    rating
  } = props.review;
  const months = [`January`, `February`, `March`, `April`, `May`, `June`, `July`, `August`, `September`, `October`, `November`, `December`];
  const dateReview = new Date(date);
  const yearReview = dateReview.getFullYear();
  const monthReview = months[dateReview.getMonth()];

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          {user.avatarUrl && (
            <img className="reviews__avatar user__avatar" src={user.avatarUrl} width="54" height="54" alt="Reviews avatar" />
          )}
        </div>
        <span className="reviews__user-name">{name}</span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: `${rating * 100 / 5}%`}} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">{comment}</p>
        <time className="reviews__time" dateTime={date.slice(0, 10)}>{`${monthReview} ${yearReview}`}</time>
      </div>
    </li>
  );
}

ReviewsItem.propTypes = {
  review: reviewType,
};

export default ReviewsItem;
