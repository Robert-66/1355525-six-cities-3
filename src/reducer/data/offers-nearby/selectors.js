import {createSelector} from 'reselect';

export const getOffersNearby = createSelector(
    (state) => state.data.offersNearby,
    (offersNearby) => offersNearby
);
