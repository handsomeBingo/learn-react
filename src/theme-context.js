import React, {Component} from 'react'

export const themes = {
  light: {
    foreground: '#000',
    background: 'red'
  },
  dark: {
    foreground: '#fff',
    background: 'green'
  }
};

export const ThemeContext = React.createContext(
  themes.dark // default value
);