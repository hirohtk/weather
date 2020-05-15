import React from 'react';
import "./nav.css"
import $ from 'jquery'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { PromiseProvider } from 'mongoose';

function Nav(props) {

  const options = [
    '1', '2', '3'
  ];
  // const defaultOption = options[0];

  const _onSelect = () => {
    console.log("selected")
  }
  
  return (
<>
        {/* <ul id="dropdown1" class="dropdown-content">
          <li><a href="#!">one</a></li>
          <li><a href="#!">two</a></li>
          <li class="divider"></li>
          <li><a href="#!">three</a></li>
        </ul> */}
        <nav>
          <div class="nav-wrapper">
            <a href="#" class="brand-logo">Weather App</a>
            <ul id="nav-mobile" class="right hide-on-med-and-down">
              <li>{props.time}</li>
              <li><Dropdown options={options} onChange={_onSelect} value={"|||"} placeholder="Select an option" /></li>
              {/* <li><a class="dropdown-trigger" href="#!" data-target="dropdown1">Dropdown<i class="material-icons right">arrow_drop_down</i></a></li> */}
            </ul>
          </div>
        </nav>
      </>
  )
}

export default Nav;