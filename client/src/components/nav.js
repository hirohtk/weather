import React from 'react';
import "./nav.css"
import $ from 'jquery'
// import Dropdown from 'react-dropdown';
// import 'react-dropdown/style.css';
import { PromiseProvider } from 'mongoose';
import Sidebar from "react-sidebar";
// import moment from "moment";

class Nav extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: false,
      now: ""
    }
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }

  // why did this have to be outside the constructor?  

  onSetSidebarOpen = (open) => {
    this.setState({ sidebarOpen: open });
  }

  render() {
    const props = this.props
    return (
      <>
        <Sidebar
          sidebar={<><b>Settings</b>
            <hr></hr>
            <div className="menuOptions" onClick={props.login()}>{props.loggedIn ? "Logout" : "Login"}</div>
            <div className="menuOptions">Sign Up</div>
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