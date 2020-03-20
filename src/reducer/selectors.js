export function getCities() {
  let cacheCity = ``;
  let cacheCities = [];

  return function (state) {
    if (!cacheCity.length || cacheCity !== state.app.city) {
      const allCities = state.data.offers.data.map((offer) => offer.city);
      let uniqCities = [];

      for (let city of allCities) {
        if (!uniqCities.includes(city.name)) {
          uniqCities.push(city.name);
        }
      }

      cacheCity = state.app.city;
      cacheCities = uniqCities.slice(0, 6);
    }

    return cacheCities;
  };
}

export function getOffers() {
  let cacheOffers = [];
  let cacheCity = ``;

  return function (state) {
    if (!cacheOffers.length || cacheCity !== state.app.city) {
      cacheOffers = state.data.offers.data.filter((offer) => (offer.city.name === state.app.city));
      cacheCity = state.app.city;
    }

    return cacheOffers;
  };
}

export function getSortedOffers() {
  let cacheOffers;
  let cacheSortedOffers = [];
  let cacheIndex = null;

  return function (offers, state) {
    if (cacheOffers !== offers || !cacheSortedOffers.length || cacheIndex !== state.app.sortBySelectedOptionIndex) {
      cacheOffers = offers;
      cacheSortedOffers = [...offers];
      cacheIndex = state.app.sortBySelectedOptionIndex;

      switch (state.app.sortBySelectedOptionIndex) {
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
    if (!cacheLocation.length || cacheCity !== state.app.city) {
      cacheLocation = [offers[0].city.location.latitude, offers[0].city.location.longitude];
      cacheCity = state.app.city;
    }

    return cacheLocation;
  };
}
