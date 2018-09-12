import React, {Component} from 'react'

// react 中一个常见的模式是为一个组件返回多个元素。片段（fragments）可以让你将子元素列表调价到一个分组中，并且不会在DOM中添加额外的节点。

// 动机

// 一个常见模式是为一个组件返回一个子元素列表。以这个示例的React片段为例：

class Table extends Component {
  render () {
    return (
      <table>
        <tr>
          <Columns />
        </tr>
      </table>
    )
  }
}

// 大家都知道组件的render函数最后返回的dom节点必须被一个根DOM节点包裹。例如上面中的Columns的render函数应该返回若干个td，如果这些td被包裹在div中，这些HTML将是无效的。

class Columns extends Component {
  render () {
    return (
      <div>
        <td>hello</td>
        <td>world</td>
      </div>
    )
  }
}

// 基于上面的尴尬情况，我们产生了fragments

class Columns2 extends Component {
  render () {
    return (
      <React.Fragment>
        <td>Hello</td>
        <td>World</td>
      </React.Fragment>
    )
  }
}

// 如此一来，便不会出现上面div包裹一些td的尴尬局面

// 上面的语法 <React.Fragment></React.Fragment> 还可以简写成 <></> 但是许多工具不支持这个语法

// 带key的Fragment
// 如果你需要一个带key的片段，你可以直接使用 <React.Fragment /> 。一个使用场景是映射一个集合为一个片段数组：创建一个描述列表。
// key 是唯一可以传递给Fragment的属性。
function Glossary(props) {
  return (
    <dl>
      {
        props.items.map(item => (
          <React.Fragment key={item.id}>
            <dt>item.item</dt>
            <dd>item.description</dd>
          </React.Fragment>
        ))
      }
    </dl>
  )
}