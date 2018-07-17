import React, {Component} from 'react'

class NameForm extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({value: e.target.value})
  }

  handleSubmit(e) {
    alert('a name was submitted：' + this.state.value)
    e.preventDefault()
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="name">
            Name: <input id="name" type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <p>{this.state.value}</p>
      </div>
  )
  }
}

export default NameForm

// 由于value属性是我们的表单元素上设置的，因此显示的值将始终为React数据源上的this.state.value的值，由于每次按键都会触发handleChange来更新当前的React的state，所展示的值也会随着不同用户输入而更新。
// 使用受控组件，每个状态的改变都有一个与之相关的处理函数，这样就可以直接修改或验证用户输入。例如，我们想要限制输入全部是大写字母，我们可以将handleChange写为如下：

/*
handleChange() {
  this.setState({
    value: event.target.value.toUpperCase()
 })
}*/

