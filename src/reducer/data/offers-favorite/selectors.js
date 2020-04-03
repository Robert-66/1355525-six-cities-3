import {createSelector} from 'reselect';

function createGroupsByCity(offers) {
  return offers.reduce((groupsByCity, offer) => {
    const city = offer.city.name;

    groupsByCity[city] = (groupsByCity[city] || []).concat(offer);

    return groupsByCity;
  }, {});
}


export const getOffersFavoriteGroupsByCity = createSelector(
    (state) => state.data.offersFavorite.data,
    (offers) => createGroupsByCity(offers)
);
