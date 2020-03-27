import React from 'react';
import {connect} from 'react-redux';
import {getCurrentCityLocation, getOffers} from '../../reducer/selectors';
import {extend} from '../../utils';
import PropTypes from 'prop-types';
import Reviews from '../reviews/reviews';
import Map from '../map/map';
import mockReviews from '../../mocks/reviews';
import {reviewType} from '../../types/reviews-types';
import {offerType} from '../../types/offers-types';
import PlaceCardList from '../place-card-list/place-card-list';

function PlaceCardDetail(props) {
  const {
    offer,
    offersNearby,
    offersNearbyMap,
    currentCityLocation,
    reviews,
  } = props;
  const {
    images,
    name,
    description,
    isPremium,
    type,
    bedrooms,
    maxAdults,
    price,
    rating,
    goods,
    host,
    id,
  } = offer.data;
  return (
    <main className="page__main page__main--property">
      {Object.keys(offer.data).length > 0 && (
        <>
          <section className="property">
            <div className="property__gallery-container container">
              <div className="property__gallery">
                {images.map((image, index) => (
                  <div key={`${image}-${index}`} className="property__image-wrapper">
                    <img className="property__image" src={image} alt={`Photo ${type}`} />
                  </div>
                ))}
              </div>
            </div>
            <div className="property__container container">
              <div className="property__wrapper">
                {isPremium && (
                  <div className="property__mark">
                    <span>Premium</span>
                  </div>
                )}
                <div className="property__name-wrapper">
                  <h1 className="property__name">
                    {name}
                  </h1>
                  <button className="property__bookmark-button button" type="button">
                    <svg className="property__bookmark-icon" width="31" height="33">
                      <use xlinkHref="#icon-bookmark" />
                    </svg>
                    <span className="visually-hidden">To bookmarks</span>
                  </button>
                </div>
                <div className="property__rating rating">
                  <div className="property__stars rating__stars">
                    <span style={{width: `${rating * 100 / 5}%`}} />
                    <span className="visually-hidden">Rating</span>
                  </div>
                  <span className="property__rating-value rating__value">{rating}</span>
                </div>
                <ul className="property__features">
                  <li className="property__feature property__feature--entire">
                    {type === `room` ? `Private Room` : type[0].toUpperCase() + type.slice(1)}
                  </li>
                  <li className="property__feature property__feature--bedrooms">
                    {bedrooms} Bedrooms
                  </li>
                  <li className="property__feature property__feature--adults">
                    Max {maxAdults} adults
                  </li>
                </ul>
                <div className="property__price">
                  <b className="property__price-value">&euro;{price}</b>
                  <span className="property__price-text">&nbsp;night</span>
                </div>
                <div className="property__inside">
                  <h2 className="property__inside-title">What&apos;s inside</h2>
                  <ul className="property__inside-list">
                    {goods.map((good, index) => (
                      <li key={`${good}-${index}`} className="property__inside-item">
                        {good}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="property__host">
                  <h2 className="property__host-title">Meet the host</h2>
                  <div className="property__host-user user">
                    <div className={`property__avatar-wrapper ${host.isPro ? `property__avatar-wrapper--pro` : ``} user__avatar-wrapper`}>
                      <img className="property__avatar user__avatar" src={host.avatarUrl} width="74" height="74" alt="Host avatar" />
                    </div>
                    <span className="property__user-name">
                      {host.name}
                    </span>
                    {host.isPro && (
                      <span className="property__user-status">Pro</span>
                    )}
                  </div>
                  <div className="property__description">
                    <p className="property__text">
                      {description}
                    </p>
                  </div>
                </div>
                <Reviews reviews={reviews} className="property__reviews" />
              </div>
            </div>
            <Map className="property__map" offers={offersNearbyMap} city={currentCityLocation} hoverOfferId={id} />
          </section>
          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">Other places in the neighbourhood</h2>
              <PlaceCardList
                offers={offersNearby}
                className="near-places__list"
                classNamePlaceCard="near-places__card"
                classNamePlaceCardImageWrapper="near-places__image-wrapper"
              />
            </section>
          </div>
        </>
      )}
      {offer.isError && (
        <div className="container">
          <h1>Что-то пошло не так :(</h1>
        </div>
      )}
    </main>
  );
}

PlaceCardDetail.propTypes = {
  offer: PropTypes.shape({
    data: PropTypes.shape({
      city: PropTypes.shape({
        name: PropTypes.string.isRequired,
        location: PropTypes.shape({
          latitude: PropTypes.number.isRequired,
          longitude: PropTypes.number.isRequired,
          zoom: PropTypes.number.isRequired,
        }).isRequired,
      }),
      images: PropTypes.arrayOf(PropTypes.string),
      name: PropTypes.string,
      description: PropTypes.string,
      isPremium: PropTypes.bool,
      type: PropTypes.string,
      bedrooms: PropTypes.number,
      maxAdults: PropTypes.number,
      price: PropTypes.number,
      rating: PropTypes.number,
      goods: PropTypes.arrayOf(PropTypes.string),
      host: PropTypes.shape({
        name: PropTypes.string.isRequired,
        isPro: PropTypes.bool.isRequired,
        avatarUrl: PropTypes.string.isRequired,
      }),
      id: PropTypes.number.isRequired,
    }).isRequired,
    isLoading: PropTypes.bool.isRequired,
    isError: PropTypes.bool.isRequired,
  }).isRequired,
  offersNearby: PropTypes.arrayOf(offerType).isRequired,
  offersNearbyMap: PropTypes.arrayOf(offerType).isRequired,
  currentCityLocation: PropTypes.arrayOf(PropTypes.number),
  reviews: PropTypes.arrayOf(reviewType).isRequired,
};

function mapStateToProps(state, props) {
  let offer = extend({}, getOffers(state));
  const data = offer.data.find((item) => item.id === Number(props.match.params.id));
  offer.data = data ? data : {};
  let offersNearby = [];
  let offersNearbyMap = [];

  if (Object.keys(offer.data).length) {
    offersNearby = getOffers(state).data
      .filter((item) => item.city.name === offer.data.city.name && item.id !== offer.data.id)
      .slice(0, 3);
    offersNearbyMap = [...offersNearby];
    offersNearbyMap.push(offer.data);
  }

  const reviews = mockReviews
      .slice(0, 10)
      .sort((a, b) => Date.parse(b.date) - Date.parse(a.date));

  return {
    offer,
    offersNearby,
    offersNearbyMap,
    currentCityLocation: getCurrentCityLocation(state),
    reviews
  };
}

export {PlaceCardDetail};
export default connect(mapStateToProps)(PlaceCardDetail);
