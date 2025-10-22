export const Colors = {
  neutral900: '#171717',
  neutral800: '#262626',
  neutral700: '#404040',
  neutral600: '#525252',
  neutral500: '#737373',
  neutral400: '#a3a3a3',
  neutral300: '#d4d4d4',
  neutral200: '#e5e5e5',
  neutral100: '#f5f5f5',
  neutral50: '#fafafa',
  white: '#ffffff',
  
  // Accent colors
  primary: '#171717',
  primaryLight: '#404040',
  success: '#22c55e',
  warning: '#f59e0b',
  error: '#ef4444',
  
  // Background colors
  background: '#ffffff',
  surface: '#fafafa',
  card: '#ffffff',
  
  // Text colors
  textPrimary: '#171717',
  textSecondary: '#525252',
  textMuted: '#737373',
  textLight: '#a3a3a3',
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const BorderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
};

export const Typography = {
  sizes: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
  },
  weights: {
    normal: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
    extrabold: '800' as const,
  },
};

export const Shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
};
