import React, {Component} from 'react';
import Button from "react-bootstrap/Button";
//import DeleteChannelForm from './DeleteChannelForm';

export default class AddChannelForm extends Component {
  constructor() {
    super();
    this.state = {
      channelName: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({channelName: e.target.value});
  }

  render() {
    return (
      <form className="form-group" style={{display: 'block'}}>
        <input
          className="form-control"
          value={this.state.channelName}
          type="text"
          name="name"
          placeholder="Enter Channel Name"
          onChange={this.handleChange}
        />
        <Button
          type="submit"
          className="btn btn-primary btn-block btn-create"
          disabled={!this.state.channelName}
          onClick={e => this.props.addChannel(e, this.state.channelName)}
        >
          Create Channel
        </Button>
      </form>
    );
  }
}
