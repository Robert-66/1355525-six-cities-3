import React from 'react';
import PropTypes from 'prop-types';

class SortingOptions extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      activeOptionIndex: props.defaultIndex,
    };

    this.handleToggleClick = this.handleToggleClick.bind(this);
  }

  handleToggleClick() {
    this.setState((prevState) => ({
      isOpen: !prevState.isOpen,
    }));
  }

  handleOptionClick(index) {
    this.setState({
      isOpen: false,
      activeOptionIndex: index,
    });

    this.props.onSelect(index);
  }

  render() {
    const {isOpen, activeOptionIndex} = this.state;

    return (
      <>
        <span className="places__sorting-caption">Sort by</span>&nbsp;
        <span
          className="places__sorting-type" tabIndex="0"
          onClick={this.handleToggleClick}
        >
          {this.props.options[activeOptionIndex]}
          <svg className="places__sorting-arrow" width="7" height="4">
            <use xlinkHref="#icon-arrow-select" />
          </svg>
        </span>
        <ul className={`places__options places__options--custom${isOpen ? ` places__options--opened` : ``}`}>
          {this.props.options.map((option, index) => {
            return (
              <li
                key={`${option}-${index}`}
                className={`places__option${activeOptionIndex === index ? ` places__option--active` : ``}`}
                onClick={() => this.handleOptionClick(index)}
              >
                {option}
              </li>
            );
          })}
        </ul>
      </>
    );
  }
}

SortingOptions.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  defaultIndex: PropTypes.number,
  onSelect: PropTypes.func.isRequired,
};

SortingOptions.defaultProps = {
  defaultIndex: 0,
};

export default SortingOptions;
