import React, { Component } from 'react';
import logo from './logo.svg';

class Navbar extends Component {
  render() {
    return (
      <div>
        <a class="navbar-brand" href="#">UVic</a>
        <a type="submit" href="#">Settings</a>
        <a type="submit" href="#">About</a>
        <a type="submit" href="#">Contact</a>
      </div>
    );
  }
}

export default Navbar;
