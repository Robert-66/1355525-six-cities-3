import React from 'react';
import Main from '../main/main';

function App(props) {
  // eslint-disable-next-line react/prop-types
  const {offersCount} = props;

  return <Main offersCount={offersCount} />;
}

export default App;
