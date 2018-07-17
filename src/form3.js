import React, {Component} from 'react'

// select标签，在React中，并不使用之前的selected属性，而在select标签上使用value属性来表示选中选项。这在受控组件中更为方便，因此你只需要在一个地方来更新组件。

class Options extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let ops = this.props.options;
    let items = ops.map(item => <option value={item.key} key={item.key}>{item.value}</option>)
    return items
  }
}

class FlavorForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'coconut',
      flavors: [
        {
          key: 'grape',
          value: 'grape'
        },
        {
          key: 'lime',
          value: 'lime'
        },
        {
          key: 'coconut',
          value: 'coconut'
        },
        {
          key: 'mango',
          value: 'mango'
        }
      ]
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      value: e.target.value
    })
  }

  handleSubmit(e) {
    alert(`your favorite flavor is:${this.state.value}`);
    e.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Pick Your favorite La Croix flavor:
          <select value={this.state.value} onChange={this.handleChange}>
            <Options options={this.state.flavors} />
          </select>
        </label>
        <input type="submit" value="Submit Your Favorite Flavor"/>
      </form>
    )
  }
}

export default FlavorForm