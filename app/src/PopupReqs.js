import React, { Component } from 'react';
import 'jquery-ui/ui/widgets/sortable';
import 'jquery-ui/ui/widgets/draggable';
import './style/PopupReqs.css';
import './style/Modal.css';

class PopupReqs extends Component {
  constructor(props){
    super(props);

    this.state = {
      requirements: this.props.requirements,
      active_courses: [],
      fulfilled: false,
      remaining_number: this.props.requirements.length,
    };

    this.remaining_number = this.state.remaining_number;
    this.inactive_course_icon_link = "/assets/icons8-delete-96.png";
    this.active_course_icon_link = "/assets/icons8-checkmark-96.png";

    this.updateProgramReqs = this.updateProgramReqs.bind(this);
  }

  updateProgramReqs(semesters){
    var new_active_courses = [];
    for(var semester_id in semesters){
      var current_semester_courses = semesters[semester_id].current.state.courses[0];
      new_active_courses = new_active_courses.concat(current_semester_courses);
    }
    this.setState({active_courses: new_active_courses});
  }

  updateRemainingRequirementsNumber(){
    // TODO: Write method which calculates how many requirements have not been met
    var requirements = this.state.requirements;
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

  allProgramRequirementsMet(){
    // TODO: Write method which checks if all program requirements have been met
  }

  isCourseActive(course_str){
    if(this.state.active_courses.includes(course_str)){
      return true;
    }else{
      return false;
    }
  }

  createProgramReqList(){
    var list_items = [];

    var requirements = this.props.requirements;
    // Cycle through each individual program requirement
    for(var i=0; i<requirements.length; i++){
      // Cycle through each course requirement's elements
      for(var j=0; j<requirements[i].length; j++){
        // Represents a program requirements
        var current_course = requirements[i][j];
        if(typeof current_course == "object"){
          // If the requirements is an array, means that both courses need to be satisfied
          for(var k=0; k<current_course.length; k++){
            list_items.push(<li class="reqs-course-item"><span class="reqs-checkmark-bg"><img src={this.isCourseActive(current_course[k]) ? this.active_course_icon_link : this.inactive_course_icon_link}></img></span><span class="reqs-course-name">{current_course[k]}</span></li>);

            if(k+1 != current_course.length){
              list_items.push(<li class="reqs-course-conditional"><span class="reqs-conditional-text">AND</span></li>);
            }
          }

        }else if(typeof current_course == "string"){
          // Individual course, so can simply add course item and move on
          list_items.push(<li class="reqs-course-item"><span class="reqs-checkmark-bg"><img src={this.isCourseActive(current_course) ? this.active_course_icon_link : this.inactive_course_icon_link}></img></span><span class="reqs-course-name">{current_course}</span></li>);
        }

        // If we've reached the end of the individual program requirement, we can avoid placing a conditional item
        if(j+1 != requirements[i].length){
          list_items.push(<li class="reqs-course-conditional"><span class="reqs-conditional-text">OR</span></li>);
        }
      }

      list_items.push(<li class="reqs-course-separator"><hr></hr></li>);
    }

    return list_items;
  }

  renderRemainingRequirements(){
    var remaining_requirements_num = this.updateRemainingRequirementsNumber();
    return (<span id="modal-reqs-fulfilled-status">{remaining_requirements_num} missing</span>);
  }

  render(){
      return (
        <div id="modal-reqs" class="modal-clear">
          <div id="modal-reqs-content">
            <div id="modal-reqs-header">
              <span id="modal-reqs-title">Required</span>
              {this.renderRemainingRequirements()}
            </div>

            <div id="modal-reqs-list">
              <ul id="reqs-course-list">
                {this.createProgramReqList()}
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

export default PopupReqs;
