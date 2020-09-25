import React from 'react';
import "./nav.css"
// import $ from 'jquery'
// import Dropdown from 'react-dropdown';
// import 'react-dropdown/style.css';
// import { PromiseProvider } from 'mongoose';
import Sidebar from "react-sidebar";
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Clock from "./clock"

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
      currentUser: undefined,
      userImage: ""
    }
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }

  // why did this have to be outside the constructor?  

  onSetSidebarOpen = (open) => {
    this.setState({ sidebarOpen: open });
  }

  googleAuth = () => {
    // axios.get(`/api/auth/afterRedirect`).then(response => {
    //   console.log(`did the google route`);
    // })
  }

  inputGate = (event) => {
    switch (event.target.name) {
      case "username":
      this.setState({ username: event.target.value });
      break;
      case "password":
      this.setState({ password: event.target.value });
      break;
      case "userImage": 
      this.setState({ userImage: event.target.value });
      break;
    }
  }

  doLogOrReg = () => {
    if (this.state.password.length === 0 || this.state.username.length === 0) {
      toast.error(`Username or password field are blank.`)
    }
    else {
      let credentials = {
        username: this.state.username,
        password: this.state.password,
        userImage: this.state.userImage
      }
      //login
      if (this.state.loggingIn === true) {
        axios.post("/api/login", credentials).then((response, err) => {
          console.log(`response.data from logging in is ${JSON.stringify(response.data)}`);
          if (err) {
          }
          else if (response.data === "Failure") {
            toast.error(`Error: Username and/or Password incorrect.`);
          }
          else {
            // WILL NEED TO CREATE A PROPS FUNCTION TO PASS THIS INFO TO APP RATHER THAN KEEP IT HERE 
            this.setState({ loggingIn: false, username: "", password: "", enteringCredentials: false }, () => this.props.handleLogin({ username: response.data.username, id: response.data.id, userImage: response.data.userImage }, "login"));
            // this.setState({ currentUser: [response.data.username, response.data.id], loggingIn: false, username: "", password: "", loggedIn: true });
            toast.success(`${response.data.username} is now logged in!`);
          }
        });
      }
      //register
      else if (this.state.registering === true) {
        axios.post("/api/register", credentials).then((response, err) => {
          console.log(`response from registering is ${JSON.stringify(response.data)}`);
          if (response.data.name === "UserExistsError") {
            console.log(`the error for registration is ${err}`)
            toast.error(`Sorry!  Username in use- please select another name.`);
          }
          else {
            toast.info(`${credentials.username} is now registered!`);
            setTimeout(() => {
              toast.success(`Logged you in...!`);
              this.props.handleLogin({ username: credentials.username, id: response.data.id, userImage: credentials.userImage }, "login", () => this.setState({ registering: false, username: "", password: "", userImage: "", enteringCredentials: false }));
            }, 1000);
            // GRAB USER DETAILS -- response.data is the username
          }
        });
      }
    }
  }


  render() {
    const props = this.props
    return (
      <>
        <Sidebar
          sidebar={<>
            <b>FriendForecast App - Settings</b>
            <hr></hr>
            <div className="menuOptions" style={this.state.loggingIn ? { color: "white" } : {}}
              onClick={() => {
                props.loggedIn ? props.handleLogin({}, "logout") :
                  this.setState({ enteringCredentials: true, loggingIn: true, registering: false, username: "", password: "" })
              }
              }>
              {props.loggedIn ? "Logout" : "Login"}
            </div>
            <div className="menuOptions" style={this.state.registering ? { color: "white" } : {}} onClick={() => this.setState({ enteringCredentials: true, registering: true, loggingIn: false, username: "", password: "" })}>Sign Up</div>
            {this.state.enteringCredentials ?
              <>
                <input placeholder="Username" name="username" value={this.state.username} maxLength="16" onChange={this.inputGate}></input>
                <input placeholder="Password" name="password" type="password" value={this.state.password} maxLength="16" onChange={this.inputGate}></input>
                {this.state.registering ? <input placeholder="User Image URL!" name="userImage" value={this.state.userImage}  onChange={this.inputGate}></input> : <></>}
                <button id="loginSubmit" onClick={this.doLogOrReg}>Submit</button>
                {/* <a href="http://localhost:3001/api/auth/google" onClick={this.googleAuth}><button id="googleAuth">Sign in with Google</button></a> */}
                </> : <></>}
            <div className="switch" id="checkBoxUnits">
              <label id="metric">
                US
                <input type="checkbox" onChange={this.props.changeUnits}/>
                <span class="lever"></span>
                Metric
            </label>
            </div>
          </>}
          open={this.state.sidebarOpen}
          onSetOpen={this.onSetSidebarOpen}
          styles={{ sidebar: { background: "gray", width: "20rem", position: "fixed" } }
          }
          children=""
        >
        </Sidebar>
        <button className="sidebarButton" onClick={() => this.onSetSidebarOpen(true)}>
          <i className="material-icons">menu</i>
        </button>
        {props.loggedIn ? <></> : <>
          <p id="loginArrow"><i className="material-icons">keyboard_backspace</i></p>
          <p id="loginTooltip"><i>Login to add friends, chat, and view their current weather conditions!</i></p>
        </>
        }
        <Clock></Clock>
        <ToastContainer
          position="bottom-left"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange
          draggable
          pauseOnHover
        />
      </>
    )
  }
}

export default Nav;