import React from 'react';
import PropTypes from 'prop-types';

class CitiesList extends React.PureComponent {
  constructor(props) {
    super(props);

    this.handleCityClick = this.handleCityClick.bind(this);
  }

  handleCityClick(e, city) {
    e.preventDefault();
    this.props.onClickCity(city);
  }

  render() {
    const {
      cities,
      currentCity,
    } = this.props;

    return (
      <div className="tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">
            {cities.map((city, index) => (
              <li key={`${city}-${index}`} className="locations__item">
                <a
                  className={`locations__item-link ${city === currentCity ? `tabs__item--active` : `tabs__item`}`}
                  href="#"
                  onClick={(e) => this.handleCityClick(e, city)}
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
}

CitiesList.propTypes = {
  cities: PropTypes.array.isRequired,
  currentCity: PropTypes.string.isRequired,
  onClickCity: PropTypes.func.isRequired,
};

export default CitiesList;
