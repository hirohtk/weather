import React from 'react';
import "./nav.css"
import $ from 'jquery'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

function Nav() {

  const options = [
    'one', 'two', 'three'
  ];
  const defaultOption = options[0];
  
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
            <a href="#" class="brand-logo">Logo</a>
            <ul id="nav-mobile" class="right hide-on-med-and-down">
            <Dropdown options={options} onChange={this._onSelect} value={defaultOption} placeholder="Select an option" />;
              <li><a class="dropdown-trigger" href="#!" data-target="dropdown1">Dropdown<i class="material-icons right">arrow_drop_down</i></a></li>
            </ul>
          </div>
        </nav>
      </>
  )
}

export default Nav;