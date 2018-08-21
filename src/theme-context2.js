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

// 确保我们传递给createContext()方法的默认值的数据结构是consumer需要的数据结构保持一致
export const ThemeContext = React.createContext({
  theme: themes.dark,
  toggleTheme: () => {}
})