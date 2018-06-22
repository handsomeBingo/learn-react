const element = <h1>Hello world!</h1>

// jsx中嵌套表达式

function getUserName(user) {
  return user.firstName + user.lastNam;
}

const user = {
  firstName: 'Lyric',
  lastName: 'Ma'
};

const element2 = <h1>hello, {getUserName(user)}</h1>;

// jsx 也是一个表达式
// 编译之后，jsx表达式就变成了常规的JavaScript对象。这意味着你可以在if语句或者for循环中使用jsx，用它给变量赋值。当做参数接收，或者作为函数返回值。

function getGreeting(user) {
  if (user) {
    return <h1>Hello, {getUserName(user)}</h1>
  }
  return <h1>Hello, Stranger</h1>
}

// 用jsx 指定属性值

// 1.使用双引号指定字符串字面量作为属性值：

const element3 = <div tabIndex="0"></div>;

// 2.使用花括号嵌入一个JavaScript表达式作为属性值：(在属性中嵌入JavaScript表达式时，不要使用引号来包裹大括号，否则表达式的字面量值将成为属性值。此外，引号和大括号不可同时用于同一属性)

const element4 = <img src={user.avatarUrl} />;

// 用jsx指定子元素

// 1. 如果是空标签，必须使用 />闭合

const element5 = <img src="" alt=""/>;

// 2. jsx标签可能包含子元素

const element6 = (
  <div>
    <h1>Hello!</h1>
    <h2>Good to see you here.</h2>
  </div>
);
// 值得注意的是，比起HTML，jsx更接近于JavaScript，所以ReactDOM使用驼峰（camelCase）属性名约定，而不是HTML属性名称。例如，在 class 在jsx中变为className，tabindex变为tabIndex。

// jsx防止注入共计

// !!!在jsx中，嵌入用户输入时安全的：

const title = 'something form user inputted';
const element7 = <h1>{title}</h1>;

//默认情况下，在渲染之前，ReactDOM会格式化（escapes）jsx中所有的值。从而保证用户无法注入任何应用之外的代码。在被渲染之前，所有的数据都被转义成为字符串处理。以避免xss（跨站脚本攻击）。

// jsx 表示对象，以下两个例子是相同的

const element8 = (
  <h1 className="greeting">
    hello, world!
  </h1>
);

const element9 = React.createElement(
  'h1',
  {className: 'greeting'},
  'hello, world'
)