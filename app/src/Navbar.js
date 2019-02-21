import React, { Component } from 'react';
import logo from './logo.svg';
//import './Style.css';

class Navbar extends Component {
  render() {
    return (
      <div>
      <a class="navbar-brand" href="#">UVic</a>
      <a type="submit" href="#">Settings</a>
      <a type="submit" href="#">About</a>
      <a type="submit" href="#">Contact</a>
      </div>
      /*<div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>*/
    );
  }
}

export default Navbar;
