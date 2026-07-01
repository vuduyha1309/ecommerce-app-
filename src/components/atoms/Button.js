import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { COLORS, FONTS, FONT_SIZES } from '../../constants';

const Button = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  style,
  textStyle,
}) => {
  const buttonStyles = [
    styles.button,
    styles[`button_${variant}`],
    styles[`button_${size}`],
    disabled && styles.button_disabled,
    style,
  ];

  const textStyles = [
    styles.text,
    styles[`text_${variant}`],
    styles[`text_${size}`],
    disabled && styles.text_disabled,
    textStyle,
  ];

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? COLORS.white : COLORS.primary[600]} />
      ) : (
        <Text style={textStyles}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  
  // Variants
  button_primary: {
    backgroundColor: COLORS.primary[600],
  },
  button_secondary: {
    backgroundColor: COLORS.gray[100],
    borderWidth: 1,
    borderColor: COLORS.gray[300],
  },
  button_danger: {
    backgroundColor: COLORS.red[600],
  },
  button_outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.primary[600],
  },
  
  // Sizes
  button_small: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  button_medium: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  button_large: {
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  
  // Disabled
  button_disabled: {
    backgroundColor: COLORS.gray[300],
    borderColor: COLORS.gray[300],
  },
  
  // Text styles
  text: {
    // fontFamily removed to use system default
  },
  text_primary: {
    color: COLORS.white,
  },
  text_secondary: {
    color: COLORS.gray[700],
  },
  text_danger: {
    color: COLORS.white,
  },
  text_outline: {
    color: COLORS.primary[600],
  },
  text_disabled: {
    color: COLORS.gray[500],
  },
  
  // Text sizes
  text_small: {
    fontSize: FONT_SIZES.sm,
  },
  text_medium: {
    fontSize: FONT_SIZES.base,
  },
  text_large: {
    fontSize: FONT_SIZES.lg,
  },
});

export default Button;
