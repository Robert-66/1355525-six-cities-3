import React from 'react';
import Main from '../main/main';
import PropTypes from 'prop-types';

const handleOfferNameClick = () => {};

function App(props) {
  const {offersCount, offers} = props;

  return (
    <Main
      offersCount={offersCount}
      offers={offers}
      onClickOfferName={handleOfferNameClick}
    />
  );
}

App.propTypes = {
  offersCount: PropTypes.number.isRequired,
  offers: PropTypes.array.isRequired,
};

export default App;
