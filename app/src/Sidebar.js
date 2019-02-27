import React, { Component } from 'react';
import logo from './logo.svg';

class Sidebar extends Component {
  render() {
    return (
      <div>
        <div class="form-group-new">
          <ul class="dropdown-select">
            <li>
              <span class="dropdown-value">Engineering</span><span class="arrow-down"></span>
              <ul>
                <li value="Engineering"><span>Engineering</span></li>
                <li value="Economics"><span>Science</span></li>
                <li value="Humanities"><span>Humanities</span></li>
              </ul>
            </li>
          </ul>
        </div>
        <div class="form-group-new">
          <ul class="dropdown-select">
            <li>
              <span class="dropdown-value">Software Eng</span><span class="arrow-down"></span>
              <ul>
                <li value="Software Engineering"><span>Software Engineering</span></li>
                <li value="Mechanical Engineering"><span>Mechanical Engineering</span></li>
                <li value="Biomedical Engineering"><span>Biomedical Engineering</span></li>
              </ul>
            </li>
          </ul>
        </div>
        <div class="form-group-new">
          <label for="minors">Minor</label>
          <select class="form-control" id="minors">
            <option>Business</option>
            <option>Software Development</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
        </div>
        <div class="form-group-new">
          <label for="minors">Specialization</label>
          <select class="form-control" id="minors">
            <option>Data mining and analysis, artificial intelligence, and machine learning</option>
            <option>Cybersecurity and privacy</option>
            <option>Performance and scalability</option>
            <option>Interaction design and data visualization</option>
            <option>Visual computing (vision/graphics/gaming)</option>
          </select>
        </div>
        <div class="form-group-new">
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
    );
  }
}

export default Sidebar;
