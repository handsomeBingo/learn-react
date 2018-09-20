import React, {Component} from 'react'

// 高阶组件 （High-Order-Components）

// 高阶组件 （HOC）是react中用于重用组价逻辑的高级技术。HOC本身不是React api 的一部分。他们是从React构思本质中复现出来的一种模式。
// 具体来说，高阶组件是一个函数，能够接受一个组件并返回一个新的组件。

//const EnhancedComonent = higherOrderComponent(WrappedComponent)

// 组件是将props转化成UI，然而高阶组件将一个组件转化成另外一个组件。


// 在横切关注点中使用高阶组件

// 组件时React中代码重用的最小单元。然而你会发现某些模式并不能直接适应传统组件。

let DataSource = {
  getComments() {},
  addChangeListener() {},
  removerChangeListener() {},
  getBlogList() {}
};

class CommentList extends CommentList {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      comments: DataSource.getComments()
    }
  }

  componentDidMount() {
    DataSource.addChangeListener(this.handleChange);
  }

  componentWillUnmount() {
    DataSource.removerChangeListener(this.handleChange);
  }

  handleChange() {
    this.setState({
      comments: DataSource.getComments()
    })
  }

  render () {
    return (
      <div>
        {
          this.state.comments.map((comment) => (
            <Comment comment={comment} key={comment.id} />
          ))
        }
      </div>
    )
  }
}

// 随后，你编写一个订阅单个博文的组件，其遵循类似的模式：

class BlogPost extends Component {
  constructor(props) {
    super(props);
    this.handleChage = this.handleChage.bind(this)

    this.state = {
      blogPost: DataSource.getBlogList()
    }
  }

  componentDidMount() {
    DataSource.addChangeListener(this.handleChage)
  }

  componentWillUnmount() {
    DataSource.removerChangeListener(this.handleChage)
  }

  handleChange() {
    this.setState({
      blogPost: DataSource.getBlogList()
    })
  }

  render () {
    return (
      <TestBlock text={this.state.blogPost} />
    )
  }
}

// CommentList 和 BlogList 是等价的，除了它们调用的DataSource的不同方法，有不同输出，但是他们大部分的实现是类似的：

// + 组件mount（挂载）结束后，都添加DataSource的change监听
// + 除了监听函数，无论什么时候DataSource改变之后都会调用setState
// + 组件unmount（卸载）之后，都会移除监听。

// 在一个大型项目中，订阅DataSource 并调用setState()的函数将会一次次出现。我们需要将其抽象出来，似的我们能够在一个地方定义逻辑并且在我们的组件中共享。这就是高阶组件的优点。

// 我们可以写一个函数，能够创建类似于CommentList和BlogPost这类型订阅DataSource的新的组件。这个函数接受一个子组件作为参数，这个子组件几首订阅数据源作为props，调用 withSubscription如下：

const CommentListWithSubscription = withSubscription(
  CommentList,
  (DataSource) => DataSource.getComments()
)

const BlogPostWithSubscription = withSubscription(
  BlogPost,
  (DataSource, props) => DataSource.getBlogList(props.id)
)

// 第一个参数是包含的组件，第二个参数根据给定的DataSource 和当前的props取回我们需要的数据。

// 当CommentListsWithSubscription 和 BlogPost 被渲染时，CommentList和BlogPost将会被传递data属性，其中包含从DataSource取回的最新数据。

// 函数接受一个组件参数.....

function withSubscription(WrappedComponent, selectData) {
  return class extends Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.setState({
        data: selectData(DataSource, props)
      })
    }

    componentDidMount() {
      DataSource.addChangeListener(this.handleChange)
    }

    componentWillUnmount() {
      DataSource.removerChangeListener(this.handleChange)
    }

    handleChange() {
      this.setState({
        data: selectData(DataSource, this.props)
      })
    }

    render () {
      // .... 使用最新的数据渲染组件
      // 注意此处将已有的props属性传递给原组件
      return <WrappedComponent data={this.state.data} {...this.props} />;
    }
  }
}

// 高阶组件既不会修改输入组件，也不会通过继承来复制行为。相反，通过包裹的形式，高阶组件将原先的组件组合在container组件中。高阶组件是纯函数，没有副作用。

// 就是这样。被包裹的元素，接受container的所有props，以及用于渲染其输出的新prop，data，高阶组件（HOC）并不关心数据将会如何或者为什么使用，并且被包裹的元素不关心数据的源头。

// 因为withSubscription 只是一个普通函数，你可以按照你的意愿添加很多或者很少的参数。例如，你可能希望data的名字是可以配置的，为了进一步隔离高阶组件和被包裹组件。或者你可以接受一个参数，他可以配置shouldComponentUpdate，或者是可以配置数据的来源。这都是可行的，因为高阶组件可以完全自己控制组件该如何定义。

// 和组件类似，withSubscription和被包裹的组件的联系是基于props的。只要为被 包裹元素提供相同的属性，那么很容易讲一个高阶组件转化成不同的高阶组件。例如，如果你想要改变数据获取的库，这将非常有用。

// 不要改变原组件，而是使用组合

// 要忍住在高阶组件修改组件原型（或者修改其他）的冲动。

function logProps(InputComponent) {
  InputComponent.prototype.compo
}


