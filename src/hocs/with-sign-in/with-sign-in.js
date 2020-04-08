import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Operation} from '../../reducer/user/user';

function withSignIn(Component) {
  class WithSignIn extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        email: ``,
        password: ``
      };

      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(e) {
      this.setState({
        [e.target.name]: e.target.value,
      });
    }

    handleSubmit(e) {
      const {onSubmit} = this.props;

      e.preventDefault();

      onSubmit({
        email: this.state.email,
        password: this.state.password,
      });
    }

    render() {
      return (
        <Component
          {...this.props}
          onChangeInput={this.handleInputChange}
          onSubmit={this.handleSubmit}
        >
        </Component>
      );
    }
  }

  WithSignIn.propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  function mapDispatchToProps(dispatch) {
    return {
      onSubmit: (authData) => dispatch(Operation.login(authData)),
    };
  }

  return connect(null, mapDispatchToProps)(WithSignIn);
}

export default withSignIn;
