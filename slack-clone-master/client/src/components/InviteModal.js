import Button from "react-bootstrap/Button";
import React, {Component} from "react";
import {Modal} from "react-bootstrap";

export default class InviteModal extends Component {
  constructor() {
    super();
    this.state = {
      show: false,
      username: '',
      invalidUsername: ''
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.invite = this.invite.bind(this);
  }

  handleClose() {
    this.setState({show: false, invalidUsername: false})

  }

  handleShow() {
    this.setState({
      show: true
    })
  }

  handleChange(e) {
    this.setState({username: e.target.value, invalidUsername: false});
  }

  async invite(e) {
    e.preventDefault();
    const response = await this.props.sendInvite(this.state.username, this.props.channelId);
    if (response) {
      console.log(`invite sent to ${this.state.username}`);
      this.setState({show: false, username: ""});
    } else {
      this.setState({show: true, username: "", invalidUsername: true})
    }
  }

  render() {
    return (
      <>
        <form>
          <Button variant="primary" onClick={this.handleShow}>
            Invite Friend
          </Button>

          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Choose a friend</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Search For User <input type="text" value={this.state.username}
                onChange={this.handleChange}
                placeholder={this.state.placeHolder} />
              <div className="invalidUsername">
                {this.state.invalidUsername && "Invalid Username"}
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Close
              </Button>
              <Button onClick={e => this.invite(e)}
                disabled={!this.state.username}>
                Invite This User
              </Button>
            </Modal.Footer>
          </Modal>
        </form>
      </>
    );
  }
}

