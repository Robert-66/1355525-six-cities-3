import React from 'react';

function Main(props) {
  // eslint-disable-next-line react/prop-types
  const {offersCount} = props;

  return (
    <>
      <h1>Главная страница</h1>
      <p>Количество предложений аренды: {offersCount}</p>
    </>
  );
}

export default Main;
