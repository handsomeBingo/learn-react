import React, {Component} from 'react'

// 多个输入的解决方法
// 当你有多个受控的input元素时，你可以通过给每个元素添加一个name属性，来让处理函数根据 event.target.name 的值选择做什么。

class Reservation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isGoing: true,
      numberOfGuest: 2
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(e) {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name

    this.setState({
      [name]: value
    })
  }

  handleSubmit(e) {
    console.log(this.state.isGoing);
    console.log(this.state.numberOfGuest);
    e.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="isgoing">
          Is Going:
          <input name="isGoing"
                 type="checkbox"
                 checked={this.state.isGoing}
                 id="isgoing"
                 onChange={this.handleInputChange}/>
        </label>
        <br/>
        <label htmlFor="number">
          Number of Guests:
          <input type="number"
                 name="numberOfGuest"
                 onChange={this.handleInputChange}
                 value={this.state.numberOfGuest} />
        </label>
        <br/>
        <input type="submit" value="See what you have written"/>
      </form>
    )
  }
}

export default Reservation