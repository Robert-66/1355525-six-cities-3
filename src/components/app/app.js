import React from 'react';
import Main from '../main/main';

function App(props) {
  // eslint-disable-next-line react/prop-types
  const {offersCount, offers} = props;

  return <Main offersCount={offersCount} offers={offers} />;
}

export default App;
