import {createSelector} from 'reselect';
import {getCurrentOffer} from '../../selectors';

function getOffersNearbyMain(state) {
  return state.data.offersNearby;
}

export const getOffersNearby = createSelector(
    getOffersNearbyMain,
    (offersNearby) => offersNearby
);

export const getOffersNearbyMap = createSelector(
    getOffersNearbyMain,
    getCurrentOffer,
    (offersNearby, currentOffer) => offersNearby.data.concat(currentOffer)
);
