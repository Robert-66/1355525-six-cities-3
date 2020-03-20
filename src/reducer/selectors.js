import {createSelector} from 'reselect';

function getAllOffers(state) {
  return state.data.offers.data;
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

export const getOffers = createSelector(
    getAllOffers,
    getCity,
    (offers, city) => offers.filter((offer) => (offer.city.name === city))
);

export const getSortedOffers = createSelector(
    getOffers,
    getSortBySelectedOptionIndex,
    (offers, sortBySelectedOptionIndex) => getOffersSorted(offers, sortBySelectedOptionIndex)
);

export const getCurrentCityLocation = createSelector(
    getOffers,
    (offers) => [offers[0].city.location.latitude, offers[0].city.location.longitude]
);

export const getCities = createSelector(
    getAllOffers,
    (offers) => getUniqCities(offers)
);
