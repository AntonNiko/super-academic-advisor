import React, { Component } from 'react';
import '../style/Sidebar.css';

class Sidebar extends Component {
  constructor(props){
    super(props);

    this.state = {
      faculty_selected: null,
      program_selected: null,
      minor_selected: null,
      specialization_selected: null
    };

    this.facultyValue = null;
    this.programValue = null;
    this.minorValue = null;
    this.specializationValue = null;

    this.initial_load = {
      "Faculty": true,
      "Program": true,
      "Minor": true,
      "Specialization": true
    }

    this.actionSelectFaculty = this.actionSelectFaculty.bind(this);
    this.actionSelectProgram = this.actionSelectProgram.bind(this);
    this.actionSelectMinor = this.actionSelectMinor.bind(this);
    this.actionSelectSpecialization = this.actionSelectSpecialization.bind(this);
    this.actionSubmitSelections = this.actionSubmitSelections.bind(this);
  }

  actionSelectFaculty(value) {
    this.facultyValue = value;
    this.initial_load["Program"] = true;
    this.initial_load["Minor"] = true;
    this.initial_load["Specialization"] = true;

    this.forceUpdate();
  }

  actionSelectProgram(value) {
    this.programValue = value;
    this.initial_load["Minor"] = true;
    this.initial_load["Specialization"] = true;

    this.forceUpdate();
  }

  actionSelectMinor(value) {
    this.minorValue = value;

    this.forceUpdate();
  }

  actionSelectSpecialization(value) {
    this.specializationValue = value;

    this.forceUpdate();
  }

  actionSubmitSelections() {
    this.props.setProgramRequirements(this.facultyValue, this.programValue, this.minorValue, this.specializationValue);
  }

  renderFacultyDropdown() {
    var result = [];
    var _first = true;
    var list = [];

    for (var faculty in this.props.selection["Faculty"]) {
      if (_first) {
        result.push(<div class="dropdown-header"><p class="dropdown-value">{faculty}</p><span class="arrow-down"></span></div>);

        if (this.initial_load["Faculty"] == true) {
          this.facultyValue = faculty;
          this.initial_load["Faculty"] = false;
        }

        _first = false;
      }

      list.push(<li value={faculty}><span>{faculty}</span></li>);
    }

    result.push(<ul>{list}</ul>);
    return result;
  }

  renderProgramDropdown() {
    var result = [];
    var _first = true;
    var list = [];

    if (this.facultyValue == null) {
      result.push(<div class="dropdown-header"><p class="dropdown-value"></p><span class="arrow-down"></span></div>);
    } else {
      var faculty_value = this.facultyValue;
      for(var program in this.props.selection["Faculty"][faculty_value]){
        if(_first){
          result.push(<div class="dropdown-header"><p class="dropdown-value">{program}</p><span class="arrow-down"></span></div>);

          if (this.initial_load["Program"] == true) {
            this.programValue = program;
            this.initial_load["Program"] = false;
          }

          _first = false;
        }

        list.push(<li value={program}><span>{program}</span></li>);
      }
    }

    result.push(<ul>{list}</ul>);
    return result;
  }

  renderMinorDropdown() {
    var result = [];
    var _first = true;
    var list = [];

    if (this.programValue == null) {
      result.push(<div class="dropdown-header"><p class="dropdown-value"></p><span class="arrow-down"></span></div>);
    } else {
      list.push(<li value="None"><span>None</span></li>);
      var program_exception_value = this.programValue;

      for (var minor in this.props.selection["Minors"]){
        // Check that the minor is available for selected program. If not, skip minor
        if (this.props.selection["Minors"][minor].includes(program_exception_value)) {
          continue;
        }

        if (_first) {
          result.push(<div class="dropdown-header"><p class="dropdown-value">{minor}</p><span class="arrow-down"></span></div>);

          if (this.initial_load["Minor"] == true) {
            this.minorValue = minor;
            this.initial_load["Minor"] = false;
          }

          _first = false;
        }

        list.push(<li value={minor}><span>{minor}</span></li>);
      }
    }
    result.push(<ul>{list}</ul>);
    return result;
  }

  renderSpecializationDropdown() {
    var result = [];
    var _first = true;
    var list = [];

    if (this.programValue == null) {
      result.push(<div class="dropdown-header"><p class="dropdown-value"></p><span class="arrow-down"></span></div>);
    } else {
      // If program does not have any specliazations, skip
      var faculty_value = this.facultyValue;
      var program_value = this.programValue;
      var program = this.props.selection["Faculty"][faculty_value][program_value];

      if (program != null) {
        if (program["Specializations"]["Nullable"] == true) {
          list.push(<li value="None"><span>None</span></li>);
        }

        for (var i=0; i < program["Specializations"]["Items"].length; i++) {
          if (_first) {
            result.push(<div class="dropdown-header"><p class="dropdown-value">{program["Specializations"]["Items"][i]}</p><span class="arrow-down"></span></div>);

            if (this.initial_load["Specialization"] == true) {
              this.specializationValue = program["Specializations"]["Items"][i];
              this.initial_load["Specialization"] = false;
            }

            _first = false;
          }

          list.push(<li value={program["Specializations"]["Items"][i]}><span>{program["Specializations"]["Items"][i]}</span></li>);
        }
      } else {
        result.push(<div class="dropdown-header"><p class="dropdown-value">None</p><span class="arrow-down"></span></div>);

        if (this.initial_load["Specialization"] == true) {
          this.specializationValue = "None";
          this.initial_load["Specialization"] = false;
        }
      }
    }

    result.push(<ul>{list}</ul>);
    return result;
  }

  componentDidMount(){
  }

  componentDidUpdate(){
    this.props.colors.updateColorThemes();
  }

  render() {
    return (
      [<div id="sidebar-select-view">
        <div class="sidebar-header">
          <div class="sidebar-header-content" id="sidebar-select-switch-button">
            <span class="sidebar-header-content-title">Switch to Wizard</span>
            <span class="sidebar-header-content-icon"></span>
          </div>
          <div class="sidebar-header-title"><span>Select</span></div>
        </div>
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
          <button type="button" class="btn-primary" id="sidebar-selection-submit">Submit</button>
        </div>
      </div>,

      <div id="sidebar-wizard-view">
        <div class="sidebar-header">
          <div class="sidebar-header-content" id="sidebar-wizard-switch-button">
            <span class="sidebar-header-content-title">Switch to Select</span>
            <span class="sidebar-header-content-icon"></span>
          </div>
          <div class="sidebar-header-title"><span>Select</span></div>
        </div>
        <div class="form-group">
          <button type="button" class="btn-primary" id="sidebar-selection-submit">Submit</button>
        </div>
      </div>]
    );
  }
}

export default Sidebar;
