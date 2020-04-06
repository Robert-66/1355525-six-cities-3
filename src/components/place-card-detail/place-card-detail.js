import React from 'react';
import {connect} from 'react-redux';
import {getCurrentOffer} from '../../reducer/selectors';
import {getOffersNearby, getOffersNearbyMap} from '../../reducer/data/offers-nearby/selectors';
import {getCurrentCityLocation} from '../../reducer/selectors';
import {getAuthorizationStatus} from '../../reducer/user/selectors';
import {Operation as OffersOperation} from '../../reducer/data/offers/offers';
import {Operation as OffersNearbyOperation} from '../../reducer/data/offers-nearby/offers-nearby';
import history from '../../history';
import PropTypes from 'prop-types';
import Reviews from '../reviews/reviews';
import Map from '../map/map';
import {offerType} from '../../types/offers-types';
import {AppRoute, PlaceCardView} from '../../const';
import PlaceCardList from '../place-card-list/place-card-list';
import {AuthorizationStatus} from '../../reducer/user/user';

class PlaceCardDetail extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchOffersNearby(this.props.offer.id);
  }

  render() {
    const {
      offer,
      offersNearby,
      offersNearbyMap,
      currentCityLocation,
      authorizationStatus,
      onChangeFavoriteStatus,
    } = this.props;
    const {
      images,
      name,
      description,
      isPremium,
      isFavorite,
      type,
      bedrooms,
      maxAdults,
      price,
      rating,
      goods,
      host,
      id,
    } = offer;

    return (
      <main className="page__main page__main--property">
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
                <button
                  className={`property__bookmark-button button${isFavorite ? ` property__bookmark-button--active` : ``}`}
                  type="button"
                  onClick={() => authorizationStatus === AuthorizationStatus.AUTH
                    ? onChangeFavoriteStatus(id, Number(!isFavorite))
                    : history.push(AppRoute.LOGIN)}
                >
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
              <Reviews
                offerId={id}
                className="property__reviews"
              />
            </div>
          </div>
          {Object.keys(offersNearbyMap).length > 0 && (
            <Map
              className="property__map"
              offers={offersNearbyMap}
              city={currentCityLocation}
              hoverOfferId={id}
            />
          )}
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            {Object.keys(offersNearby.data).length > 0 && (
              <PlaceCardList
                offers={offersNearby.data}
                view={PlaceCardView.NEAR}
                onFavoriteClick={onChangeFavoriteStatus}
              />
            )}
          </section>
        </div>
      </main>
    );
  }
}

PlaceCardDetail.propTypes = {
  offer: offerType,
  offerId: PropTypes.string.isRequired,
  offersNearby: PropTypes.shape({
    data: PropTypes.arrayOf(offerType).isRequired,
    isLoading: PropTypes.bool.isRequired,
    isError: PropTypes.bool.isRequired
  }),
  offersNearbyMap: PropTypes.arrayOf(offerType).isRequired,
  currentCityLocation: PropTypes.arrayOf(PropTypes.number),
  fetchOffersNearby: PropTypes.func.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  onChangeFavoriteStatus: PropTypes.func.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    offer: getCurrentOffer(state, ownProps),
    offersNearby: getOffersNearby(state),
    offersNearbyMap: getOffersNearbyMap(state, ownProps),
    currentCityLocation: getCurrentCityLocation(state),
    authorizationStatus: getAuthorizationStatus(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchOffersNearby: (offerId) => dispatch(OffersNearbyOperation.fetchOffersNearby(offerId)),
    onChangeFavoriteStatus: (offerId, status) => dispatch(OffersOperation.changeOfferFavoriteStatus(offerId, status))
  };
}

export {PlaceCardDetail};
export default connect(mapStateToProps, mapDispatchToProps)(PlaceCardDetail);
