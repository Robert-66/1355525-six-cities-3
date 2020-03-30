import React from 'react';
import {connect} from 'react-redux';
import {ActionCreators} from '../../reducer/app/app';
import {MAX_CITIES_COUNT} from '../../const';
import {getCities, getOffers, getSortedOffers, getCurrentCityLocation} from '../../reducer/selectors';
import PlaceCardList from '../place-card-list/place-card-list';
import Map from '../map/map';
import MainEmpty from '../main-empty/main-empty';
import CitiesList from '../cities-list/cities-list';
import SortingOptions from '../sorting-options/sorting-options';
import {offerType} from '../../types/offers-types.js';
import PropTypes from 'prop-types';

function Main(props) {
  const {
    offers,
    sortedOffers,
    onClickCardName,
    cities,
    currentCity,
    currentCityLocation,
    hoverOfferId,
    sortingOptions,
    onClickCity,
    onSelectSortByOptionIndex,
    onMouseEnterCard,
    onMouseLeaveCard,
  } = props;

  return (
    <>
      {offers.data.length > 0 && (
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
                <b className="places__found">{offers.data.length} places to stay in Amsterdam</b>
                <form className="places__sorting" action="#" method="get">
                  <SortingOptions
                    options={sortingOptions}
                    onSelect={onSelectSortByOptionIndex}
                  />
                </form>
                <PlaceCardList
                  offers={sortedOffers}
                  className="cities__places-list tabs__content"
                  classNamePlaceCard="cities__place-card"
                  classNamePlaceCardImageWrapper="cities__image-wrapper"
                  onClickCardName={onClickCardName}
                  onMouseEnterCard={onMouseEnterCard}
                  onMouseLeaveCard={onMouseLeaveCard}
                />
              </section>
              <div className="cities__right-section">
                <Map
                  className="cities__map"
                  city={currentCityLocation}
                  offers={offers.data}
                  hoverOfferId={hoverOfferId}
                />
              </div>
            </div>
          </div>
        </main>
      )}
      {offers.data.length === 0 && !offers.isLoading && (
        <MainEmpty />
      )}
      {offers.isError && (
        <main className="page__main">
          <div className="container">
            <h1>Что-то пошло не так :(</h1>
          </div>
        </main>
      )}
    </>
  );
}

Main.propTypes = {
  offers: PropTypes.shape({
    data: PropTypes.arrayOf(offerType).isRequired,
    isLoading: PropTypes.bool.isRequired,
    isError: PropTypes.bool.isRequired,
  }).isRequired,
  sortedOffers: PropTypes.arrayOf(offerType),
  cities: PropTypes.array,
  currentCity: PropTypes.string,
  currentCityLocation: PropTypes.arrayOf(PropTypes.number),
  hoverOfferId: PropTypes.number,
  sortingOptions: PropTypes.arrayOf(PropTypes.string),
  onClickCity: PropTypes.func.isRequired,
  onClickCardName: PropTypes.func.isRequired,
  onSelectSortByOptionIndex: PropTypes.func.isRequired,
  onMouseEnterCard: PropTypes.func.isRequired,
  onMouseLeaveCard: PropTypes.func.isRequired,
};

const sortingOptions = [`Popular`, `Price: low to high`, `Price: high to low`, `Top rated first`];

function mapStateToProps(state) {
  if (!state.data.offers.data.length) {
    return {
      offers: state.data.offers,
    };
  }

  return {
    offers: getOffers(state),
    sortedOffers: getSortedOffers(state),
    currentCity: state.app.city,
    currentCityLocation: getCurrentCityLocation(state),
    cities: getCities(state),
    hoverOfferId: state.app.hoverOfferId,
    sortingOptions,
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
