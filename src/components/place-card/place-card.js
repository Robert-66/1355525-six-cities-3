import React from 'react';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';
import PropTypes from 'prop-types';
import {offerType} from '../../types/offers-types';

function PlaceCard(props) {
  const {
    offer,
    className,
    classNameImageWrapper,
    onClickCardName,
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

  return (
    <article
      className={`place-card${className ? ` ` + className : ``}`}
      onMouseEnter={() => onMouseEnterCard(offer.id)}
      onMouseLeave={() => onMouseLeaveCard()}
    >
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className={`place-card__image-wrapper${classNameImageWrapper ? ` ` + classNameImageWrapper : ``}`}>
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
            onClick={() => onFavoriteClick(id, Number(!isFavorite))}
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
          <Link className="place-card__name-link" to={`${AppRoute.ROOM}/${id}`} onClick={onClickCardName}>{name}</Link>
        </h2>
        <p className="place-card__type"> {type === `room` ? `Private Room` : type[0].toUpperCase() + type.slice(1)}</p>
      </div>
    </article>
  );
}

PlaceCard.propTypes = {
  offer: offerType,
  className: PropTypes.string,
  classNameImageWrapper: PropTypes.string,
  onClickCardName: PropTypes.func,
  onMouseEnterCard: PropTypes.func,
  onMouseLeaveCard: PropTypes.func,
  onFavoriteClick: PropTypes.func.isRequired,
};

export default PlaceCard;
