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

/*
* 现在，无论编辑哪一个输入框，Calculator组件中，this.state.temperature和this.state.scale都会被更新。其中之一的输入框得到用户原样输入的值，另一个输入框总是显示出计算的出的结果
*
* React在DOM原生组件input上调用指定的onChange函数。在本例中，指的是TemperatureInput组件上的handleChange函数。
*
* TemperatureInput 组件的handleChange函数会在值发生变化时调用this.props.onTemperatureChange()函数，这些props属性，像onTemperatureChange都是由父组件Calculator提供的。
*
* 当最开始渲染时，Calculator组件把内部的handleCelsiusChange方法传给摄氏输入组件TemperatureInput的输入onTemperatureChange方法，并且把handleFahrenheitChange方法指定给华氏输入组件TemperatureInput的onTemperatureChange方法。两个Calculator内部的方法都会在相应输入框被编辑时被调用。
*
* 这些方法内部，Calculator组件会让React使用编辑输入的新值和当前输入框的温标来调用this.setState()方法来重新渲染自身。
*
* React会调用Calculator组件的render方法来识别（重新计算）UI界面的样子。基于当前温度和温标，两个输入框的值会被重新就算。温度转换就是在这里被执行的。
*
* 接着React会使用Calculator指定的新的props来分别调用TemperatureInput组件，React也会识别出子组件的UI界面。
*
* React DOM 会更新Dom来匹配对应的值。我们编辑的输入框获取新值，而另一个输入框则更新经过转换的温度值。
*
* */

// 经验教训

/*
* 在React中，对应任何可变数据理应只有一个单一“数据源”。通常，状态都是首先添加在需要渲染的数据的组件中。此时，如果另一个组件也需要这些数据，你可以将数据提升至离它们最近的父组件中。你应该在应用中保持自上而下的数据流，而不是尝试在不同组件中同步状态。
*
*
* 状态提升比双向数据绑定要写更多的模板代码，但带来的好处是，你也可以更快的寻找和定位bug工作。因为哪个组件保有状态数据，也只有它自己能够操作这些数据，发生bug的范围就被大大地减小了。此外，你也可以使用自定义逻辑来拒绝或者更改用户的输入。
*
* 如果某些数据可以由props或者state提供，那么它很有可能不应该在state中出现。举个例子，我们仅仅保存最新的编辑过的temperature和scale值，而不是celsiusValue和fahrenheitValue。另一个输入框的值总是可以在render()函数中由这些保存的数据计算出来。这样我们可以根据同一个用户输入精准计算两个需要使用的数据。
*
*
*
*
*
*
* */
