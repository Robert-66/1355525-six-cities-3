import PropTypes from 'prop-types';

export const offerType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
}).isRequired;
