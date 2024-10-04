/**
 *
 * NotFound
 *
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface NotFoundProps {
  message?: string;
  className?: string;
  children?: React.ReactNode;
}

const NotFound: React.FC<NotFoundProps> = ({ message, className, children }) => {
  return (
    <View style={[styles.notFound, className && styles[className]]}>
      <Text>{message ? message : children}</Text>
    </View>
  );
};

NotFound.defaultProps = {
  className: '',
};

const styles: { [key: string]: any } = StyleSheet.create({
  notFound: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
});

export default NotFound;