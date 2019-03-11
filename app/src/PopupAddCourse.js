import React, { Component } from 'react';
import logo from './logo.svg';
import './style/PopupAddCourse.css';
import './style/Modal.css';

class PopupAddCourse extends Component {
  constructor(props){
    super(props);

    this.state = {
      selected_courses: [],
    }

    this.addSelectedCourse = this.addSelectedCourse.bind(this);
    this.removeSelectedCourse = this.removeSelectedCourse.bind(this);
  }

  addSelectedCourse(course_str){
    this.state.selected_courses.push(course_str);
    this.forceUpdate();
  }

  removeSelectedCourse(course_str){
    var selected_courses = this.state.selected_courses;
    selected_courses.splice(selected_courses.indexOf(course_str), 1);
    this.state.selected_courses = selected_courses;
    this.forceUpdate();
  }

  addSelectedCourses(){

  }

  removeStagedCourses(){

  }

  editStagedCourseSequence(){

  }



  renderCoursesList(){
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
                  {this.renderCoursesList()}
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
                  <li class="modal-add-course-selected-course">
                    <div class="modal-add-course-selected-title"><span>ENGR 141</span></div>
                    <div class="modal-add-course-selected-actions">
                      <ul class="dropdown-select-small">
                        <li>
                          <div class="dropdown-header">
                            <p class="dropdown-value">2019</p><span class="arrow-down"></span>
                          </div>
                          <ul>
                            <li value="2019"><span>2019</span></li>
                            <li value="2020"><span>2020</span></li>
                            <li value="2021"><span>2021</span></li>
                          </ul>
                        </li>
                      </ul>
                      <ul class="dropdown-select-small">
                        <li class="dropdown-select-small-narrow">
                          <div class="dropdown-header">
                            <p class="dropdown-value">F</p><span class="arrow-down"></span>
                          </div>
                          <ul>
                            <li value="F"><span>F</span></li>
                            <li value="Sp"><span>Sp</span></li>
                            <li value="Su"><span>Su</span></li>
                          </ul>
                        </li>
                      </ul>
                      <div class="modal-add-course-selected-delete">
                        <img src="/assets/icons8-delete-40.png"></img>
                      </div>
                    </div>
                  </li>
                  <li class="modal-add-course-selected-separator"><hr></hr></li>
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
