import React, { Component } from 'react';
import logo from './logo.svg';

class Sidebar extends Component {
  render() {
    return (
      <div>
        <div class="form-group-new">
          <span>Faculty</span>
          <ul class="dropdown-select">
            <li>
              <span class="dropdown-value">Engineering</span><span class="arrow-down"></span>
              <ul>
                <li value="Engineering"><span>Engineering</span></li>
                <li value="Economics"><span>Economics</span></li>
                <li value="Humanities"><span>Humanities</span></li>
              </ul>
            </li>
          </ul>
        </div>
        <div class="form-group-new">
          <span>Program</span>
          <ul class="dropdown-select">
            <li>
              <span class="dropdown-value">Software Engineering</span><span class="arrow-down"></span>
              <ul>
                <li value="Software Engineering"><span>Software Engineering</span></li>
                <li value="Mechanical Engineering"><span>Mechanical Engineering</span></li>
                <li value="Biomedical Engineering"><span>Biomedical Engineering</span></li>
              </ul>
            </li>
          </ul>
        </div>
        <div class="form-group-new">
          <span>Minor</span>
          <ul class="dropdown-select">
            <li>
              <span class="dropdown-value">Business</span><span class="arrow-down"></span>
              <ul>
                <li value="Business"><span>Business</span></li>
                <li value="Software Development"><span>Software Development</span></li>
                <li value="Biomedical Engineering"><span>Biomedical Engineering</span></li>
              </ul>
            </li>
          </ul>
        </div>
        <div class="form-group-new">
          <span>Specialization</span>
          <ul class="dropdown-select">
            <li>
              <span class="dropdown-value">Data mining and analysis, artificial intelligence, and machine learning</span><span class="arrow-down"></span>
              <ul>
                <li value="Data mining and analysis, artificial intelligence, and machine learning"><span>Data mining and analysis, artificial intelligence, and machine learning</span></li>
                <li value="Software Development"><span>Cybersecurity and privacy</span></li>
                <li value="Performance and scalability"><span>Performance and scalability</span></li>
              </ul>
            </li>
          </ul>
        </div>
        <div class="form-group">
          <button type="button" class="btn-primary">Submit</button>
        </div>
      </div>
    );
  }
}

export default Sidebar;
