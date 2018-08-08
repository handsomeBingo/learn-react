import React, {Component} from 'react'
import {ThemeContext, themes} from './theme-context'
import ThemedButton from './themed-button'

class Toolbar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ThemedButton onClick={this.props.changeTheme}>
        ChangeTheme
      </ThemedButton>
    )
  }
}

class ContextApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: themes.light
    };
    this.toggleTheme = this.toggleTheme.bind(this)
  }

  toggleTheme() {
    this.setState(state => ({
        theme: state.theme === themes.dark
          ? themes.light
          : themes.dark
      }
      )
    )
  }

  render() {
    // 在ThemeProvider 里面的ThemedButton使用的是来自state的theme，但是在外面的使用的是默认的主题
    return (
      <div>
        <ThemeContext.Provider value={this.state.theme}>
          <Toolbar changeTheme={this.toggleTheme}/>
        </ThemeContext.Provider>
        <div>
          <ThemedButton onChange={this.toggleTheme} />
        </div>
      </div>
    )
  }
}
export default ContextApp