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

// 确保我们传递给createContext()方法的默认值的形式是consumer需要的
export const ThemeContext = React.createContext({
  theme: themes.dark,
  toggleTheme: () => {}
})