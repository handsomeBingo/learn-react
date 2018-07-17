import React, { Component } from 'react'

//class NumberList extends Component {
//  constructor(props) {
//    super(props)
//  }
//
//  render() {
//    const listItems = this.props.numbers.map((item) => {
//      return <li key={item.toString()}>{item}</li>
//    })
//    return listItems
//  }
//}
//export default NumberList

// 列表渲染

// 多组件渲染
// 可以创建元素集合，并用一对 {} 在jsx中直接将其引用即可
/*
* 上面我们是用javascript的map() 方法将 numbers数组循环处理，将numbers的每一项我们返回一个li元素。最终我们将结果元素数组赋值给listItems，并return。将来我们引用NumberList组件时，listItems组件将会被一起渲染。
* 当创建列表时，key是一个你需要包含的特殊字符串。
*
*
*
* */

// Keys 键 帮助React标识哪个项被修改，添加或者移除了。数组中的每一个元素应该有一个唯一不变的Keys来标识
// 挑选key最好的方式是使用一个在它的同辈元素中不重复的标识字符串。这和angular、vue的key是一样的

// 使用keys提取组件

// keys只在数组的上下文存在意义。 这句话应该是有循环操作时，如数组的map函数
// 例如，如果你提取一个listItem组件，应该把key放在数组处理的<ListItem />元素中，不能放在ListItem组件自身的<li />根元素上

class ListItem extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      // 这里的li元素并不需要key，而是应该将其放在引用listItem组件的位置
      <li>{this.props.value}</li>
    )
  }
}

export default ListItem

