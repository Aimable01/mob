import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Colors, Spacing, BorderRadius, Typography } from '@/util/constants';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  style,
  textStyle,
}) => {
  const buttonStyle = [
    styles.base,
    styles[variant],
    styles[size],
    disabled && styles.disabled,
    style,
  ];

  const textStyles = [
    styles.text,
    styles[`${variant}Text`],
    styles[`${size}Text`],
    disabled && styles.disabledText,
    textStyle,
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Text style={textStyles}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  // Variants
  primary: {
    backgroundColor: Colors.neutral900,
  },
  secondary: {
    backgroundColor: Colors.neutral100,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.neutral300,
  },
  
  // Sizes
  sm: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    minHeight: 36,
  },
  md: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    minHeight: 44,
  },
  lg: {
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.lg,
    minHeight: 52,
  },
  
  // Disabled
  disabled: {
    opacity: 0.5,
  },
  
  // Text styles
  text: {
    fontWeight: Typography.weights.semibold,
  },
  primaryText: {
    color: Colors.white,
    fontSize: Typography.sizes.base,
  },
  secondaryText: {
    color: Colors.neutral900,
    fontSize: Typography.sizes.base,
  },
  outlineText: {
    color: Colors.neutral900,
    fontSize: Typography.sizes.base,
  },
  
  // Text sizes
  smText: {
    fontSize: Typography.sizes.sm,
  },
  mdText: {
    fontSize: Typography.sizes.base,
  },
  lgText: {
    fontSize: Typography.sizes.lg,
  },
  
  disabledText: {
    opacity: 0.7,
  },
});
