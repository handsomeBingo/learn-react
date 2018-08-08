import React, {Component} from 'react'
// API
// React.createContext

const {Provider, Consumer} = React.createContext('default');

/*
* 创建一个 {Provider, Consumer} 对。当React渲染context Consumer时，它将从组件树中匹配最近的Provider读取context值。
*
* defaultValue参数仅当Consumer（使用者）在树中没有匹配的Provider（提供者）时使用它。这有助于在不封装他们的情况下对组件进行测试。
* 注意：将undefined作为Provider（提供者）值传递时不会导致Consumer使用defaultValue
*
* */

// Provider
// <Prover value={some value}>
/*
* React 组件允许Consumer订阅context的改变
*
* 接受一个value属性传递给Provider的后代的Consumer。一个Provider可以连接到许多的Consumers。Providers可以嵌套以覆盖树中更深层次的值。
*
* */

// Consumer

// <Consumer>
//  {value => /*render something based on the context value*/}
// </Consumer>

/*
* 一个可以订阅context变化的React组件
*
* 需要接收一个函数作为子节点。该函数接收当前的context值并返回一个React节点。传给函数的value参数将等于组件树中上层这个context最近的Provider的value属性。如果上层没有context的Provider，value参数将等于传递给createContext()的defaultValue
*
* 注意：关于函数作为子节点的信息，和render props有关
*
* 只要Provider的value属性发生变化时，所有属于该Provider后代的Consumers就会重新渲染。从Provider到它的后代Consumers的传播不收shouldComponentUpdate方法的管束，所以当即使祖先组件退出更新时，后代的Consumer也会被更新
*
*
* 通过使用Object.is()相同的算法比较新值和旧值来确定value属性变化
*
* 当传递对象作为value时，在确定value属性是否发生变化时会引发一些问题：
*
* */

