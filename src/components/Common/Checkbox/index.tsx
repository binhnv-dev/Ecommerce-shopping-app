/**
 *
 * Checkbox
 *
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CheckBox } from 'react-native-elements';

interface CheckboxProps {
  id: string;
  label: string;
  name: string;
  checked: boolean;
  value?: string;
  toggleCheckboxChange: (name: string, value: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ id, label, name, checked, value, toggleCheckboxChange }) => {
  const _onChange = () => {
    toggleCheckboxChange(name, !checked);
  };

  return (
    <View style={styles.checkboxContainer}>
      <CheckBox
        checked={checked}
        onPress={_onChange}
        containerStyle={styles.checkbox}
      />
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkbox: {
    padding: 0,
    margin: 0,
  },
  label: {
    marginLeft: 8,
    fontSize: 16,
  },
});

export default Checkbox;