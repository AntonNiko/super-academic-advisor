import React, { Component, createRef } from 'react';
import Semester from './Semester';
import $ from 'jquery';
import 'jquery-ui/ui/widgets/sortable';
import 'jquery-ui/ui/widgets/draggable';
import '../style/Program.css';

class Program extends Component {
  // Modify implementation of state.sequence to be used as:
  //     1) placeholder for semesters and corresponding year and semester
  //     2) first-time indicator of courses to be added. Any subsequent aciton will interact
  //        w/ each semester's methods

  constructor(props){
    super(props);

    this.sem = {};
    for(var semester_id in this.props.sequence){
      this.sem[semester_id] = createRef();
    }

    // TOP-LEVEL TRUTH SOURCE FOR COURSES. THIS.STATE.SEQUENCE DEFINES
    // ALL CURRENT COURSES, THEIR ASSOCIATED SEMESTERS. SEMESTER AND COURSE
    // COMPONENTS ARE FED BY THIS TRUTH SOURCE
    this.state = {
      sequence: this.props.sequence
    };

    this.actionAddSemester = this.actionAddSemester.bind(this);
    this.actionAddCourse = this.actionAddCourse.bind(this);
    this.actionRemoveCourse = this.actionRemoveCourse.bind(this);
    this.actionMoveCourse = this.actionMoveCourse.bind(this);
    this.convertYearAndSemesterToProgramSemesterId = this.convertYearAndSemesterToProgramSemesterId.bind(this);
    this.getCurrentAvailableYears = this.getCurrentAvailableYears.bind(this);
  }

  actionAddSemester(){
    var new_sequence_semester_ids = Object.keys(this.state.sequence);
    var new_sequence = this.state.sequence;

    var last_semester_id = new_sequence_semester_ids[new_sequence_semester_ids.length -1];
    var last_year = this.state.sequence[last_semester_id][1];
    var last_semester = this.state.sequence[last_semester_id][2];

    var next_semester_id = this.props.sequence_ids[this.props.sequence_ids.indexOf(last_semester_id)+1];
    var next_semester_info = this.getNextSemesterYearAndInitial(last_year, last_semester);
    var next_year = next_semester_info.year;
    var next_semester = next_semester_info.semester;

    // Add new semester id to state.sequence_semester_ids, and as new object in state.sequence
    new_sequence_semester_ids.push(next_semester_id);
    new_sequence[next_semester_id] = [[], next_year, next_semester];
    this.sem[next_semester_id] = createRef();
    this.setState({sequence: new_sequence, sequence_semester_ids: new_sequence_semester_ids});
  }

  actionAddCourse(semester_id, course_str, updateState = true, checkDuplicates = true){
    // Method that will allow courses to be added as a component

    // Verify course offered in semester
    if(!this.verifyCourseOffered(course_str, semester_id)){
      this.props.throwNewNotification("danger", "Error", course_str+" is not offered in semester "+semester_id);
      return false;
    }

    // If for moving courses, do not check for duplicate
    if(!this.verifyCourseIsNotDuplicate(course_str) && checkDuplicates == true){
      this.props.throwNewNotification("danger", "Error", course_str+" already exists in your selection");
      return false;
    }

    // Assert all requisites satisfied
    // TODO: Return relevant information about all requirements that were not met 
    if(!this.verifyCourseRequisitesSatisfied(this.props.data[course_str], semester_id)){
      alert("Course requisite not satisifed!!!...");
      return false;
    }

    // Assert that course will not exceed credit limit
    if(!this.verifyCourseCreditLimit(course_str, semester_id)){
      this.props.throwNewNotification("danger", "Error", "Semester "+semester_id+" max credit limit reached");
      return false;
    }

    if(updateState == true){
      this.sem[semester_id].current.addCourse(course_str, false);
    }

    this.forceUpdate();
    return true;
  }

  actionRemoveCourse(semester_id, course_str){
    // TODO: Check if removing course will invalidate pre-requisites/co-requisites of other courses
    this.sem[semester_id].current.removeCourse(course_str, false);
    this.forceUpdate();
  }

  actionMoveCourse(course_str, origin_semester_id, new_semester_id){
    // Temporarily move course DOM back to original semester for processing (needed for React to properly update DOM)
    $("#"+origin_semester_id).prepend($("#"+course_str.replace(" ","_")))

    // TODO: Return relevant information about all requirements that were not met 
    if(!this.verifyAllCourseReqsSatisfied(course_str, origin_semester_id, new_semester_id)){
      alert("One or more courses were invalidated...");
      return false;
    }

    if(!this.actionAddCourse(new_semester_id, course_str, true, false)){
      //alert("failed to add course...");
      return false;
    }
    this.sem[origin_semester_id].current.removeCourse(course_str, false);

	  return true;
  }

  verifyAllCourseReqsSatisfied(course_str, origin_semester_id, new_semester_id){
    /* Method which checks that for all existing courses, all reqs are satisified
    . Commonly used after course moved, to check it does not break any other course reqs */

    // Temporarily move course in question to new position, simulate new arrangement
    this.sem[origin_semester_id].current.removeCourse(course_str, true);
    this.sem[new_semester_id].current.addCourse(course_str, true);

    var _failed = false;
    for(var semester_id in this.sem){
      for(var i=0; i<this.sem[semester_id].current.state.courses.length; i++){
        var course_obj = this.props.data[this.sem[semester_id].current.state.courses[i]];
        if(!this.verifyCourseRequisitesSatisfied(course_obj, semester_id)){
          _failed = true;
        }
      }
    }

    this.sem[new_semester_id].current.removeCourse(course_str, true);
    this.sem[origin_semester_id].current.addCourse(course_str, true);

    if(_failed){
      return false;
    }else{
      return true;
    }
  }

