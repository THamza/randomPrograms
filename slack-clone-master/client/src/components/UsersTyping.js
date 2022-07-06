import React, {Component} from 'react'

export default class UsersTyping extends Component {
  render() {
    if (this.props.usersTyping.length === 1) {
      return (
        <div>
          {`${this.props.usersTyping[0]} is typing...`}
        </div>
      )
    } else if (this.props.usersTyping.length > 1) {
      return (
        <div>
          {`${this.props.usersTyping.join(', ')} are typing...`}
        </div>
      )
    } else {
      return (
        <p></p>
      )
    }
  }
}
