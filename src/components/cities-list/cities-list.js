import React from 'react';
import PropTypes from 'prop-types';

function CitiesList(props) {
  const {cities, currentCity, maxCitiesCount, onClickCity} = props;
  const citiesResult = cities.slice(0, maxCitiesCount - 1);

  function handleCityClick(e, city) {
    e.preventDefault();
    onClickCity(city);
  }

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {citiesResult.map((city, index) => (
            <li key={`${city}-${index}`} className="locations__item">
              <a
                className={`locations__item-link ${city === currentCity ? `tabs__item--active` : `tabs__item`}`}
                href="#"
                onClick={(e) => handleCityClick(e, city)}
              >
                <span>{city}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

CitiesList.propTypes = {
  cities: PropTypes.array.isRequired,
  currentCity: PropTypes.string.isRequired,
  maxCitiesCount: PropTypes.number.isRequired,
  onClickCity: PropTypes.func.isRequired,
};

export default CitiesList;
