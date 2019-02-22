import React, { Component } from 'react';
import logo from './logo.svg';

class Sidebar extends Component {
  render() {
    return (
      <div>
        <div class="form-group">
          <label for="faculty">Faculty</label>
          <select class="form-control" id="faculty">
            <option value="">Engineering</option>
            <option>Science</option>
            <option>Humanities</option>
          </select>
        </div>
        <div class="form-group">
          <label for="programs">Program</label>
          <select class="form-control" id="programs">
            <option>Software Engineering</option>
            <option>Mechanical Engineering</option>
            <option>Biomedical Engineering</option>
            <option>Civil Engineering</option>
            <option>Electrical Engineering</option>
          </select>
        </div>
        <div class="form-group">
          <label for="minors">Minor</label>
          <select class="form-control" id="minors">
            <option>Business</option>
            <option>Software Development</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
        </div>
        <div class="form-group">
          <label for="minors">Specialization</label>
          <select class="form-control" id="minors">
            <option>Data mining and analysis, artificial intelligence, and machine learning</option>
            <option>Cybersecurity and privacy</option>
            <option>Performance and scalability</option>
            <option>Interaction design and data visualization</option>
            <option>Visual computing (vision/graphics/gaming)</option>
          </select>
        </div>
        <div class="form-group">
          <button type="button" class="btn-primary">Submit</button>
        </div>
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

export default Sidebar;
