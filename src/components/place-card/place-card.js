import React from 'react';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';
import PropTypes from 'prop-types';
import {offerType} from '../../types/offers-types';

function PlaceCard(props) {
  const {
    offer,
    onClickCardName,
    onMouseEnterCard,
    onMouseLeaveCard
  } = props;
  const {
    id,
    name,
    price,
    previewImage,
    isPremium,
    type,
    rating
  } = offer;

  return (
    <article
      className="cities__place-card place-card"
      onMouseEnter={() => onMouseEnterCard(offer.id)}
      onMouseLeave={() => onMouseLeaveCard()}
    >
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href="#">
          <img className="place-card__image" src={previewImage} width="260" height="200" alt="Place image" />
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b> <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className="place-card__bookmark-button button" type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark" />
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${rating * 100 / 5}%`}} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.ROOM}/${id}`} onClick={onClickCardName}>{name}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

PlaceCard.propTypes = {
  offer: offerType,
  onClickCardName: PropTypes.func.isRequired,
  onMouseEnterCard: PropTypes.func.isRequired,
  onMouseLeaveCard: PropTypes.func.isRequired,
};

export default PlaceCard;
