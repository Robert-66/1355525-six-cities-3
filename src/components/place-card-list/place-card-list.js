import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import PlaceCard from '../place-card/place-card';
import {offerType} from '../../types/offers-types.js';
import {PlaceCardView} from '../../const';

const PlaceCardList = React.memo(function PlaceCardList(props) {
  const {
    offers,
    view,
    authorizationStatus,
    onMouseEnterCard,
    onMouseLeaveCard,
    onFavoriteClick,
  } = props;

  const classNameList = view === PlaceCardView.CITY ? `cities__places-list tabs__content` : `near-places__list`;

  return (
    <div className={`places__list ${classNameList}`}>
      {offers.map((offer) => (
        <PlaceCard
          key={offer.id}
          offer={offer}
          view={view}
          authorizationStatus={authorizationStatus}
          onMouseEnterCard={onMouseEnterCard}
          onMouseLeaveCard={onMouseLeaveCard}
          onFavoriteClick={onFavoriteClick}
        />
      ))}
    </div>
  );
});

PlaceCardList.propTypes = {
  offers: PropTypes.arrayOf(offerType).isRequired,
  view: PropTypes.oneOf([PlaceCardView.CITY, PlaceCardView.NEAR, PlaceCardView.FAVORITE]),
  authorizationStatus: PropTypes.string.isRequired,
  onMouseEnterCard: PropTypes.func,
  onMouseLeaveCard: PropTypes.func,
  onFavoriteClick: PropTypes.func,
};

PlaceCardList.defaultProps = {
  view: PlaceCardView.CITY,
};

function mapStateToProps(state) {
  return {
    authorizationStatus: state.user.authorizationStatus,
  };
}

export {PlaceCardList};
export default connect(mapStateToProps)(PlaceCardList);
