import 'jquery-ui/ui/widgets/sortable';
import 'jquery-ui/ui/widgets/draggable';
import '../style/Requirements.css';
import '../style/Modal.css';
import React, { Component } from 'react';
import RequirementsWizard from '../scripts/requirements_wizard.js';

class Requirements extends Component {
  constructor(props){
    super(props);

    // TRUTH SOURCE FOR USER-SUBMITTED PROGRAM REQUIREMENTS. SIDEBAR COMPONENT
    // SENDS RESULTING REQUIREMENTS FETCHED FROM DATA SOURCE, APPLIED HERE
    this.state = {
      course_requirements: [],
      active_courses: [],
      fulfilled: false,
      remaining_number: this.props.requirements.length,
    };

    this.requirementsWizard = new RequirementsWizard(this.props.requirements);

    this.remaining_number = this.state.remaining_number;
    this.inactive_course_icon_link = "/assets/icons8-delete-96.png";
    this.active_course_icon_link = "/assets/icons8-checkmark-96.png";

    this.actionUpdateProgramRequirements = this.actionUpdateProgramRequirements.bind(this);
    this.actionSetProgramRequirements = this.actionSetProgramRequirements.bind(this);
  }

  actionUpdateProgramRequirements(semesters){
    this.requirementsWizard.updateActiveCourses(semesters);
  }

  actionSetProgramRequirements(faculty, program, minor, specialization){
    this.requirementsWizard.setNewRequirements(faculty, program, minor, specialization);
    this.requirementsWizard.generateCourseRequirementsBasedOnSelectedRequirements();
    this.setState({course_requirements: this.requirementsWizard.result_course_requirements});
  }

  actionUpdateRemainingRequirementsNumber(){
    // TODO: Write method which calculates how many requirements have not been met
    var requirements = this.state.course_requirements;
    var remaining_requirements = requirements.length;

    for(var i=0; i<requirements.length; i++){
      var requirement = requirements[i];
      var requirement_met = false;
      for(var j=0; j<requirement.length; j++){
        var nested_requirement = requirement[j];
        // Assuming nested requirement is course
        if(this.state.active_courses.includes(nested_requirement)){
          requirement_met = true;
        }
        // Assuming nested requirement is array of 2 or more courses
        if(typeof nested_requirement == "object"){
          var nested_requirement_met = true;
          for(var k=0; k<nested_requirement.length; k++){
            if(!this.state.active_courses.includes(nested_requirement[k])) nested_requirement_met = false;
          }
          if(nested_requirement_met) requirement_met = true;
        }
      }

      if(requirement_met){
        remaining_requirements-=1;
        requirement_met = false;
      }
    }

    return remaining_requirements;
  }

  utilAllProgramRequirementsMet(){
    // TODO: Write method which checks if all program requirements have been met
  }

  utilIsCourseActive(course_str){
    if(this.state.active_courses.includes(course_str)){
      return true;
    }else{
      return false;
    }
  }

  // Calls the requirement wizard method to get generated requirements, from the previous user submit
  renderProgramRequirementsList(){
    this.requirementsWizard.updateFulfilledRequirements();
    return this.requirementsWizard.getGeneratedCourseRequirementsList();
  }

  // TODO: Update method to call requirementsWizard for that
  renderRemainingRequirements(){
    var remaining_requirements_num = this.actionUpdateRemainingRequirementsNumber();
    return (<span id="modal-reqs-fulfilled-status">{remaining_requirements_num} missing</span>);
  }

  componentDidUpdate(){
    this.props.colors.updateColorThemes();
  }

  render(){
      return (
        <div id="modal-reqs" class="modal-clear">
          <div id="modal-reqs-content">
            <div id="modal-reqs-header">
              <span id="modal-reqs-title">Required</span>
              <span id="modal-reqs-fulfilled-status">0 missing</span>
            </div>
            <div id="modal-reqs-list">
              <ul id="reqs-course-list">
                {this.renderProgramRequirementsList()}
              </ul>
            </div>
            <div id="modal-reqs-footer">
              <button type="button" class="btn-primary" id="modal-reqs-clear-button">Clear</button>
            </div>
          </div>
        </div>
      );
  }
}

export default Requirements;
