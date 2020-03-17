import React from 'react';
import {connect} from 'react-redux';
import {ActionCreators} from '../../reducer';
import {MAX_CITIES_COUNT} from '../../const';
import PlaceCardList from '../place-card-list/place-card-list';
import Map from '../map/map';
import CitiesList from '../cities-list/cities-list';
import SortingOptions from '../sorting-options/sorting-options';
import {offerType} from '../../types/offers-types.js';
import PropTypes from 'prop-types';

function Main(props) {
  const {
    offers,
    onClickCardName,
    cities,
    currentCity,
    currentCityLocation,
    hoverOfferId,
    onClickCity,
    onSelectSortByOptionIndex,
    onMouseEnterCard,
    onMouseLeaveCard,
  } = props;

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
              <b className="places__found">{offers.length} places to stay in Amsterdam</b>
              <form className="places__sorting" action="#" method="get">
                <SortingOptions
                  options={[`Popular`, `Price: low to high`, `Price: high to low`, `Top rated first`]}
                  onSelect={onSelectSortByOptionIndex}
                />
              </form>
              <PlaceCardList
                offers={offers}
                onClickCardName={onClickCardName}
                onMouseEnterCard={onMouseEnterCard}
                onMouseLeaveCard={onMouseLeaveCard}
              />
            </section>
            <div className="cities__right-section">
              <Map
                className="cities__map"
                city={currentCityLocation}
                offers={offers}
                hoverOfferId={hoverOfferId}
              />
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
  currentCityLocation: PropTypes.arrayOf(PropTypes.number).isRequired,
  hoverOfferId: PropTypes.number,
  onClickCity: PropTypes.func.isRequired,
  onClickCardName: PropTypes.func.isRequired,
  onSelectSortByOptionIndex: PropTypes.func.isRequired,
  onMouseEnterCard: PropTypes.func.isRequired,
  onMouseLeaveCard: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    offers: getOffers(state),
    currentCity: state.city,
    currentCityLocation: [getOffers(state)[0].city.location.latitude, getOffers(state)[0].city.location.longitude],
    cities: getCities(state),
    hoverOfferId: state.hoverOfferId,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onClickCity: (city) => dispatch(ActionCreators.changeCity(city)),
    onSelectSortByOptionIndex: (index) => dispatch(ActionCreators.setSortBySelectedOptionIndex(index)),
    onMouseEnterCard: (id) => dispatch(ActionCreators.setHoverOfferId(id)),
    onMouseLeaveCard: () => dispatch(ActionCreators.resetHoverOfferId())
  };
}

export {Main};
export default connect(mapStateToProps, mapDispatchToProps)(Main);

function getCities(state) {
  const cities = state.offers.map((offer) => offer.city);
  let uniqCities = [];

  for (let city of cities) {
    if (!uniqCities.includes(city.name)) {
      uniqCities.push(city.name);
    }
  }

  return uniqCities;
}

function getOffers(state) {
  const offers = state.offers.filter((offer) => (offer.city.name === state.city));

  switch (state.sortBySelectedOptionIndex) {
    case 1:
      return offers.sort((a, b) => b.price - a.price);
    case 2:
      return offers.sort((a, b) => a.price - b.price);
    case 3:
      return offers.sort((a, b) => b.rating - a.rating);
  }

  return offers;
}
