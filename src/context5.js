import React, {Component} from 'react'
// 使用多个context

// 为保持context的快速重新渲染，React需要使每个context Consumer成为树中的一个独立的节点，这句话是什么意思呢？就是说，这些Consumer可以向html的dom节点一样嵌套，而且是每个Consumer都应该是一个独立的节点，这个有点像作用作用域。似乎这个东西应该就是作用域

// Theme Context，默认light theme
const ThemeContext = React.createContext('light');

// 已登录用户的 Context
const UserContext = React.createContext({
  name: 'Guest'
});

const SideBar = <div></div>
class App3 extends Component {
  constructor(props) {
    super(props);
  }
  render () {
    const {SignedInUser, theme} = this.props;
    // App3 组件提供初始的context value

    return (
      <ThemeContext.Provider value={theme}>
        <UserContext.Provider value={SignedInUser}>
          <Layout />
        </UserContext.Provider>
      </ThemeContext.Provider>
    )

  }
}


function Layout() {
  return <div>
    <SideBar />
    <Content />
  </div>
}

// 一个可能需要多个context的组件
function Content() {
  return (
    <ThemeContext.Consumer>
      {
        theme => (
          <UserContext.Consumer>
            {
              user => (
                <ProfilePage user={user} theme={theme} />
              )
            }
          </UserContext.Consumer>
        )
      }
    </ThemeContext.Consumer>
  )
}

// 如果经常同时使用两个或者多个context值，我们可能需要创建自己的渲染属性组件，同时提供两者。