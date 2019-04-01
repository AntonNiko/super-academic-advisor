import React, { Component } from 'react';
import '../../style/Modal/AddCourse.css';
import '../../style/Modal.css';

class AddCourse extends Component {
  // Write method to recognize semester_id based on user input of year and semester

  constructor(props){
    super(props);

    this.state = {
      selected_unstaged_courses: [],
      selected_staged_courses: [],
      staged_courses: {},
      available_years: this.props.getCurrentAvailableYears(),
    }

    this.actionSubmitCourses = this.actionSubmitCourses.bind(this);
    this.actionSelectUnstagedCourse = this.actionSelectUnstagedCourse.bind(this);
    this.actionUnselectUnstagedCourse = this.actionUnselectUnstagedCourse.bind(this);
    this.actionStageCourses = this.actionStageCourses.bind(this);
    this.actionUnstageCourses = this.actionUnstageCourses.bind(this);
    this.actionSelectStagedCourse = this.actionSelectStagedCourse.bind(this);
    this.actionUnselectStagedCourse = this.actionUnselectStagedCourse.bind(this);
    this.actionSelectStagedCourseYear = this.actionSelectStagedCourseYear.bind(this);
    this.actionSelectStagedCourseSemester = this.actionSelectStagedCourseSemester.bind(this);
  }

  actionSubmitCourses(){
    // TODO: For each selected staged course, add to program
    // TODO: Verify course offered in right semesters
    // TODO: Verify course  not already added to program
    // TODO: Verify course does not have exceptions (E.g: ENGR 112 and ENGR 110)
    var new_staged_courses = this.state.staged_courses;

    for(var course_str in this.state.staged_courses){
      var course_year = this.state.staged_courses[course_str][0];
      var course_semester = this.state.staged_courses[course_str][1];
      var course_semester_id = this.props.convertYearAndSemesterToProgramSemesterId(course_year, course_semester);
      if(course_semester_id == null){
        alert("Semester does not exist!");
        continue;
      }
      if(this.props.addCourse(course_semester_id, course_str)){
        delete new_staged_courses[course_str];
      }
    }
    this.setState({staged_courses: new_staged_courses});
  }

  actionSelectUnstagedCourse(course_str){
    var new_selected_courses = this.state.selected_unstaged_courses;
    new_selected_courses.push(course_str);
    this.setState({selected_unstaged_courses: new_selected_courses});
  }

  actionUnselectUnstagedCourse(course_str){
    var new_selected_courses = this.state.selected_unstaged_courses;
    new_selected_courses.splice(new_selected_courses.indexOf(course_str), 1);
    this.setState({selected_unstaged_courses: new_selected_courses});
  }

  actionSelectStagedCourse(course_str){
    var new_selected_courses = this.state.selected_staged_courses;
    new_selected_courses.push(course_str);
    this.setState({selected_staged_courses: new_selected_courses});
  }

  actionUnselectStagedCourse(course_str){
    var new_staged_courses = this.state.selected_staged_courses;
    new_staged_courses.splice(new_staged_courses.indexOf(course_str), 1);
    this.setState({selected_staged_courses: new_staged_courses});
  }

  actionStageCourses(){
    // Move selected courses in position to be added to program
    var new_staged_courses = {};
    for(var i=0; i<this.state.selected_unstaged_courses.length; i++){

      if (this.state.staged_courses[this.state.selected_unstaged_courses[i]] == undefined) {
        new_staged_courses[this.state.selected_unstaged_courses[i]] = [this.props.getCurrentAvailableYears()[0], 
                                                                       this.getCourseObjectByString(this.state.selected_unstaged_courses[i])["offered"][0]];
      }
      else {
        new_staged_courses[this.state.selected_unstaged_courses[i]] = this.state.staged_courses[this.state.selected_unstaged_courses[i]];
      }
    }

    // Unselect all previously selected unstaged courses for reactiveness as well
    // as assign new staged courses
    this.setState({
      staged_courses: new_staged_courses,
      selected_unstaged_courses: []
    });
  }

  actionUnstageCourses(){
    var new_staged_courses = this.state.staged_courses;
    for(var i=0; i<this.state.selected_staged_courses.length; i++){
      delete new_staged_courses[this.state.selected_staged_courses[i]];
    }

    // Unselect all previously selected staged courses for reactiveness, as well
    // as unstageing courses
    this.setState({
      staged_courses: new_staged_courses,
      selected_staged_courses: []
    });
  }

  actionSelectStagedCourseYear(course_str, year){
    var new_staged_courses = this.state.staged_courses;
    new_staged_courses[course_str][0] = year;
    this.setState({staged_courses: new_staged_courses});
  }

