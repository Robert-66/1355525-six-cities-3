import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {getOffersFavoriteGroupsByCity} from '../../reducer/data/offers-favorite/selectors';
import {Operation as OffersFavoriteOperation} from '../../reducer/data/offers-favorite/offers-favorite';
import {Operation as OffersOperation} from '../../reducer/data/offers/offers.js';
import PlaceCardList from '../place-card-list/place-card-list';
import FavoritesEmpty from '../favorites-empty/favorites-empty';
import {PlaceCardView, AppRoute} from '../../const';
import PropTypes from 'prop-types';
import {offerType} from '../../types/offers-types';

class Favorites extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.onFetchOffersFavorite();
  }

  render() {
    const {offersGroup, isLoading, isError, onChangeFavoriteStatus} = this.props;

    return (
      <>
        {Object.keys(offersGroup).length > 0 && (
          <main className="page__main page__main--favorites">
            <div className="page__favorites-container container">
              <section className="favorites">
                <h1 className="favorites__title">Saved listing</h1>
                <ul className="favorites__list">
                  {Object.keys(offersGroup).map((city) => (
                    <li key={city} className="favorites__locations-items">
                      <div className="favorites__locations locations locations--current">
                        <div className="locations__item">
                          <a className="locations__item-link" href="#">
                            <span>{city}</span>
                          </a>
                        </div>
                      </div>
                      <PlaceCardList
                        offers={offersGroup[city]}
                        view={PlaceCardView.FAVORITE}
                        onFavoriteClick={onChangeFavoriteStatus}
                      />
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </main>
        )}
        {Object.keys(offersGroup).length === 0 && !isLoading && !isError && (
          <FavoritesEmpty />
        )}
        <footer className="footer container">
          <Link className="footer__logo-link" to={AppRoute.ROOT}>
            <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
          </Link>
        </footer>
      </>
    );
  }
}

Favorites.propTypes = {
  offersGroup: PropTypes.shape({
    [PropTypes.string]: PropTypes.arrayOf(offerType.isRequired)
  }).isRequired,
  isLoading: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  onFetchOffersFavorite: PropTypes.func.isRequired,
  onChangeFavoriteStatus: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    offersGroup: getOffersFavoriteGroupsByCity(state),
    isLoading: state.data.offersFavorite.isLoading,
    isError: state.data.offersFavorite.isError,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onFetchOffersFavorite: () => dispatch(OffersFavoriteOperation.fetchOffersFavorite()),
    onChangeFavoriteStatus: (offerId, status) => dispatch(OffersOperation.changeOfferFavoriteStatus(offerId, status)),
  };
}

export {Favorites};
export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
