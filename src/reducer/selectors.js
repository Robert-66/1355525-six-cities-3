export function getCities() {
  let cacheCity = ``;
  let cacheCities = [];

  return function (state) {
    if (!cacheCity.length || cacheCity !== state.city) {
      const allCities = state.offers.map((offer) => offer.city);
      let uniqCities = [];

      for (let city of allCities) {
        if (!uniqCities.includes(city.name)) {
          uniqCities.push(city.name);
        }
      }

      cacheCity = state.city;
      cacheCities = uniqCities.slice(0, 6);
    }

    return cacheCities;
  };
}

export function getOffers() {
  let cacheOffers = [];
  let cacheCity = ``;

  return function (state) {
    if (!cacheOffers.length || cacheCity !== state.city) {
      cacheOffers = state.offers.filter((offer) => (offer.city.name === state.city));
      cacheCity = state.city;
    }

    return cacheOffers;
  };
}

export function getSortedOffers() {
  let cacheOffers;
  let cacheSortedOffers = [];
  let cacheIndex = null;

  return function (offers, state) {
    if (cacheOffers !== offers || !cacheSortedOffers.length || cacheIndex !== state.sortBySelectedOptionIndex) {
      cacheOffers = offers;
      cacheSortedOffers = [...offers];
      cacheIndex = state.sortBySelectedOptionIndex;

      switch (state.sortBySelectedOptionIndex) {
        case 1:
          return cacheSortedOffers.sort((a, b) => b.price - a.price);
        case 2:
          return cacheSortedOffers.sort((a, b) => a.price - b.price);
        case 3:
          return cacheSortedOffers.sort((a, b) => b.rating - a.rating);
      }
    }

    return cacheSortedOffers;
  };
}

export function getCurrentCityLocation() {
  let cacheLocation = [];
  let cacheCity = ``;

  return function (offers, state) {
    if (!cacheLocation.length || cacheCity !== state.city) {
      cacheLocation = [offers[0].city.location.latitude, offers[0].city.location.longitude];
      cacheCity = state.city;
    }

    return cacheLocation;
  };
}
