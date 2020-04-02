import React from 'react';
import {Link} from 'react-router-dom';
import history from '../../history';
import {AuthorizationStatus} from '../../reducer/user/user';
import {AppRoute} from '../../const';
import PropTypes from 'prop-types';
import {offerType} from '../../types/offers-types';
import {PlaceCardView} from '../../const';

function PlaceCard(props) {
  const {
    offer,
    view,
    authorizationStatus,
    onMouseEnterCard,
    onMouseLeaveCard,
    onFavoriteClick,
  } = props;
  const {
    id,
    name,
    price,
    previewImage,
    isPremium,
    isFavorite,
    type,
    rating
  } = offer;
  let classNameArticle;
  let classNameImageWrapper;

  switch (view) {
    case PlaceCardView.CITY:
      classNameArticle = `cities__place-card`;
      classNameImageWrapper = `cities__image-wrapper`;
      break;
    case PlaceCardView.NEAR:
      classNameArticle = `near-places__card`;
      classNameImageWrapper = `near-places__image-wrapper`;
      break;
    case PlaceCardView.FAVORITE:
      classNameArticle = `favorites__card`;
      classNameImageWrapper = `favorites__image-wrapper`;
      break;
  }

  function handleCardMouseEnter(offerId) {
    if (onMouseEnterCard) {
      onMouseEnterCard(offerId);
    }
  }

  function handleCardLeaveEnter() {
    if (onMouseLeaveCard) {
      onMouseLeaveCard();
    }
  }

  function handleFavoriteClick() {
    if (onFavoriteClick) {
      // eslint-disable-next-line no-unused-expressions
      authorizationStatus === AuthorizationStatus.AUTH
        ? onFavoriteClick(id, Number(!isFavorite))
        : history.push(AppRoute.LOGIN);
    }
  }

  return (
    <article
      className={`place-card ${classNameArticle}`}
      onMouseEnter={() => handleCardMouseEnter(offer.id)}
      onMouseLeave={handleCardLeaveEnter}
    >
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className={`place-card__image-wrapper ${classNameImageWrapper}`}>
        <a href="#">
          <img className="place-card__image" src={previewImage} width="260" height="200" alt="Place image" />
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b> <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={`button ${isFavorite ? `place-card__bookmark-button--active` : `place-card__bookmark-button`}`}
            type="button"
            onClick={handleFavoriteClick}
          >
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
          <Link className="place-card__name-link" to={`${AppRoute.ROOM}/${id}`}>{name}</Link>
        </h2>
        <p className="place-card__type"> {type === `room` ? `Private Room` : type[0].toUpperCase() + type.slice(1)}</p>
      </div>
    </article>
  );
}

PlaceCard.propTypes = {
  offer: offerType,
  view: PropTypes.oneOf([PlaceCardView.CITY, PlaceCardView.NEAR, PlaceCardView.FAVORITE]),
  authorizationStatus: PropTypes.string.isRequired,
  onMouseEnterCard: PropTypes.func,
  onMouseLeaveCard: PropTypes.func,
  onFavoriteClick: PropTypes.func,
};

PlaceCard.defaultProps = {
  view: PlaceCardView.CITY,
};

export default PlaceCard;
