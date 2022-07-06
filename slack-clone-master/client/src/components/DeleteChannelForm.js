import React, { Component } from "react";

export default class DeleteChannelForm extends Component {
  render() {
    return (
      <div>
        <input
          type="submit"
          value="Delete"
          onClick={e => this.props.deleteChannel(e)}
        />
      </div>
    );
  }
}
