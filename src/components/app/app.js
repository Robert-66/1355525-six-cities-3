import React from 'react';
import Main from '../main/main';
import PropTypes from 'prop-types';

function App(props) {
  const {offersCount, offers} = props;

  return <Main offersCount={offersCount} offers={offers} />;
}

App.propTypes = {
  offersCount: PropTypes.number.isRequired,
  offers: PropTypes.array.isRequired,
};

export default App;
