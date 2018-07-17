import React, {Component} from 'react'

// 使用react经常会遇到几个组件需要共用数据状态的情况。这种情况下，我们最好将这部分共享的状态提升至他们最近的父组件当中进行管理。

class BoilingVerdict extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    if (this.props.celsius >= 100) {
      return <p>水会烧开</p>
    }
    return <p>水不会烧开</p>
  }
}

class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      temperature: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      temperature: e.target.value
    })
  }

  render() {
    const temperature = this.state.temperature;

    return <fieldset>
      <legend>输入一个摄氏温度</legend>
      <input type="text" value={this.state.temperature} onChange={this.handleChange} />
      <BoilingVerdict celsius={this.state.temperature} />
    </fieldset>
  }
}

export default Calculator