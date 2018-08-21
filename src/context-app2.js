 import React, {Component} from 'react'

import {ThemeContext, themes} from './theme-context2'
import ThemeToggleButton from './theme-toggle-button'

class Content extends Component {
  render() {
    return (
      <div>
        <ThemeToggleButton />
      </div>
    )
  }
}

class ContextApp2 extends Component {
  constructor(props) {
    super(props)

    // 声明state时，state要包括向下传递给context的provider的更新方法
    this.toggleTheme = () => {
      this.setState(state => ({
        theme: state.theme === themes.dark
            ? themes.light
            : themes.dark
        })
      )
    }
    this.state = {
      theme: themes.light,
      toggleTheme: this.toggleTheme
    }
  }


  render() {
    return (
      <ThemeContext.Provider value={this.state}>
        <Content />
      </ThemeContext.Provider>
    )
  }
}

export default ContextApp2