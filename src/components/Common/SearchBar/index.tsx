import React from 'react';
import { View, TextInput, StyleSheet, TextInputProps, NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import Button from '../Button';

interface SearchBarProps {
  id?: string;
  name?: string;
  placeholder?: string;
  className?: string;
  inlineBtn?: boolean;
  btnText?: string;
  autoComplete?: string;
  onSearch?: (e: { name: string; value: string }) => void;
  onSearchSubmit?: (search: string) => void
  onBlur?: (e: { name: string; value: string }) => void;
  onKeyPress?: TextInputProps['onKeyPress'];
}

interface SearchBarState {
  value: string;
  typing: boolean;
  typingTimeout: any;
}

class SearchBar extends React.Component<SearchBarProps, SearchBarState> {
  static defaultProps = {
    className: '',
    id: 'search',
    name: 'search',
    placeholder: 'Search',
    inlineBtn: true,
    btnText: 'Search',
    autoComplete: 'off',
  };

  constructor(props: SearchBarProps) {
    super(props);

    this.state = {
      value: '',
      typing: false,
      typingTimeout: null,
    };
  }

  _onChange(e: NativeSyntheticEvent<TextInputChangeEventData>) {
    const name = this.props.name || '';
    const value = e.nativeEvent.text;

    if (this.state.typingTimeout) {
      clearTimeout(this.state.typingTimeout);
    }

    this.setState({
      value,
      typing: false,
      typingTimeout: setTimeout(() => {
        if (this.props.onSearch) {
          this.props.onSearch({ name, value });
        }
      }, 1000),
    });
  }

  _handleSubmit(e: NativeSyntheticEvent<any>) {
    e.preventDefault();

    const name = this.props.name || '';
    const value = this.state.value;

    if (this.props.onSearchSubmit) {
      this.props.onSearchSubmit(this.state.value);
    }
  }

  _onBlur(e: NativeSyntheticEvent<TextInputChangeEventData>) {
    const name = this.props.name || '';
    const value = e.nativeEvent.text;

    if (this.props.onBlur) {
      this.props.onBlur({ name, value });
    }
  }

  render() {
    const { id, name, placeholder, btnText, autoComplete, onKeyPress } = this.props;
    const { value } = this.state;

    return (
      <View style={styles.searchBox}>
        <View style={styles.inputTextBlock}>
          <TextInput
            style={styles.inputText}
            placeholder={placeholder}
            value={value}
            onChange={(e) => this._onChange(e)}
            onBlur={(e) => this._onBlur(e)}
            onKeyPress={onKeyPress}
          />
          <Button type="submit" variant="primary" text={btnText} onClick={(e) => this._handleSubmit(e)} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  inputTextBlock: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputText: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    marginRight: 8,
  },
});

export default SearchBar;