  actionSelectStagedCourseSemester(course_str, semester){
    var new_staged_courses = this.state.staged_courses;
    new_staged_courses[course_str][1] = semester;
    this.setState({staged_courses: new_staged_courses});
  }

  getCourseObjectByString(course_str) {
    for (var i=0; i<this.props.data.length; i++) {
      if (this.props.data[i]["course_str"] == course_str) {
        return this.props.data[i];
      }
    }
  }

  renderCourseSelectionList(){
    var list_elements = [];

    // Sort course props into dictionary, ready to render
    var course_dir = {};
    for (var i=0; i<this.props.data.length; i++) {
      var course_subject = this.props.data[i]["course_subject"];
      var course_str = this.props.data[i]["course_str"];

      if (course_dir[course_subject] == undefined) {
        course_dir[course_subject] = [];
      }
      course_dir[course_subject].push(course_str);
    }

    /*for(var course_key in this.props.data){
      var course_obj = this.props.data[course_key];
      var course_subject = course_obj[0];


      // If subject key is undefined, create one
      if(course_dir[course_subject] == undefined){
        course_dir[course_subject] = [];
      }
      course_dir[course_subject].push(course_key);
    }*/

    // Render all list elements
    for(var course_subject in course_dir){
      list_elements.push(<li class="modal-add-course-subject"><span class="modal-chevron-collapsed"></span><span class="modal-list-title">{course_subject}</span></li>);
      var subject_courses = [];
      for(var i=0; i<course_dir[course_subject].length; i++){
        var selection_class = this.state.selected_unstaged_courses.includes(course_dir[course_subject][i]) ? "course-item-selected" : "course-item-unselected";
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
      actions_container.push(this.renderDynamicYearDropdownList());
      actions_container.push(this.renderDynamicSemesterDropdownList(course_str));
      actions_container.push(<div class="modal-add-course-selected-delete"><img src="/assets/icons8-delete-40.png"></img></div>);

      course_container.push(<div class="modal-add-course-selected-title"><span>{course_str}</span></div>);
      course_container.push(<div class="modal-add-course-selected-actions">{actions_container}</div>);

      var selection_class = this.state.selected_staged_courses.includes(course_str) ? "course-item-selected" : "course-item-unselected";
      var course_item_class = "modal-add-course-selected-course "+selection_class;
      list_elements.push(<li class={course_item_class} id={course_str.replace(" ","_")+"_staged"}>{course_container}</li>);
      list_elements.push(<li class="modal-add-course-selected-separator"><hr></hr></li>);
    }

    return list_elements;
  }

  renderDynamicYearDropdownList(){
    var available_years = this.props.getCurrentAvailableYears();
    var list_items = [];
    for(var i=0; i<available_years.length; i++){
      list_items.push(<li value={available_years[i]}><span>{available_years[i]}</span></li>)
    }

    return(
    <ul class="dropdown-select-small">
      <li>
        <div class="dropdown-header staged-course-year">
          <p class="dropdown-value">{available_years[0]}</p><span class="arrow-down"></span>
        </div>
        <ul>
          {list_items}
        </ul>
      </li>
    </ul>
    );
  }

  renderDynamicSemesterDropdownList(course_str){
    /* Generate dynamic semester dropdown list, based on specific course's semester avilability */
    var course_semesters_offered = this.getCourseObjectByString(course_str)["offered"];
    var list_items = [];
    for(var i=0; i<course_semesters_offered.length; i++){
      var semester = course_semesters_offered[i];
      list_items.push(<li value={semester}><span>{semester}</span></li>);
    }

    return (
    <ul class="dropdown-select-small">
      <li class="dropdown-select-small-narrow">
        <div class="dropdown-header staged-course-semester">
          <p class="dropdown-value">{course_semesters_offered[0]}</p><span class="arrow-down"></span>
        </div>
        <ul>
          {list_items}
        </ul>
      </li>
    </ul>);
  }

  componentDidUpdate(){
    this.props.colors.updateColorThemes();
  }

  render(){
    return (
      <div class="modal modal-opaque" id="modal-add-course">
        <div class="modal-content modal-draggable">
          <div class="modal-draggable-handle"></div>
          <span class="modal-close-button">X</span>
          <h2 class="modal-title">Add Course</h2>
          <div class="modal-subtitle">
            <h3 class="modal-subtitle-left" id="modal-course-subtitle-left"><span>To select:</span></h3>
            <h3 class="modal-subtitle-right" id="modal-course-subtitle-right"><span>Selected:</span></h3>
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
                  <button type="button" class="btn-action" id="modal-add-course-action-add">Stage</button>
                  <button type="button" class="btn-action" id="modal-add-course-action-remove">Unstage</button>
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

export default AddCourse;
