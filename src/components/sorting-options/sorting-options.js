import React from 'react';
import PropTypes from 'prop-types';

function SortingOptions(props) {
  const {
    options,
    activeOptionIndex,
    isOpen,
    onClickOption,
    onClickToggle
  } = props;

  return (
    <>
      <span className="places__sorting-caption">Sort by</span>&nbsp;
      <span
        className="places__sorting-type" tabIndex="0"
        onClick={onClickToggle}
      >
        {options[activeOptionIndex]}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      <ul className={`places__options places__options--custom${isOpen ? ` places__options--opened` : ``}`}>
        {options.map((option, index) => {
          return (
            <li
              key={`${option}-${index}`}
              className={`places__option${activeOptionIndex === index ? ` places__option--active` : ``}`}
              onClick={() => onClickOption(index)}
            >
              {option}
            </li>
          );
        })}
      </ul>
    </>
  );
}

SortingOptions.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeOptionIndex: PropTypes.number.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClickOption: PropTypes.func.isRequired,
  onClickToggle: PropTypes.func.isRequired,
};

export default SortingOptions;
