import React, { Component } from "react";
import Axios from "axios";
import { Redirect } from "react-router-dom";

export default class ProfilePage extends Component {
  constructor(props) {
    super(props);
    Axios.defaults.withCredentials = true;
    this.state = {
      id: "",
      firstName: "",
      lastName: "",
      emailAddress: "",
      password: "",
      loggedIn: true,
      data: "",
      errorMsg: null,
      errorMsgPassword: null,
    };
  }

  updatePassword = (state) => {
    Axios.post("http://localhost:3001/updatePassword", {
      fName: state.firstName,
      lName: state.lastName,
      email: state.emailAddress,
      password: state.password,
    }).then((response) => {
      this.setState({ data: response.data });
      if (response.data.message == "Update Succesful") {
        /* Play some notification */
        console.log("Account Updated");
      } else {
        console.log("Something went wrong");
        /* Do some kind of warning */
      }
    });
  };

  getUser = () => {
    //console.log("GetUser");
    Axios.get("http://localhost:3001/user").then((response) => {
      if (response.data.message !== "No authenticated User") {
        console.log(response)
        this.setState({ loggedIn: true, firstName: response.data.fName, id: response.data.id, lastName: response.data.lName, emailAddress: response.data.email});
      } else {
        this.setState({ loggedIn: false });
      }
    });
  };

  deleteAccount = (state) => {
    Axios.post("http://localhost:3001/deleteAccount", {
      id: state.id,
      password: state.password,
      email: state.emailAddress,
    }).then((response) => {
      this.setState({ data: response.data });
      if (response.data.message == "Account Deleted") {
        /* go back to homepage */
        this.setState({ loggedIn: false });
        console.log("Account Deleted");
      } else {
        alert("Didn't Delete");
        /* Do some kind of warning */
      }
    });
  };

  checkPasswordStrength = (pState) => {
    if (!pState.password.includes("!")) {
      this.setState({ errorMsgPassword: "Password needs an !" });
      return false;
    }
    if (pState.password.length < 6) {
      this.setState({ errorMsgPassword: "Password too short." });
      return false;
    }
    return true;
  };

  componentDidMount() {
    this.getUser();
  }

  render() {
    if (this.state.loggedIn == false) {
      return <Redirect to="/sign-up" />;
    }
    return (
      <div>
        <h3>Profile Page</h3>

        <div className="form-group">
          <label>First name</label>
          <input
            type="text"
            className="form-control"
            value={this.state.firstName}
            onChange={(e) => {
              this.setState({ firstName: e.target.value });
            }}
          />
        </div>

        <div className="form-group">
          <label>Last name</label>
          <input
            type="text"
            className="form-control"
            value={this.state.lastName}
            onChange={(e) => {
              this.setState({ lastName: e.target.value });
            }}
          />
        </div>

        <div className="form-group">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            value={this.state.emailAddress}
            onChange={(e) => {
              this.setState({ emailAddress: e.target.value });
            }}
          />
        </div>
        <div className="form-group">
          <label>
            Password - Need to contain a ! and have more than 6 characters
          </label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            onChange={(e) => {
              this.setState({ password: e.target.value });
            }}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary btn-block"
          onClick={() => this.updatePassword(this.state)}
        >
          Update Info
        </button>
        <button
          type="submit"
          className="btn btn-primary btn-block btn-warning"
          onClick={() => this.deleteAccount(this.state)}
        >
          Delete Account
        </button>
      </div>
    );
  }
}
