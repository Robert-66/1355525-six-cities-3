import React from 'react';
import {connect} from 'react-redux';
import {ActionCreators} from '../../reducer';
import {MAX_CITIES_COUNT} from '../../const';
import PlaceCardList from '../place-card-list/place-card-list';
import Map from '../map/map';
import CitiesList from '../cities-list/cities-list';
import {offerType} from '../../types/offers-types.js';
import PropTypes from 'prop-types';

function Main(props) {
  const {
    offers,
    onClickCardName,
    cities,
    currentCity,
    onClickCity
  } = props;
  const currentOffers = offers.filter((offer) => (offer.city.name === currentCity));
  const currentCityLocation = [currentOffers[0].city.location.latitude, currentOffers[0].city.location.longitude];

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link header__logo-link--active">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <CitiesList
          cities={cities}
          currentCity={currentCity}
          maxCitiesCount={MAX_CITIES_COUNT}
          onClickCity={onClickCity}
        />
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{currentOffers.length} places to stay in Amsterdam</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>&nbsp;
                <span className="places__sorting-type" tabIndex="0">
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select" />
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li className="places__option places__option--active" tabIndex="0">Popular</li>
                  <li className="places__option" tabIndex="0">Price: low to high</li>
                  <li className="places__option" tabIndex="0">Price: high to low</li>
                  <li className="places__option" tabIndex="0">Top rated first</li>
                </ul>
              </form>
              <PlaceCardList offers={currentOffers} onClickCardName={onClickCardName} />
            </section>
            <div className="cities__right-section">
              <Map className="cities__map" city={currentCityLocation} offers={currentOffers} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

Main.propTypes = {
  offers: PropTypes.arrayOf(offerType).isRequired,
  cities: PropTypes.array.isRequired,
  currentCity: PropTypes.string.isRequired,
  onClickCity: PropTypes.func.isRequired,
  onClickCardName: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    offers: state.offers,
    currentCity: state.city,
    cities: (() => {
      const cities = state.offers.map((offer) => offer.city);
      let uniqCities = [];

      for (let city of cities) {
        if (!uniqCities.includes(city.name)) {
          uniqCities.push(city.name);
        }
      }

      return uniqCities;
    })(),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onClickCity: (city) => dispatch(ActionCreators.changeCity(city))
  };
}

export {Main};
export default connect(mapStateToProps, mapDispatchToProps)(Main);
