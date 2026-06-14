// Primary Color
export const PRIMARY_COLOR = '#8b5cf6'; // Purple
export const PRIMARY_COLOR_LIGHT = '#a78bfa';
export const PRIMARY_COLOR_DARK = '#6d28d9';

// Neutral Colors
export const COLOR_WHITE = '#ffffff';
export const COLOR_BLACK = '#000000';

// Gray Scale
export const COLOR_GRAY_50 = '#f9fafb';
export const COLOR_GRAY_100 = '#f3f4f6';
export const COLOR_GRAY_200 = '#e5e7eb';
export const COLOR_GRAY_300 = '#d1d5db';
export const COLOR_GRAY_400 = '#9ca3af';
export const COLOR_GRAY_500 = '#6b7280';
export const COLOR_GRAY_600 = '#4b5563';
export const COLOR_GRAY_700 = '#374151';
export const COLOR_GRAY_800 = '#1f2937';
export const COLOR_GRAY_900 = '#111827';

// Status Colors
export const COLOR_SUCCESS = '#10b981'; // Green
export const COLOR_ERROR = '#ef4444'; // Red
export const COLOR_WARNING = '#f59e0b'; // Amber
export const COLOR_INFO = '#3b82f6'; // Blue

// Light Theme
export const LIGHT_THEME = {
  bgPrimary: COLOR_WHITE,
  bgSecondary: COLOR_GRAY_50,
  textPrimary: COLOR_GRAY_900,
  textSecondary: COLOR_GRAY_600,
  borderColor: COLOR_GRAY_200,
  success: COLOR_SUCCESS,
  error: COLOR_ERROR,
  warning: COLOR_WARNING,
  info: COLOR_INFO,
};

// Dark Theme
export const DARK_THEME = {
  bgPrimary: COLOR_GRAY_900,
  bgSecondary: COLOR_GRAY_800,
  textPrimary: COLOR_GRAY_100,
  textSecondary: COLOR_GRAY_400,
  borderColor: COLOR_GRAY_700,
  success: COLOR_SUCCESS,
  error: COLOR_ERROR,
  warning: COLOR_WARNING,
  info: COLOR_INFO,
};

// CSS Variables
export const CSS_VARIABLES = {
  '--primary-color': PRIMARY_COLOR,
  '--primary-color-light': PRIMARY_COLOR_LIGHT,
  '--primary-color-dark': PRIMARY_COLOR_DARK,
  '--color-success': COLOR_SUCCESS,
  '--color-error': COLOR_ERROR,
  '--color-warning': COLOR_WARNING,
  '--color-info': COLOR_INFO,
} as const;

// Tailwind Colors (for reference)
export const TAILWIND_COLORS = {
  purple: {
    50: '#faf5ff',
    100: '#f3e8ff',
    200: '#e9d5ff',
    300: '#d8b4fe',
    400: '#c084fc',
    500: '#a855f7',
    600: '#9333ea',
    700: '#7e22ce',
    800: '#6b21a8',
    900: '#581c87',
  },
  green: {
    50: '#f0fdf4',
    100: '#dcfce7',
    500: '#10b981',
    600: '#059669',
  },
  red: {
    50: '#fef2f2',
    100: '#fee2e2',
    500: '#ef4444',
    600: '#dc2626',
  },
  amber: {
    50: '#fffbeb',
    100: '#fef3c7',
    500: '#f59e0b',
    600: '#d97706',
  },
  blue: {
    50: '#eff6ff',
    100: '#dbeafe',
    500: '#3b82f6',
    600: '#2563eb',
  },
} as const;

export const getThemeColors = (theme: 'light' | 'dark') => {
  return theme === 'light' ? LIGHT_THEME : DARK_THEME;
};

export default {
  PRIMARY_COLOR,
  PRIMARY_COLOR_LIGHT,
  PRIMARY_COLOR_DARK,
  COLOR_WHITE,
  COLOR_BLACK,
  COLOR_GRAY_50,
  COLOR_GRAY_100,
  COLOR_GRAY_200,
  COLOR_GRAY_300,
  COLOR_GRAY_400,
  COLOR_GRAY_500,
  COLOR_GRAY_600,
  COLOR_GRAY_700,
  COLOR_GRAY_800,
  COLOR_GRAY_900,
  COLOR_SUCCESS,
  COLOR_ERROR,
  COLOR_WARNING,
  COLOR_INFO,
  LIGHT_THEME,
  DARK_THEME,
  TAILWIND_COLORS,
  getThemeColors,
};
