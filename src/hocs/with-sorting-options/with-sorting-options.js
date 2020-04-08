import React from 'react';
import PropTypes from 'prop-types';

function withSortingOptions(Component) {
  class WithSortingOptions extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        isOpen: false,
        activeOptionIndex: this.props.defaultIndex,
      };

      this.handleToggleClick = this.handleToggleClick.bind(this);
      this.handleOptionClick = this.handleOptionClick.bind(this);
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
      return (
        <Component
          {...this.props}
          activeOptionIndex={this.state.activeOptionIndex}
          onClickOption={this.handleOptionClick}
          isOpen={this.state.isOpen}
          onClickToggle={this.handleToggleClick}
        >
        </Component>
      );
    }
  }

  WithSortingOptions.propTypes = {
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    defaultIndex: PropTypes.number,
    onSelect: PropTypes.func.isRequired,
  };

  WithSortingOptions.defaultProps = {
    defaultIndex: 0,
  };

  return WithSortingOptions;
}

export default withSortingOptions;
