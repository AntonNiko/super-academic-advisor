import React, { Component } from 'react';
import logo from './logo.svg';
import './style/Sidebar.css';

class Sidebar extends Component {
  constructor(props){
    super(props);

    // If a faculty has not been selected (first-time load), set first item as faculty
    // TODO: Develop more robust firs-time load
    this.state = {
      current_selection: null,
      faculty_selected: "Engineering",
      program_selected: "Biomedical Engineering",
      minor_selected: "Software Development",
      specialization_selected: null
    };

    this.selectFaculty = this.selectFaculty.bind(this);
    this.selectProgram = this.selectProgram.bind(this);
    this.selectMinor = this.selectMinor.bind(this);
    this.selectSpecialization = this.selectSpecialization.bind(this);
  }

  selectFaculty(value){
    this.setState({faculty_selected: value});
  }

  selectProgram(value){
    this.setState({program_selected: value});
  }

  selectMinor(value){
    this.setState({minor_selected: value});
  }

  selectSpecialization(value){
    this.setState({specialization_selected: value});
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
    var result = [];
    var _first = true;
    var list = [];

    if(this.state.faculty_selected == null){
      result.push(<div class="dropdown-header"><p class="dropdown-value"></p><span class="arrow-down"></span></div>);
    }else{
      for(var program in this.props.selection[this.state.faculty_selected]){
        if(_first){
          result.push(<div class="dropdown-header"><p class="dropdown-value">{program}</p><span class="arrow-down"></span></div>);
          _first = false;
        }
        list.push(<li value={program}><span>{program}</span></li>);
      }
    }
    result.push(<ul>{list}</ul>);
    return result;
  }

  renderMinorDropdown(){
    var result = [];
    var _first = true;
    var list = [];

    if(this.state.program_selected == null){
      result.push(<div class="dropdown-header"><p class="dropdown-value"></p><span class="arrow-down"></span></div>);
    }else{
      for(var minor in this.props.selection["Minors"]){
        // Check that the minor is available for selected program. If not, skip minor
        if(this.props.selection["Minors"][minor].includes(this.state.program_selected)){
          continue;
        }
        if(_first){
          result.push(<div class="dropdown-header"><p class="dropdown-value">{minor}</p><span class="arrow-down"></span></div>);
          _first = false;
        }
        list.push(<li value={minor}><span>{minor}</span></li>);
      }
    }
    result.push(<ul>{list}</ul>);
    return result;
  }

  renderSpecializationDropdown(){
    var result = [];
    var _first = true;
    var list = [];

    console.log("aa");
    if(this.state.program_selected == null){
      result.push(<div class="dropdown-header"><p class="dropdown-value"></p><span class="arrow-down"></span></div>);
      console.log("null");
    }else{
      // If program does not have any specliazations, skip
      var program = this.props.selection[this.state.faculty_selected][this.state.program_selected];
      console.log(program);
      if(program != null){
        for(var i=0; i < program["Specializations"].length; i++){
          if(_first){
            console.log("first");
            result.push(<div class="dropdown-header"><p class="dropdown-value">{program["Specializations"][i]}</p><span class="arrow-down"></span></div>);
            _first = false;
          }
          list.push(<li value={program["Specializations"][i]}><span>{program["Specializations"][i]}</span></li>);
        }
      }else{
        result.push(<div class="dropdown-header"><p class="dropdown-value"></p><span class="arrow-down"></span></div>);
      }
    }
    result.push(<ul>{list}</ul>);
    return result;
  }

  render() {
    this.renderSpecializationDropdown();
    return (
      <div>
        <div class="form-group-new">
          <span>Faculty</span>
          <ul class="dropdown-select">
            <li id="faculty-dropdown">
              {this.renderFacultyDropdown()}
            </li>
          </ul>
        </div>
        <div class="form-group-new">
          <span>Program</span>
          <ul class="dropdown-select">
            <li id="program-dropdown">
              {this.renderProgramDropdown()}
            </li>
          </ul>
        </div>
        <div class="form-group-new">
          <span>Minor</span>
          <ul class="dropdown-select">
            <li id="minor-dropdown">
              {this.renderMinorDropdown()}
            </li>
          </ul>
        </div>
        <div class="form-group-new">
          <span>Specialization</span>
          <ul class="dropdown-select">
            <li id="specialization-dropdown">
              {this.renderSpecializationDropdown()}
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
