import React, { Component } from 'react'
import ListItem from './listAndKyes1'
class NumberList extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const listItems = this.props.numbers.map(
      (item) => <ListItem key={item.toString()} value={item}></ListItem>
    )
    return listItems
  }
}
export default NumberList

//当你在map()方法内部调用元素时，要给map()方法的返回值中的每一个元素加上一个独一无二的key

// 元素的key在他的兄弟元素之间应该是唯一

// * 数组元素中使用的key在其兄弟之间应该是独一无二的。但是不需要全局唯一


