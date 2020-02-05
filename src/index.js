import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';

const Settings = {
  OFFERS_COUNT: 6
};

ReactDOM.render(
    <App offersCount={Settings.OFFERS_COUNT} />,
    document.getElementById(`root`)
);
