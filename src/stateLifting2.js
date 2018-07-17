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

// 写出转换函数

function toC(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9
}
function toF(celsius) {
  return (celsius * 9 / 5) + 32
}
// 这两个函数只是单纯转换数字，我们还需要另外一个函数，它接受两个参数，第一个接受temperature变量，第二个参数则是上面编写的单位转换函数。最后会返回一个字符串，我们会使用它来根据一个输入框的输入计算另一个输入框的值
function tryConvert(tem, convert) {
  const input = parseInt(tem);
  if (Number.isNaN(input)) {
    return ''
  }
  const output = convert(input);
  const rounded = Math.round(output * 10000) / 10000;
  return rounded.toString()
}


// 状态提升
// 在react中，状态分享是通过将state数据提升至离需要这些数据的组件最近的父组件来完成的。这就是所谓的状态提升。我们会将TemperatureInput组件自身保存的state移到Calculator中。

// 1. 首先，将TemperatureInput组件中将this.state.temperature替换为this.props.temperature。

// 2. 我们首先知道props是只读的这个事实，而之前temperature变量是被保存在其自身的state中的。TemperatureInput组件只需调用this.setState() 就能改变它。但现在，temperature是作为prop从父组件传递下来的。temperatureInput没有控制权。     在react中，这个问题通常是通过是通过让组件“受控”来解决。就像input能接受value和onChange这两个prop属性值，自定义组件TemperatureInput也能接受来自Calculator父组件的temperature变量和onTemperatureChange方法作为props属性值。

// 3. 做完这些TemperatureInput组件更细它的温度数值时，就会被调用this.props.onTemperatureChange方法。需要指出，我们定义的temperatureChange和temperature两个props属性均由父组件提供。父组件可以通过自身的方法来响应状态数据的改变，从而使用新的值来重新渲染两个输入框组件。

class TemperatureInput extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    this.props.onTemperatureChange(e.target.value)
  }

  render() {
    const temperature = this.props.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Enter temperature In {scaleNames[scale]}:</legend>
        <input type="text" value={temperature} onChange={this.handleChange} />
      </fieldset>
    )
  }
}

class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      temperature: '',
      scale: 'c'
    }
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
  }

  handleCelsiusChange(temperature) {
    this.setState({
      scale: 'c',
      temperature
    })
  }

  handleFahrenheitChange(temperature) {
    this.setState({
      scale: 'f',
      temperature
    })
  }
  render() {
    const scale = this.state.scale;
    const temperature = this.state.temperature;
    const celsius = scale === 'f' ? tryConvert(temperature, toC) : temperature;
    const fahrenheit = scale === 'c' ? tryConvert(temperature, toF) : temperature;

    return (
      <div>
        <TemperatureInput scale="c"
                          onTemperatureChange={this.handleCelsiusChange}
                          temperature={celsius} />
        <TemperatureInput scale="f"
                          onTemperatureChange={this.handleFahrenheitChange}
                          temperature={fahrenheit} />
      </div>
    )
  }
}

export default Calculator

// 现在有两个输入框，但是当你在其中一个输入时，另一个并不会更新，这显然不符合我们的需要。另外，我们此时也不能从Calculator组件中展示BoilingVerdict的渲染结果。因为现在表示温度的数据状态只存在于TemperatureInput组件中。

