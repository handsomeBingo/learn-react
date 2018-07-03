import React, {Component} from 'react'

class WarningBanner extends Component {
  constructor(props) {
    super(props)
  }
  render () {
    if (!this.props.warn) {
      return null;
    } else {
      return (
        <div className="warning">
          Warning!!!
        </div>
      )
    }
  }
}

class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {showWarning: false};
    this.handleToggleClick = this.handleToggleClick.bind(this);
  }
  handleToggleClick() {
    this.setState((prevState) => ({
      showWarning: !prevState.showWarning
    }))
  }

  render() {
    return (
      <div>
        <WarningBanner warn={this.state.showWarning} />
        <button onClick={this.handleToggleClick}>
          {this.state.showWarning ? 'Hide' : 'Show'}
        </button>
      </div>
    )
  }
}

export default Page