import { lighten, darken } from 'polished';
import { DefaultTheme } from 'styled-components';
import { mergeDeep, isPlainObject } from './utils';

/**
 * Utility function used to merge the DefaultTheme and matching properties from the themeConfig param.
 */
export const mergeThemeStyles = (themeConfig?: Partial<DefaultTheme>): DefaultTheme => {
  return !isPlainObject(themeConfig)
    ? { ...defaultTheme }
    : mergeDeep(defaultTheme, themeConfig);
};

/**
 * A contextual DefaultTheme object with default key-values.
 */
export const defaultTheme: DefaultTheme = {
  color: {
    accent: '#007bff',
    border: '#ced4da',
    invalid: '#dc3545',
    disabled: '#e9ecef',
    placeholder: '#6E7276',
  },
  select: {
  },
  loader: {
    opacity: '0.42',
    size: '0.625rem',
    color: '#007bff',
    padding: '0.375rem 0.75rem',
  },
  icon: {
    color: '#cccccc',
    padding: '0.5rem 0.9375rem',
    hoverColor: darken(0.15, '#cccccc'),
    clear: {
      fontWeight: 900,
      fontSize: '0.85em',
      transition: 'color 0.15s ease-in-out',
      fontFamily: '"Helvetica", "Arial", sans-serif',
    },
    caret: {
      size: '7px',
      transition: 'transform 0.225s ease-in-out, color 0.15s ease-in-out',
    },
  },
  control: {
    borderWidth: '1px',
    borderStyle: 'solid',
    borderRadius: '0.25rem',
    boxShadow: '0 0 0 0.2rem',
    padding: '0.375rem 0.75rem',
    height: 'calc(1.5em + 0.75rem + 2px)',
    transition: 'box-shadow 0.15s ease-in-out, border-color 0.15s ease-in-out',
  },
  menu: {
    width: '100%',
    margin: '0.5rem 0',
    padding: '0.15rem 0',
    borderRadius: '0.25rem',
    backgroundColor: '#fff',
    boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.1), 0 4px 11px rgba(0, 0, 0, 0.1)',
    option: {
      textAlign: 'left',
      selectedColor: '#fff',
      selectedBgColor: '#007bff',
      padding: '0.375rem 0.75rem',
      focusedBgColor: lighten(0.4, '#007bff'),
    },
  },
  noOptions: {
    fontSize: '1.25rem',
    margin: '0.25rem 0',
    color: 'hsl(0, 0%, 60%)',
    padding: '0.375rem 0.75rem',
  },
};