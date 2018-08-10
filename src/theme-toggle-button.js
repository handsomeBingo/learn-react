import React, {Component} from 'react'
import { ThemeContext } from './theme-context2'
class ThemeToggleButton extends Component {
  render () {
    return (
      <ThemeContext.Consumer>
        {({theme, toggleTheme}) => (
            <button onClick={toggleTheme}
                    style={{backgroundColor: theme.background}}
            >Toggle Theme</button>
          )}
      </ThemeContext.Consumer>
    )
  }
}


export default ThemeToggleButton