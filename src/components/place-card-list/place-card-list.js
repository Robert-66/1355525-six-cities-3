import React from 'react';
import PropTypes from 'prop-types';
import PlaceCard from '../place-card/place-card';

class PlaceCardList extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeCard: null,
    };

    this.handleMouseEnterCard = this.handleMouseEnterCard.bind(this);
    this.handleMouseLeaveCard = this.handleMouseLeaveCard.bind(this);
  }

  handleMouseEnterCard(offer) {
    this.setState({
      activeCard: offer
    });
  }

  handleMouseLeaveCard() {
    this.setState({
      activeCard: null
    });
  }

  render() {
    const {offers} = this.props;

    return (
      <div className="cities__places-list places__list tabs__content">
        {offers.map((offer) => (
          <PlaceCard
            key={offer.id}
            offer={offer}
            onClickCardName={this.props.onClickCardName}
            onMouseEnterCard={this.handleMouseEnterCard}
            onMouseLeaveCard={this.handleMouseLeaveCard}
          />
        ))}
      </div>
    );
  }
}

PlaceCardList.propTypes = {
  offers: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
      })).isRequired,
  onClickCardName: PropTypes.func.isRequired
};

export default PlaceCardList;
