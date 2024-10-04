/**
 *
 * Authentication
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { NavigationProp } from '@react-navigation/native';
import { RootState } from '../../store'; // Adjust the import based on your store setup
import actions from '../../actions';

interface Props {
  authenticated: boolean;
  navigation: NavigationProp<any>;
}

const withAuthentication = (ComposedComponent: React.ComponentType<any>) => {
  class Authentication extends React.PureComponent<Props> {
    render() {
      const { authenticated, navigation } = this.props;

      if (!authenticated) {
        navigation.navigate('Login');
        return null;
      } else {
        return <ComposedComponent {...this.props} />;
      }
    }
  }

  const mapStateToProps = (state: RootState) => {
    return {
      authenticated: state.authentication.authenticated,
    };
  };

  return connect(mapStateToProps, actions)(Authentication);
};

export default withAuthentication;