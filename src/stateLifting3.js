import React, {Component} from 'react'

// 现在我们有了新需求，在提供摄氏温度输入的基础之上，在提供一个华氏温度输入，并且它们能保持同步
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

const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
};

class TemperatureInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      temperature: ''
    };

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    this.setState({
      temperature: e.target.value
    })
  }

  render() {
    const temperature = this.state.temperature;
    const scale = this.props.scale;

    return (
      <fieldset>
        <legend>Enter temperatur In {scaleNames[scale]}:</legend>
        <input type="text" value={temperature} onChange={this.handleChange} />
      </fieldset>
    )
  }
}

class Calculator extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <TemperatureInput scale="c" />
        <TemperatureInput scale="f" />
      </div>
    )
  }
}

export default Calculator

// 现在有两个输入框，但是当你在其中一个输入时，另一个并不会更新，这显然不符合我们的需要。另外，我们此时也不能从Calculator组件中展示BoilingVerdict的渲染结果。因为现在表示温度的数据状态只存在于TemperatureInput组件中。

