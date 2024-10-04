import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

interface SelectOptionProps {
  disabled?: boolean;
  error?: string[];
  label?: string;
  multi?: boolean;
  options: { label: string; value: any }[];
  defaultValue?: any;
  value?: any;
  handleSelectChange: (value: any) => void;
}

const SelectOption: React.FC<SelectOptionProps> = ({
  disabled,
  error,
  label,
  multi,
  options,
  defaultValue,
  value,
  handleSelectChange,
}) => {
  const _handleSelectChange = (value: any) => {
    handleSelectChange(value);
  };

  return (
    <View style={styles.selectBox}>
      {label && <Text style={styles.label}>{label}</Text>}
      <RNPickerSelect
        disabled={disabled}
        onValueChange={_handleSelectChange}
        items={options}
        value={value}
        placeholder={{}}
        useNativeAndroidPickerStyle={false}
        style={{
          inputIOS: styles.inputIOS,
          inputAndroid: styles.inputAndroid,
          placeholder: styles.placeholder,
        }}
      />
      {error && <Text style={styles.invalidMessage}>{error[0]}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  selectBox: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  placeholder: {
    color: 'gray',
  },
  invalidMessage: {
    color: 'red',
    marginTop: 5,
  },
});

export default SelectOption;