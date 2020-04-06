import {createSelector} from 'reselect';
import {extend} from '../utils';

function getOffersState(state) {
  return state.data.offers;
}

function getCity(state) {
  return state.app.city;
}

function getSortBySelectedOptionIndex(state) {
  return state.app.sortBySelectedOptionIndex;
}

function getOffersSorted(offers, sortBySelectedOptionIndex) {
  const copyOffers = [...offers];

  switch (sortBySelectedOptionIndex) {
    case 1:
      return copyOffers.sort((a, b) => b.price - a.price);
    case 2:
      return copyOffers.sort((a, b) => a.price - b.price);
    case 3:
      return copyOffers.sort((a, b) => b.rating - a.rating);
  }

  return offers;
}

function getUniqCities(offers) {
  const allCities = offers.map((offer) => offer.city);
  let uniqCities = [];

  for (let city of allCities) {
    if (!uniqCities.includes(city.name)) {
      uniqCities.push(city.name);
    }
  }

  return uniqCities.slice(0, 6);
}

function getOfferId(state, props) {
  return props.offerId;
}

export const getCurrentOffer = createSelector(
    getOffersState,
    getOfferId,
    (offers, offerId) => offers.data.find((offer) => offer.id === Number(offerId))
);

export const getOffers = createSelector(
    getOffersState,
    getCity,
    (offers, city) => extend(offers, {data: offers.data.filter((offer) => (offer.city.name === city))})
);

export const getSortedOffers = createSelector(
    getOffers,
    getSortBySelectedOptionIndex,
    (offers, sortBySelectedOptionIndex) => getOffersSorted(offers.data, sortBySelectedOptionIndex)
);

export const getCurrentCityLocation = createSelector(
    getOffers,
    (offers) => [offers.data[0].city.location.latitude, offers.data[0].city.location.longitude]
);

export const getCities = createSelector(
    getOffersState,
    (offers) => getUniqCities(offers.data)
);
