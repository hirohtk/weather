import React from 'react';
import "./nav.css"
import $ from 'jquery'
// import Dropdown from 'react-dropdown';
// import 'react-dropdown/style.css';
import { PromiseProvider } from 'mongoose';
import Sidebar from "react-sidebar";
import axios from "axios"
// import moment from "moment";

class Nav extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: false,
      now: "",
      username: "",
      password: "",
      loggingIn: false,
      registering: false,
      enteringCredentials: false,
    }
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }

  // why did this have to be outside the constructor?  

  onSetSidebarOpen = (open) => {
    this.setState({ sidebarOpen: open });
  }

  loginRegisterGate = (event) => {
    if (event.target.name === "username") {
      this.setState({username: event.target.value});
    }
    else {
      this.setState({password: event.target.value});
    }
  }

  doLogOrReg = () => {
    let credentials = {
      username: this.state.username,
      password: this.state.userpassword
    }
    //login
    if (this.state.loggingIn === true) {
      axios.post("/api/login", credentials).then((response, err) => {
        // console.log(response.data);
        if (err) {
        }
        else if (response.data === "Failure") {
          console.log("failure", `Error: Username and/or Password incorrect.`);
        }
        else {
          // WILL NEED TO CREATE A PROPS FUNCTION TO PASS THIS INFO TO APP RATHER THAN KEEP IT HERE 
          this.setState({currentUser: [response.data.username, response.data.id], loggingIn: false, username: "", password: ""});
          console.log("success", `${response.data.username} is now logged in!`);
        }
      });
    }
    //register
    else if (this.state.registering === true) {
      axios.post("/api/register", credentials).then((response, err) => {
        console.log(`response from registering is ${JSON.stringify(response.data)}`);
        if (response.data.name === "UserExistsError") {
          console.log(`the error for registration is ${err}`)
          console.log("failure", `Sorry!  Username in use- please select another name.`);
        }
        else {
          this.setState({registering: false, username: "", password: ""})
          console.log("success", `${credentials.username} is now registered!`);
          // GRAB USER DETAILS -- response.data is the username
        }
      });
    }
  }

  render() {
    const props = this.props
    return (
      <>
        <Sidebar
          sidebar={<><b>Settings</b>
            <hr></hr>
            <div className="menuOptions" onClick={() => this.setState({enteringCredentials: true, loggingIn: true})}>{props.loggedIn === "true" ? "Logout" : "Login"}</div>
            <div className="menuOptions" onClick={() => this.setState({enteringCredentials: true, registering: true})}>Sign Up</div>
            {this.state.enteringCredentials ? 
            <>
            <input placeholder="Username" name="username" value={this.state.userName} maxLength="16" onChange={this.loginRegisterGate}></input>
            <input placeholder="Password" name="password" type="password" value={this.state.userPassword} maxLength="16" onChange={this.loginRegisterGate}></input>
            <button id="loginSubmit" onClick={this.doLogOrReg}>Submit</button></> : <></>}
          </>}
          open={this.state.sidebarOpen}
          onSetOpen={this.onSetSidebarOpen}
          styles={{ sidebar: { background: "gray", width: "20rem", position: "fixed" } }}
        >
        </Sidebar>
        <button className="sidebarButton" onClick={() => this.onSetSidebarOpen(true)}>
              <i class="material-icons">menu</i>
            </button>
        {/* <nav>
          <div class="nav-wrapper">
            <a href="#" class="brand-logo">Weather App</a>
            <ul id="nav-mobile" class="right hide-on-med-and-down">
            </ul>
          </div>
        </nav> */}
      </>
    )
  }
}

export default Nav;