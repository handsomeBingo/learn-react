import React, {Component} from 'react'

// API

// React.createContext()

const {Provider, Consumer} = React.createContext('defaultValue');

// 创建一个{Provider， Consumer} 对。当React渲染context Consumer时，它将从组件树中匹配最接近的Provider中读取当前的context。
// defaultValue参数仅当Consumer（使用者）在树中没有匹配的Provider（提供者）时才生效。这有助于在不封装他们的情况下对组件进行测试。注意：将undefined作为Provider值传递不会导致Consumer使用defaultValue

// Provider

<Provider value={/*some value*/} />

