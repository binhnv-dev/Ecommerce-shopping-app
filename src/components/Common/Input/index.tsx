import React from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';

interface InputProps extends Omit<TextInputProps, 'value'> {
  type: 'text' | 'number' | 'textarea' | 'stars';
  value?: string | number;
  error?: string[];
  step?: number;
  decimals?: boolean;
  min?: number;
  max?: number;
  placeholder?: string;
  rows?: number;
  label?: string;
  name: string;
  onInputChange: (name: string, value: any) => void;
  inlineElement?: React.ReactNode;
  disabled?: boolean;
}

const Input: React.FC<InputProps> = (props) => {
  const {
    type,
    value,
    error,
    decimals,
    min,
    max,
    disabled,
    placeholder,
    rows,
    label,
    name,
    onInputChange,
    inlineElement,
    ...rest
  } = props;

  const _onChange = (value: any) => {
    onInputChange(name, value);
  };

  if (type === 'textarea') {
    return (
      <View style={[styles.inputBox, error && styles.invalid]}>
        {label && <Text style={styles.label}>{label}</Text>}
        <TextInput
          multiline
          numberOfLines={rows}
          onChangeText={_onChange}
          value={value as string}
          placeholder={placeholder}
          style={styles.textarea}
          editable={!disabled}
          {...rest}
        />
        {error && <Text style={styles.invalidMessage}>{error[0]}</Text>}
      </View>
    );
  } else if (type === 'number') {
    const handleOnInput = (text: string) => {
      if (!decimals) {
        text = text.replace(/[^0-9]*/g, '');
      }
      _onChange(text);
    };

    return (
      <View style={[styles.inputBox, error && styles.invalid]}>
        {label && <Text style={styles.label}>{label}</Text>}
        <TextInput
          keyboardType="numeric"
          onChangeText={handleOnInput}
          value={value?.toString()}
          placeholder={placeholder}
          style={styles.inputNumber}
          editable={!disabled}
          {...rest}
        />
        {error && <Text style={styles.invalidMessage}>{error[0]}</Text>}
      </View>
    );
  } else if (type === 'stars') {
    return (
      <View style={[styles.inputBox, error && styles.invalid]}>
        {label && <Text style={styles.label}>{label}</Text>}
        <AirbnbRating
          count={5}
          defaultRating={value as number}
          size={30}
          showRating={false}
          onFinishRating={(rating: number) => _onChange(rating)}
        />
        {error && <Text style={styles.invalidMessage}>{error[0]}</Text>}
      </View>
    );
  } else {
    return (
      <View style={[styles.inputBox, ...(inlineElement ? [styles.inlineBtnBox] : []), ...(error ? [styles.invalid] : [])]}>
        {label && <Text style={styles.label}>{label}</Text>}
        <View style={styles.inputTextBlock}>
          <TextInput
            onChangeText={_onChange}
            value={value as string}
            placeholder={placeholder}
            style={styles.inputText}
            editable={!disabled}
            {...rest}
          />
          {inlineElement}
        </View>
        {error && <Text style={styles.invalidMessage}>{error[0]}</Text>}
      </View>
    );
  }
};

Input.defaultProps = {
  step: 1,
  decimals: true,
  rows: 4,
  inlineElement: null,
};

const styles = StyleSheet.create({
  inputBox: {
    marginBottom: 15,
  },
  invalid: {
    borderColor: 'red',
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  textarea: {
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    textAlignVertical: 'top',
  },
  inputNumber: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  inputTextBlock: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputText: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  inlineBtnBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  invalidMessage: {
    color: 'red',
    marginTop: 5,
  },
});

export default Input;