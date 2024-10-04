/**
 *
 * Button
 *
 */

import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet, StyleProp, ViewStyle, TextStyle, AccessibilityRole, GestureResponderEvent } from 'react-native';

interface ButtonProps {
  id?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'danger' | 'link' | 'dark' | 'none' | 'empty';
  tabIndex?: number;
  ariaLabel?: string;
  ariaExpanded?: boolean;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
  text?: string;
  role?: AccessibilityRole;
  icon?: React.ReactNode;
  iconDirection?: 'left' | 'right';
  iconClassName?: string;
  borderless?: boolean;
  onClick?: (e: GestureResponderEvent) => void;
  style?: any;
}

const styles = StyleSheet.create({
  inputBtn: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  primary: {
    backgroundColor: '#007BFF',
  },
  secondary: {
    backgroundColor: '#6C757D',
  },
  danger: {
    backgroundColor: '#DC3545',
  },
  link: {
    backgroundColor: 'transparent',
  },
  dark: {
    backgroundColor: '#343A40',
  },
  none: {
    backgroundColor: 'transparent',
  },
  sm: {
    padding: 5,
  },
  md: {
    padding: 10,
  },
  lg: {
    padding: 15,
  },
  withIcon: {
    flexDirection: 'row',
  },
  iconOnly: {
    padding: 10,
  },
  textOnly: {
    padding: 10,
  },
  iconLeft: {
    flexDirection: 'row',
  },
  iconRight: {
    flexDirection: 'row-reverse',
  },
  borderless: {
    borderWidth: 0,
  },
  btnIcon: {
    marginRight: 5,
  },
  btnText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  disabled: {
    backgroundColor: '#AAA',
  },
});

const variants = {
  primary: styles.primary,
  secondary: styles.secondary,
  danger: styles.danger,
  link: styles.link,
  dark: styles.dark,
  none: styles.none,
  empty: {},
};

const Button: React.FC<ButtonProps> = ({
  id,
  size = 'md',
  variant = 'secondary',
  tabIndex,
  ariaLabel,
  ariaExpanded,
  type = 'button',
  disabled,
  className,
  text,
  role,
  icon,
  iconDirection = 'left',
  iconClassName,
  borderless = false,
  onClick,
  style,
}) => {
  const v = variant ? variants[variant] : {};

  const btnVariant = v;

  const btn = icon && text ? 'withIcon' : icon && !text ? 'iconOnly' : 'textOnly';

  const classNames = [
    styles.inputBtn,
    btnVariant,
    styles[size],
    styles[btn],
    iconDirection === 'left' ? styles.iconLeft : styles.iconRight,
    borderless ? styles.borderless : {},
  ];

  const iconClassNames = [styles.btnIcon, iconClassName];

  return (
    <TouchableOpacity
      style={[...classNames, disabled && styles.disabled, style]}
      onPress={onClick}
      disabled={disabled}
      accessibilityLabel={ariaLabel}
      accessibilityRole={role}
      accessibilityState={{ expanded: ariaExpanded }}
    >
      {iconDirection === 'left' ? (
        <>
          {icon && <View style={iconClassNames as StyleProp<ViewStyle>}>{icon}</View>}
          {text && <Text style={styles.btnText}>{text}</Text>}
        </>
      ) : (
        <>
          {text && <Text style={styles.btnText}>{text}</Text>}
          {icon && <View style={iconClassNames as StyleProp<ViewStyle>}>{icon}</View>}
        </>
      )}
    </TouchableOpacity>
  );
};

export default Button;