  verifyCourseRequisitesSatisfied(course, semester_id){
    var course_reqs = course[4];
    /* [[["CSC 110","p"],["CSC 111","c"]], [["ENGR 110","p"],[["ENGR 112","ENGL 135"],"p"]]] */
    for(var i=0; i<course_reqs.length; i++){
      /* Each iteration in this outer loop represents a requirement that must be satisfied */
      var current_req = course_reqs[i];
      var _found_req = false;
      for(var j=0; j<current_req.length; j++){
        var current_course = current_req[j];
        var req_choice = current_course[1]; /* either p (prereq), or c (coreq) */

        // If nested condition is actually 2 or more courses, then all those courses must be present
        if(typeof current_course[0] === 'object'){
          var _found_joint_reqs = true;
          for(var k=0; k<current_course[0].length; k++){
            if(!this.verifyCourseReqSatisfied(current_course[0][k], semester_id, req_choice)){
              _found_joint_reqs = false;
            }
          }
          if(_found_joint_reqs == true) _found_req = true;
        }else if(typeof current_course[0] === 'string'){
          /* Requisite only involves 1 course */
          if(this.verifyCourseReqSatisfied(current_course[0], semester_id, req_choice)){
            _found_req = true;
          }
        }
      }
    }

    // If a required req is not satisfied, return false
    if(_found_req == false){
      return false;
    }
    return true;
  }

  verifyCourseReqSatisfied(course_str, semester_id, req_choice){
    var current_semester = this.sem[semester_id];
    if(req_choice == "p") current_semester = this.sem[current_semester.current.state.prev_semester];
    while(current_semester != null){
      if(current_semester.current.props.courses[0].includes(course_str)){
        return true;
      }
      current_semester = this.sem[current_semester.current.state.prev_semester];
    }
    return false;
  }

  verifyCourseOffered(course_str, semester_id){
    /* Checks if course offered in semester. If it is, return true.
    If not, return false */
    if(this.props.data[course_str][3].includes(this.sem[semester_id].current.props.courses[2])){
      return true;
    }else{
      return false;
    }
  }

  verifyCourseCreditLimit(course_str, semester_id){
    var course_credit = this.props.data[course_str][2];
    var semester_credit = this.sem[semester_id].current.state.current_units;
    var credit_limit = this.sem[semester_id].current.state.max_units;

    if(semester_credit + course_credit > credit_limit){
      return false;
    }else{
      return true;
    }
  }

  verifyCourseIsNotDuplicate(course_str){
    for(var semester in this.sem){
      var current_semester = this.sem[semester].current;
      var current_semester_courses = current_semester.props.courses[0];
      if(current_semester_courses.includes(course_str)){
        return false;
      }
    }
    return true;
  }

  convertYearAndSemesterToProgramSemesterId(year, semester){
    // Matches the year and semester value with an existing semester ID.
    // If does not match, return null/-1/false or something...
    console.log(year+" "+semester);
    for(var semester_id in this.state.sequence){
      var current_year = this.state.sequence[semester_id][1];
      var current_semester = this.state.sequence[semester_id][2];
      if(current_year == year && current_semester == semester){
        console.log(semester_id);
        return semester_id;
      }
    }
    return null;
  }

  getNextSemesterYearAndInitial(year, semester){
    // Takes arguments such as 2019 F, and returns the next semester
    // year and semester initial, e.g: 2020 Sp
    var new_year = year;
    var new_semester = semester;
    switch(semester){
      case "Sp":
        new_semester = "Su";
        break;
      case "Su":
        new_semester = "F";
        break;
      case "F":
        new_semester = "Sp";
        new_year+=1;
        break;
      default:
        return null;
        break;
    }
    return {year: new_year, semester: new_semester};
  }

  getCurrentAvailableYears(){
    // Returns a list of years which matches the existing years
    // added to the Program. Used by ModalAddCourse to display
    // available years user can add course
    var available_years = [];
    for(var semester_id in this.state.sequence){
      var current_year = this.state.sequence[semester_id][1];
      if(!available_years.includes(current_year)){
        available_years.push(current_year);
      }
    }
    return available_years;
  }

  renderSemesters(){
    var semesters = [];
    var last_added_semester = null;

    // Evaluate each course requisites, and adjust props accordingly
    for(var semester_id in this.state.sequence){
      semesters.push(<Semester semester_id={semester_id}
        courses={this.props.sequence[semester_id]}
        last_added_semester={last_added_semester}
        ref={this.sem[semester_id]}
        updateCreditValues={this.updateCreditValues}
        data = {this.props.data}/>);
      last_added_semester = semester_id;
    }
    return semesters;
  }

  componentDidMount(){
    this.props.updateProgramRequirements(this.sem);
  }

  componentDidUpdate(){
    // BUG: On update, moved course appears twice in list of active courses
    this.props.updateProgramRequirements(this.sem);
  }

  render() {
    return (
      <div class="panel-container" id="panel-container">
        {this.renderSemesters()}
        <div id="panel-add-semester">
          <button type="button" class="btn-action" id="add-semester-button">Add Semester</button>
        </div>
        <button id="add-course" type="button" class="btn-primary">Add Course</button>
      </div>
    );
  }
}

export default Program;
