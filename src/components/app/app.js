import React from 'react';
import Main from '../main/main';
import PropTypes from 'prop-types';

const handleCardNameClick = () => {};

function App(props) {
  const {offers} = props;

  return (
    <Main
      offers={offers}
      onClickCardName={handleCardNameClick}
    />
  );
}

App.propTypes = {
  offers: PropTypes.array.isRequired,
};

export default App;
