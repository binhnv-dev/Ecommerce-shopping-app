import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';

interface DropdownConfirmProps {
  className?: string;
  label?: string;
  children: React.ReactNode;
}

const DropdownConfirm: React.FC<DropdownConfirmProps> = ({ className, label, children }) => {
  return (
    <View style={[styles.dropdownConfirm]}>
      <Menu>
        <MenuTrigger>
          <View style={styles.dropdownAction}>
            <Text>{label}</Text>
            <Text style={styles.dropdownCaret}>▼</Text>
          </View>
        </MenuTrigger>
        <MenuOptions>
          {children}
        </MenuOptions>
      </Menu>
    </View>
  );
};

DropdownConfirm.defaultProps = {
  label: '',
};

const styles = StyleSheet.create({
  dropdownConfirm: {
    margin: 8,
  },
  dropdownAction: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropdownCaret: {
    marginLeft: 4,
  },
});

export default DropdownConfirm;