import React from 'react';
import PropTypes from 'prop-types';
import PlaceCard from '../place-card/place-card';
import {offerType} from '../../types/offers-types.js';

function PlaceCardList(props) {
  const {
    offers,
    onClickCardName,
    onMouseEnterCard,
    onMouseLeaveCard
  } = props;

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <PlaceCard
          key={offer.id}
          offer={offer}
          onClickCardName={onClickCardName}
          onMouseEnterCard={onMouseEnterCard}
          onMouseLeaveCard={onMouseLeaveCard}
        />
      ))}
    </div>
  );
}

PlaceCardList.propTypes = {
  offers: PropTypes.arrayOf(offerType).isRequired,
  onClickCardName: PropTypes.func.isRequired,
  onMouseEnterCard: PropTypes.func.isRequired,
  onMouseLeaveCard: PropTypes.func.isRequired,
};

export default PlaceCardList;
