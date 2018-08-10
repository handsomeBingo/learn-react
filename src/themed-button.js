import React, {Component} from 'react'

import {ThemeContext} from './theme-context'

class ThemedButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ThemeContext.Consumer>
        {
          theme => (
            <button
              {...this.props}
              style={{backgroundColor: theme.background}}
            >I am a button</button>
          )
        }
      </ThemeContext.Consumer>
    )
  }
}

export default ThemedButton