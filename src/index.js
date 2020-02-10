import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';

const Settings = {
  OFFERS_COUNT: 6
};
const offers = [
  `Beautiful & luxurious apartment at great location`,
  `Wood and stone place`,
  `Canal View Prinsengracht`,
  `Nice, cozy, warm big bed apartment`,
  `Wood and stone place`
];

ReactDOM.render(
    <App offersCount={Settings.OFFERS_COUNT} offers={offers} />,
    document.getElementById(`root`)
);
