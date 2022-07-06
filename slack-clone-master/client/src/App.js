import React, {Component} from "react";
import ChatDashboard from "./components/ChatDashboard";
import Login from "./components/Login";
import {getUserByName, addUser} from "./api/users";
import Button from "react-bootstrap/Button";
import Toggle from 'react-toggle'
import "./index.css";

export default class App extends Component {
  constructor() {
    super();
    const isLoggedIn = window.sessionStorage.getItem('isLoggedIn') || false;
    const wasLoggedIn = JSON.parse(window.sessionStorage.getItem('userName')) || false;

    this.state = {
      user: {username: "", id: "", friendIDs: [], channelIDs: []},
      isLoggedIn: isLoggedIn,
      isLoading: false,
      wasLoggedIn: wasLoggedIn,
      darkMode: true,
      modeHasChanged: false
    };
    this.setUser = this.setUser.bind(this);
    this.logUserIn = this.logUserIn.bind(this);
    this.logOutUser = this.logOutUser.bind(this);
  }

  async componentDidMount() {
    if (!this.state.wasLoggedIn) return;

    try {
      const username = this.state.wasLoggedIn;
      const response = await getUserByName(username);
      if (response.data.length === 0) {
        this.setState({});
        sessionStorage.clear();
      }
      const newUser = {
        username: username,
        id: response.data[0]._id,
        friendIDs: response.data[0].friendIDs,
        channelIDs: response.data[0].channelIDs
      };
      this.setState({
        user: newUser,
        isLoggedIn: true,
      });
    } catch (error) {
      sessionStorage.clear();
      this.setState({});
    }

  }

  async setUser(userName) {
    try {
      const response = await addUser(userName);
      if (response.data) {
        alert(`Thank you for signing up, please login with your username: ${userName}`);
      }
    } catch (error) {
      alert("Unable to sign up with that username!");
      console.log(error);
      return;
    }
  };

  async logUserIn(userName) {
    try {
      const response = await getUserByName(userName);
      if (response.data.length === 0) {
        console.log("invalid username");
        alert("Invalid Username");
        return
      }
      const newUser = {
        username: userName,
        id: response.data[0]._id,
        friendIDs: response.data[0].friendIDs,
        channelIDs: response.data[0].channelIDs
      };
      this.setState({
        user: newUser,
        isLoggedIn: true
      });
      window.sessionStorage.setItem('isLoggedIn', this.state.isLoggedIn);
      window.sessionStorage.setItem('userName', JSON.stringify(this.state.user.username));
    } catch (error) {
      console.log(error);
    }
  }

  logOutUser() {
    this.setState({
      isLoggedIn: false
    });
    console.clear();
    sessionStorage.clear();
  }

  handleModeChange() {
    if (this.state.darkMode) {
      this.setState({
        darkMode: false,
        modeHasChanged: true
      });
      import("bootswatch/dist/flatly/bootstrap.min.css");
      this.reloadCss();
    }

    if (!this.state.darkMode) {
      this.setState({
        darkMode: true,
        modeHasChanged: true
      });
      import("bootswatch/dist/darkly/bootstrap.min.css");
      this.reloadCss();
    }
  }

  reloadCss() {
    if (this.state.modeHasChanged) {
      window.location.reload();
      this.setState({
        modeHasChanged: false
      });
    }
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="jumbotron-fluid" align="center">
          <h1>Slack Clone App</h1>
          {this.state.isLoggedIn &&
          <Button
            type="button"
            className="logoutButton btn btn-secondary"
            onClick={this.logOutUser}>
            Log out
          </Button>
          }
        </div>
        <label>
          <Toggle
            defaultChecked={this.state.darkMode}
            icons={false}
            onChange={this.handleModeChange.bind(this)}/>
          <span>Toggle theme</span>
        </label>
        {!this.state.isLoggedIn ? (
          <Login logUserIn={this.logUserIn} setUser={this.setUser}/>
        ) : (
          (this.state.user.username &&
            <ChatDashboard
              user={this.state.user}
              isloggedIn={this.state.isLoggedIn}
            />
          )
        )}
      </div>
    );
  }
}
