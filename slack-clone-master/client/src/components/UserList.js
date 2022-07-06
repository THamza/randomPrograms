import React, {Component} from 'react'

export default class UserList extends Component {
  render() {
    if(this.props.users.length > 0){
      return (
        <div>
          <br></br>
          <div>
            <h3>Users in this Channel:</h3>
          </div>
          {this.props.users.map((user, index) => {
            return (
              <div key={index}>
                {`${user.name} (${user.presence.state})`}
              </div>
            )
          })}
        </div>
      )
    } else {
      return (
        <div><h3>Users in this Channel:</h3></div>
      )
    }
  }
}
