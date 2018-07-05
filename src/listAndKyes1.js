import React, { Component } from 'react'

class NumberList extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const listItems = this.props.numbers.map((item) => {
      return <li>{item}</li>
    })
    return listItems
  }
}
export default NumberList

// 列表渲染

