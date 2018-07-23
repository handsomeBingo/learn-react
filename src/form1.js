import React, {Component} from 'react'

// this is a test text 在react中，textarea会用value属性来替代在原生html中textarea标签的子节点表示输入内容的方式。如此一来textarea非常类似于input
class EssayForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: 'please write an essay about your favorite Dom element'
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  
  handleChange(e) {
    this.setState({
      value: e.target.value
    })
  }
  
  handleSubmit(e) {
    alert(`An essay was submitted:${this.state.value}`)
    e.preventDefault()
  }
  
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="essay">
          <textarea id="essay"
                    cols="30"
                    rows="10"
                    value={this.state.value}
                    onChange={this.handleChange}></textarea>
        </label>
        <input type="submit" value="SubmitEssay" />
      </form>
    )
  }
}

export default EssayForm
