import React from 'react';
import PropTypes from 'prop-types';
import PlaceCard from '../place-card/place-card';
import {offerType} from '../../types/offers-types.js';

class PlaceCardList extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      offers,
      className,
      classNamePlaceCard,
      classNamePlaceCardImageWrapper,
      onClickCardName,
      onMouseEnterCard,
      onMouseLeaveCard,
    } = this.props;

    return (
      <div className={`places__list${className ? ` ` + className : ``}`}>
        {offers.map((offer) => (
          <PlaceCard
            key={offer.id}
            offer={offer}
            className={classNamePlaceCard}
            classNameImageWrapper={classNamePlaceCardImageWrapper}
            onClickCardName={onClickCardName}
            onMouseEnterCard={onMouseEnterCard}
            onMouseLeaveCard={onMouseLeaveCard}
          />
        ))}
      </div>
    );
  }
}

PlaceCardList.propTypes = {
  className: PropTypes.string,
  classNamePlaceCard: PropTypes.string,
  classNamePlaceCardImageWrapper: PropTypes.string,
  offers: PropTypes.arrayOf(offerType).isRequired,
  onClickCardName: PropTypes.func,
  onMouseEnterCard: PropTypes.func,
  onMouseLeaveCard: PropTypes.func,
};

PlaceCardList.defaultProps = {
  classNamePlaceCard: ``,
  classNamePlaceCardImageWrapper: ``,
  onClickCardName: () => {},
  onMouseEnterCard: () => {},
  onMouseLeaveCard: () => {},
};

export default PlaceCardList;
