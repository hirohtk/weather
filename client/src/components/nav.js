import React from 'react';
import "./nav.css"
import $ from 'jquery'
// import Dropdown from 'react-dropdown';
// import 'react-dropdown/style.css';
import { PromiseProvider } from 'mongoose';
import Sidebar from "react-sidebar";

class Nav extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: false
    }
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }

  // why did this have to be outside the constructor?  

  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
  }

  render() {
    const props = this.props
    return (
      <>
        {/* <ul id="dropdown1" class="dropdown-content">
              <li><a href="#!">one</a></li>
              <li><a href="#!">two</a></li>
              <li class="divider"></li>
              <li><a href="#!">three</a></li>
            </ul> */}
        <nav>
        <Sidebar
              sidebar={<><b>Sidebar content</b>
              <hr></hr>
              <div>1</div>
              <div>2</div>
              <div>3</div>
              <div>4</div>

              </>}
              open={this.state.sidebarOpen}
              onSetOpen={this.onSetSidebarOpen}
              styles={{ sidebar: { background: "gray", width: "20rem" } }}
            >
              
            </Sidebar>
          <div class="nav-wrapper">
          <button className="sidebarButton" onClick={() => this.onSetSidebarOpen(true)}>
          <i class="material-icons">menu</i>
        </button>
            <a href="#" class="brand-logo">Weather App</a>
            <ul id="nav-mobile" class="right hide-on-med-and-down">
              <li>{this.props.time}</li>
              {/* <li><Dropdown options={options} onChange={_onSelect} value={"|||"} placeholder="Select an option" /></li> */}
              {/* <li><a class="dropdown-trigger" href="#!" data-target="dropdown1">Dropdown<i class="material-icons right">arrow_drop_down</i></a></li> */}
            </ul>
          </div>
        </nav>
      </>
    )
  }
}

export default Nav;