import React, {Component} from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBInput
} from "mdbreact";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      loginPage: true,
      signUpPage: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.enableSignUpPage = this.enableSignUpPage.bind(this);
    this.enableLoginPage = this.enableLoginPage.bind(this);
    this.login = this.login.bind(this);
    this.signUp = this.signUp.bind(this);
  }

  handleChange(e) {
    this.setState({username: e.target.value});
  }

  enableLoginPage(e) {
    e.preventDefault();
    this.setState({
      loginPage: true,
      signUpPage: false,
      username: ""
    });
  }

  enableSignUpPage(e) {
    e.preventDefault();
    this.setState({
      loginPage: false,
      signUpPage: true,
      username: ""
    });
  }

  signUp(e) {
    e.preventDefault();
    this.props.setUser(this.state.username);
    this.setState({
      username: ""
    });
  }

  login(e) {
    e.preventDefault();
    this.props.logUserIn(this.state.username);
    this.setState({
      username: ""
    });
  }

  handleLogPress(event) {
    let code = event.keyCode || event.which;
    if (code === 13) {
      this.login(event);
    }
  }

  handleSignPress(event) {
    let code = event.keyCode || event.which;
    if (code === 13) {
      this.signUp(event);
    }
  }

  loginPage() {
    return (
      <MDBContainer>
        <div className="signUp">
          <MDBRow>
            <MDBCol md="6">
              <MDBCard>
                <div className="header pt-3 grey lighten-2">
                  <div className="text-center">
                    <h3>
                      <strong>Log In</strong>
                    </h3>
                  </div>
                </div>
                <MDBCardBody className="mx-4 mt-4">
                  <MDBInput
                    id="userinput"
                    label="Your Username"
                    value={this.state.username}
                    onChange={this.handleChange}
                    onKeyPress={this.handleLogPress.bind(this)}
                  />

                  <div className="text-center mb-4 mt-5">
                    <MDBBtn
                      id="logbutton"
                      onClick={e => this.login(e)}
                      disabled={!this.state.username}
                      color="danger"
                      type="button"
                      className="btn-block z-depth-2"
                    >
                      Log in
                    </MDBBtn>
                  </div>
                  <p
                    className="font-small grey-text d-flex justify-content-center">
                    Don't have an account?
                    <a
                      href="#!"
                      className="dark-grey-text font-weight-bold ml-1"
                      onClick={e => this.enableSignUpPage(e)}
                      id="signup1"
                    >
                      Sign up
                    </a>
                  </p>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </div>
      </MDBContainer>
    );
  }

  signUpPage() {
    return (
      <MDBContainer>
        <div className="signUp">
          <MDBRow>
            <MDBCol md="6">
              <MDBCard>
                <div className="header pt-3 grey lighten-2">
                  <div className="text-center">
                    <h3>
                      <strong>Sign Up</strong>
                    </h3>
                  </div>
                </div>
                <MDBCardBody className="mx-4 mt-4">
                  <MDBInput
                    label="Your Username"
                    value={this.state.username}
                    onChange={this.handleChange}
                    onKeyPress={this.handleSignPress.bind(this)}
                  />

                  <div className="text-center mb-4 mt-5">
                    <MDBBtn
                      onClick={e => this.signUp(e)}
                      disabled={!this.state.username}
                      color="danger"
                      type="button"
                      className="btn-block z-depth-2"
                    >
                      Sign Up
                    </MDBBtn>
                  </div>
                  <p
                    className="font-small grey-text d-flex justify-content-center">
                    Already Have a Username?
                    <a
                      href="#!"
                      className="dark-grey-text font-weight-bold ml-1"
                      onClick={e => this.enableLoginPage(e)}
                      id="log1"
                    >
                      Log In
                    </a>
                  </p>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </div>
      </MDBContainer>
    );
  }

  render() {
    return (
      <div className="row" align="center">
        {this.state.loginPage ? this.loginPage() : this.signUpPage()}
      </div>
    );
  }
}
