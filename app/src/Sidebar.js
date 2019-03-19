import React, { Component } from 'react';
import './style/Sidebar.css';

class Sidebar extends Component {
  // TODO: TEST STATE UPDATE ON FACULTY, PROGRAM, MINOR, and SPECIALIZATION CHANGE
  constructor(props){
    super(props);

    // If a faculty has not been selected (first-time load), set first item as faculty
    // TODO: Develop more robust firs-time load
    this.state = {
      current_selection: null,
      faculty_selected: null,
      program_selected: null,
      minor_selected: null,
      specialization_selected: null
    };

    this.facultyValue = null;
    this.programValue = null;
    this.minorValue = null;
    this.specializationValue = null;

    this.actionSelectFaculty = this.actionSelectFaculty.bind(this);
    this.actionSelectProgram = this.actionSelectProgram.bind(this);
    this.actionSelectMinor = this.actionSelectMinor.bind(this);
    this.actionSelectSpecialization = this.actionSelectSpecialization.bind(this);
  }

  actionSelectFaculty(value){
    this.setState({faculty_selected: value});
  }

  actionSelectProgram(value){
    this.setState({program_selected: value});
  }

  actionSelectMinor(value){
    this.setState({minor_selected: value});
  }

  actionSelectSpecialization(value){
    this.setState({specialization_selected: value});
  }

  renderFacultyDropdown(){
    var result = [];
    var _first = true;
    var list = [];
    for(var faculty in this.props.selection["Faculty"]){
      if(_first){
        result.push(<div class="dropdown-header"><p class="dropdown-value">{faculty}</p><span class="arrow-down"></span></div>);
        this.facultyValue = faculty;
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
      for(var program in this.props.selection["Faculty"][this.state.faculty_selected]){
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
      list.push(<li value="None"><span>None</span></li>);
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

    if(this.state.program_selected == null){
      result.push(<div class="dropdown-header"><p class="dropdown-value"></p><span class="arrow-down"></span></div>);
    }else{
      // If program does not have any specliazations, skip
      var program = this.props.selection["Faculty"][this.state.faculty_selected][this.state.program_selected];
      if(program != null){

        if(program["Specializations"]["Nullable"] == true){
          list.push(<li value="None"><span>None</span></li>);
        }

        console.log(program);
        for(var i=0; i < program["Specializations"]["Items"].length; i++){
          if(_first){
            result.push(<div class="dropdown-header"><p class="dropdown-value">{program["Specializations"]["Items"][i]}</p><span class="arrow-down"></span></div>);
            _first = false;
          }

          list.push(<li value={program["Specializations"]["Items"][i]}><span>{program["Specializations"]["Items"][i]}</span></li>);
        }
      }else{
        result.push(<div class="dropdown-header"><p class="dropdown-value"></p><span class="arrow-down"></span></div>);
      }
    }
    result.push(<ul>{list}</ul>);
    return result;
  }

  componentDidMount(){
    this.setState({
      faculty_selected: this.facultyValue,
      program_selected: this.programValue,
      minor_selected: this.minorValue,
      specialization_selected: this.specializationValue,
    });
  }

  componentDidUpdate(){
    this.props.colors.updateColorThemes();
  }

  render() {
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
