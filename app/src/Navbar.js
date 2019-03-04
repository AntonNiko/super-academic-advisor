import React, { Component } from 'react';
import logo from './logo.svg';
import './Navbar.css';

class Navbar extends Component {
  render() {
    return (
      <div>
        <a class="navbar-text" href="#"><span>UVic</span></a>
        <a class="navbar-text" type="submit" href="#"><span>About</span></a>
        <a class="navbar-text" type="submit" href="#"><span>Contact</span></a>
        <a class="navbar-img" type="submit" href="#">
          <img src="/assets/icons8-services-480.png"></img>
        </a>
        <a class="navbar-img" type="submit" href="#">
          <img src="/assets/icons8-course-80.png"></img>
        </a>
      </div>
    );
  }
}

export default Navbar;
