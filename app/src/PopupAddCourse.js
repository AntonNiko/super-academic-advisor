import React, { Component } from 'react';
import logo from './logo.svg';
import './style/PopupAddCourse.css';
import './style/Modal.css';

class PopupAddCourse extends Component {
  constructor(props){
    super(props);

    this.state = {
      selected_courses: [],
      staged_courses: {},
      available_years: ["2018","2019","2020","2021"],
    }

    this.addSelectedCourse = this.addSelectedCourse.bind(this);
    this.removeSelectedCourse = this.removeSelectedCourse.bind(this);
    this.stageSelectedCourses = this.stageSelectedCourses.bind(this);
    this.unstageStagedCourses = this.unstageStagedCourses.bind(this);
  }

  addSelectedCourse(course_str){
    var new_selected_courses = this.state.selected_courses;
    new_selected_courses.push(course_str);
    this.setState({selected_courses: new_selected_courses});
  }

  removeSelectedCourse(course_str){
    var new_selected_courses = this.state.selected_courses;
    new_selected_courses.splice(new_selected_courses.indexOf(course_str), 1);
    this.setState({selected_courses: new_selected_courses});
  }

  stageSelectedCourses(){
    // Move selected courses in position to be added to program
    // TODO: Verify course offered in right semesters
    // TODO: Verify course not already added to program
    // TODO: Verify course does not have exceptions (E.g: ENGR 112 and ENGR 110)
    var new_staged_courses = this.state.staged_courses;
    for(var i=0; i<this.state.selected_courses.length; i++){
      new_staged_courses[this.state.selected_courses[i]] = ["2019","F"];
    }
    this.setState({staged_courses: new_staged_courses});
  }

  unstageStagedCourses(){
    console.log("unstaging");
  }

  editStagedCourseSequence(){

  }



  renderCourseSelectionList(){
    var list_elements = [];

    // Sort course props into dictionary, ready to render
    var course_dir = {};
    for(var course_key in this.props.data){
      var course_obj = this.props.data[course_key];
      var course_subject = course_obj[0];


      // If subject key is undefined, create one
      if(course_dir[course_subject] == undefined){
        course_dir[course_subject] = [];
      }
      course_dir[course_subject].push(course_key);
    }

    // Render all list elements
    for(var course_subject in course_dir){
      list_elements.push(<li class="modal-add-course-subject"><span class="modal-chevron-collapsed"></span><span class="modal-list-title">{course_subject}</span></li>);
      var subject_courses = [];
      for(var i=0; i<course_dir[course_subject].length; i++){
        var selection_class = this.state.selected_courses.includes(course_dir[course_subject][i]) ? "course-item-selected" : "course-item-unselected";
        var course_item_class = "modal-course-item "+selection_class;

        subject_courses.push(<li class={course_item_class}><span>{course_dir[course_subject][i]}</span></li>);
      }
      list_elements.push(<ul class="modal-course-group">{subject_courses}</ul>);
    }
    return list_elements;
  }

  renderStagedCoursesList(){
    var list_elements = [];

    // For each staged course in the state, render and add a separator for list
    for(var course_str in this.state.staged_courses){
      var course_container = []
      var actions_container = [];

      // Generate year dropdown for course, based on state
      actions_container.push(this.generateDynamicYearDropdownList());
      actions_container.push(this.generateDynamicSemesterDropdownList(course_str));
      actions_container.push(<div class="modal-add-course-selected-delete"><img src="/assets/icons8-delete-40.png"></img></div>);

      course_container.push(<div class="modal-add-course-selected-title"><span>{course_str}</span></div>);
      course_container.push(<div class="modal-add-course-selected-actions">{actions_container}</div>);
      list_elements.push(<li class="modal-add-course-selected-course">{course_container}</li>);
      list_elements.push(<li class="modal-add-course-selected-separator"><hr></hr></li>);
    }

    return list_elements;
  }

  generateDynamicYearDropdownList(){
    var list_items = [];
    for(var i=0; i<this.state.available_years.length; i++){
      list_items.push(<li value={this.state.available_years[i]}><span>{this.state.available_years[i]}</span></li>)
    }

    return(
    <ul class="dropdown-select-small">
      <li>
        <div class="dropdown-header">
          <p class="dropdown-value">{this.state.available_years[0]}</p><span class="arrow-down"></span>
        </div>
        <ul>
          {list_items}
        </ul>
      </li>
    </ul>
    );
  }

  generateDynamicSemesterDropdownList(course_str){
    /* Generate dynamic semester dropdown list, based on specific course's semester avilability */
    var course_semesters_offered = this.props.data[course_str][3];
    var list_items = [];
    for(var i=0; i<course_semesters_offered.length; i++){
      var semester = course_semesters_offered[i];
      list_items.push(<li value={semester}><span>{semester}</span></li>);
    }

    return (
    <ul class="dropdown-select-small">
      <li class="dropdown-select-small-narrow">
        <div class="dropdown-header">
          <p class="dropdown-value">{course_semesters_offered[0]}</p><span class="arrow-down"></span>
        </div>
        <ul>
          {list_items}
        </ul>
      </li>
    </ul>);
  }

  render(){
    return (
      <div id="modal-add-course" class="modal modal-opaque">
        <div class="modal-content modal-draggable">
          <span class="modal-close-button">X</span>
          <h2 class="modal-title">Add Course</h2>


          <div class="modal-subtitle">
            <h3 id="modal-course-subtitle-left" class="modal-subtitle-left"><span>To select:</span></h3>
            <h3 id="modal-course-subtitle-right" class="modal-subtitle-right"><span>Selected:</span></h3>
          </div>

          <div id="modal-add-course-workplace">
            <div class="modal-table-nested" id="modal-add-course-dir">
              <div class="modal-table-content">
                <ul class="modal-table-list">
                  {this.renderCourseSelectionList()}
                </ul>
              </div>
            </div>

            <div id="modal-add-course-transfer-actions">
              <div id="modal-add-course-action-container">
                <div>
                  <button type="button" class="btn-action" id="modal-add-course-action-add">Move Courses</button>
                  <button type="button" class="btn-action" id="modal-add-course-action-remove">Remove Courses</button>
                </div>
              </div>
            </div>

            <div class="modal-table-nested" id="modal-add-course-results">
              <div class="modal-table-content" id="modal-add-course-results-content">
                <ul class="modal-table-list" id="modal-add-course-results-list">
                  {this.renderStagedCoursesList()}
                </ul>
              </div>
            </div>
          </div>

          <div id="modal-add-footer" class="modal-footer">
            <div class="modal-footer-buttons">
              <div class="form-group">
                <button type="button" class="btn-primary" id="modal-add-course-submit">Add Courses</button>
              </div>
              <div class="form-group">
                <button type="button" class="btn-secondary modal-cancel-button" id="modal-add-course-cancel">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </div>);
  }
}

export default PopupAddCourse;
