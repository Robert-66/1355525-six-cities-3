import React from 'react';
import Main from '../main/main';

function handleCardNameClick() {
  return {};
}

function App() {
  return (
    <Main
      onClickCardName={handleCardNameClick}
    />
  );
}

export default App;
