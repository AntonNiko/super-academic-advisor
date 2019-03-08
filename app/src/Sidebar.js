import React, { Component } from 'react';
import logo from './logo.svg';
import './style/Sidebar.css';

class Sidebar extends Component {
  constructor(props){
    super(props);

    this.state = {
      current_selection: null,
      faculty_selected: null,
      program_selected: null,
      minor_selected: null,
      specialization_selected: null
    };
  }

  renderFacultyDropdown(){
    var result = [];
    var _first = true;
    var list = [];
    for(var faculty in this.props.selection){
      if(_first){
        result.push(<div class="dropdown-header"><p class="dropdown-value">{faculty}</p><span class="arrow-down"></span></div>);
        _first = false;
      }

      if(faculty != "Minors"){
        list.push(<li value={faculty}><span>{faculty}</span></li>);
      }
    }
    result.push(<ul>{list}</ul>);
    return result;
  }

  renderProgramDropdown(){

  }

  renderMinorDropdown(){

  }

  renderSpecializationDropdown(){

  }

  render() {
    //console.log(this.props);
    this.renderFacultyDropdown();
    return (
      <div>
        <div class="form-group-new">
          <span>Faculty</span>
          <ul class="dropdown-select">
            <li>
              {this.renderFacultyDropdown()}
            </li>
          </ul>
        </div>
        <div class="form-group-new">
          <span>Program</span>
          <ul class="dropdown-select">
            <li>
              <div class="dropdown-header">
                <p class="dropdown-value">Software Engineering</p><span class="arrow-down"></span>
              </div>
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
              <div class="dropdown-header">
                <p class="dropdown-value">Business</p><span class="arrow-down"></span>
              </div>
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
              <div class="dropdown-header">
                <p class="dropdown-value">Data mining and analysis, artificial intelligence, and machine learning</p><span class="arrow-down"></span>
              </div>
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
