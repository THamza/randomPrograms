import React, {Component} from 'react'

export default class MessageList extends Component {
  render() {
    return (
      <div>
        {this.props.messages.length <= 0 ? "no messages"
          : this.props.messages.map((message, index) => {
            return (
              <div key={index}>
                <div>{`${message.senderId}: ${message.parts[0].payload.content}`}</div>
              </div>
            )
          })}
      </div>
    )
  }
}
