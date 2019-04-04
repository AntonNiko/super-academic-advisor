import $ from 'jquery';
import 'jquery-ui/ui/widgets/sortable';
import 'jquery-ui/ui/widgets/draggable';
import '../style/Program.css';
import React, { Component, createRef } from 'react';
import Semester from './Semester';

class Program extends Component {
  // Modify implementation of state.sequence to be used as:
  //     1) placeholder for semesters and corresponding year and semester
  //     2) first-time indicator of courses to be added. Any subsequent aciton will interact
  //        w/ each semester's methods

  constructor(props){
    super(props);

    this.sem = {};
    for (var semester_id in this.props.sequence) {
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

  actionAddSemester() {
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

  actionAddCourse(semester_id, course_str, updateState = true, checkDuplicates = true) {
    // Method that will allow courses to be added as a component

    // Verify course offered in semester
    if (!this.verifyCourseOffered(course_str, semester_id)) {
      this.props.throwNewNotification("danger", "Error", course_str+" is not offered in semester "+semester_id);
      return false;
    }

    // If for moving courses, do not check for duplicate
    if (!this.verifyCourseIsNotDuplicate(course_str) && checkDuplicates == true) {
      this.props.throwNewNotification("danger", "Error", course_str+" already exists in your selection");
      return false;
    }

    // TODO: Verify exceptions

    // Assert all requisites satisfied
    var fulfilled = true;
    var course_obj = this.getCourseObjectByString(course_str);
    for (var i=0; i<course_obj["requisites"].length; i++) {
      if (!this.isRequisiteSatisfied(course_obj["requisites"][i], semester_id, true)) {
        return false;
      }
    }

    // Assert that course will not exceed credit limit
    if (!this.verifyCourseCreditLimit(course_str, semester_id)) {
      this.props.throwNewNotification("danger", "Error", "Semester "+semester_id+" max credit limit reached");
      return false;
    }

    if (updateState == true) {
      this.sem[semester_id].current.addCourse(course_str, false);
    }

    this.forceUpdate();
    return true;
  }

  actionRemoveCourse(semester_id, course_str) {
    // Checks if removing course will invalidate other courses' requisites
    if (!this.verifyAllCourseReqsSatisifedRemoved(course_str, semester_id)) {
      return false;
    }

    this.sem[semester_id].current.removeCourse(course_str, false);
    this.forceUpdate();
  }

  actionMoveCourse(course_str, origin_semester_id, new_semester_id) {
    // Temporarily move course DOM back to original semester for processing (needed for React to properly update DOM)
    $("#"+origin_semester_id).prepend($("#"+course_str.replace(" ","_")))

    // TODO: Return relevant information about all requirements that were not met
    if (!this.verifyAllCourseReqsSatisfied(course_str, origin_semester_id, new_semester_id)) {
      return false;
    }

    if (!this.actionAddCourse(new_semester_id, course_str, true, false)) {
      //alert("failed to add course...");
      return false;
    }

    this.sem[origin_semester_id].current.removeCourse(course_str, false);
	  return true;
  }

  getRequisiteType(requisite) {
    /*
    Requisite types:
    1) ["SUBJ XXX","OR/AND","SUBJ YYY"] / [[],"OR/AND",[]] (Conditional)
    2) [">=/</N OF",["SUBJ XXX","SUBJ YYY",...]] (Collection)
    4) ["N CREDITS/COURSES",["SUBJ"],["100",...],["WITH"],"M CREDITS/COURSES",["100",..]]] (Quantified)
    */

    if (requisite.length == 3 && ["OR","AND"].includes(requisite[1])) {
      return "conditional";
    } else if (requisite.length == 2 && requisite[0].slice(-2) == "OF" && Array.isArray(requisite[1])) {
      return "collection";
    } else if (requisite.length == 2 && requisite[0].slice(0,8) != "ELECTIVE" && ["p","c"].includes(requisite[1])) {
      return "course";
    } else {
      return "unrecognized";
    }
  }

  getConditionalRequisiteFulfilledState(requisite, semester_id, displayError) {
    var fulfilled = false;
    var conditional_token = requisite[1];
    var fulfilled_first_element = this.isRequisiteSatisfied(requisite[0], semester_id);
    var fulfilled_second_element = this.isRequisiteSatisfied(requisite[2], semester_id);

    if (conditional_token == "AND") {
      if (fulfilled_first_element && fulfilled_second_element) {
        return true;
      } else {
        if (displayError) {
          this.props.throwNewNotification("danger", "Error", "Requisite not satisfied - "+requisite);
        }

        return false;
      }
    } else if (conditional_token == "OR") {
      if (fulfilled_first_element || fulfilled_second_element ) {
        return true;
      } else {
        if (displayError) {
          this.props.throwNewNotification("danger", "Error", "Requisite not satisfied - "+requisite);
        }

        return false;
      }
    } else {
      return null;
    }
  }

  getCollectionRequisiteFulfilledState(requisite, semester_id, displayError) {
    // Track how many requisites fulfilled
    var requisites_fulfilled = 0;
    for (var i=0; i < requisite[1].length; i++) {
      if (this.isRequisiteSatisfied(requisite[1][i], semester_id)) {
        requisites_fulfilled++;
      }
    }

    // Depending on condition, determine if requirmeent fulfilled
    var condition_limit = parseInt(requisite[0].match(/\d+/));
    if (requisite[0].slice(0,2) == ">=") {
      if (requisites_fulfilled >= condition_limit) {
        return true;
      } else {
        if (displayError) {
          this.props.throwNewNotification("danger", "Error", "Requisite not satisfied - "+requisite);
        }

        return false;
      }
    } else if (requisite[0].slice(0,1) == "=") {
      if (requisites_fulfilled >= condition_limit) {
        return true;
      } else {
        if (displayError) {
          this.props.throwNewNotification("danger", "Error", "Requisite not satisfied - "+requisite);
        }

        return false;
      }
    }
  }

  getCourseRequisiteFulfilledState(requisite, semester_id, displayError) {
    var current_semester = this.sem[semester_id];

    // If prerequisite, we start at previous semester to check for course
    if (requisite[1] == "p") {
      current_semester = this.sem[current_semester.current.state.prev_semester];
    }

    // Loop through each consecutive previous semesters to check for course
    while (current_semester != null) {
      if (current_semester.current.courses.includes(requisite[0])) {
        return true;
      }

      current_semester = this.sem[current_semester.current.state.prev_semester];
    }

    if (displayError) {
      this.props.throwNewNotification("danger", "Error", "Requisite not satisfied - "+requisite);
    }

    return false;
  }

  isRequisiteSatisfied(requisite, semester_id, displayError = false, course_str = null) {
    switch (this.getRequisiteType(requisite)) {
      case "conditional":
        return this.getConditionalRequisiteFulfilledState(requisite, semester_id, displayError, course_str);
      case "collection":
        return this.getCollectionRequisiteFulfilledState(requisite, semester_id, displayError, course_str);
      case "course":
        return this.getCourseRequisiteFulfilledState(requisite, semester_id, displayError, course_str);
      default:
        return null;
    }
  }

  verifyAllCourseReqsSatisfied(course_str, origin_semester_id, new_semester_id) {
    /* Method which checks that for all existing courses, all reqs are satisified
    . Commonly used after course moved, to check it does not break any other course reqs */

    // Temporarily move course in question to new position, simulate new arrangement
    this.sem[origin_semester_id].current.removeCourse(course_str, true);
    this.sem[new_semester_id].current.addCourse(course_str, true);

    var _failed = false;
    for (var semester_id in this.sem) {
      for (var i=0; i<this.sem[semester_id].current.courses.length; i++) {
        var course_obj = this.getCourseObjectByString(this.sem[semester_id].current.courses[i], semester_id);

        for (var j=0; j<course_obj["requisites"].length; j++) {
          if (!this.isRequisiteSatisfied(course_obj["requisites"][j], semester_id, true)) {
            _failed = true;
          }
        }
      }
    }

    this.sem[new_semester_id].current.removeCourse(course_str, true);
    this.sem[origin_semester_id].current.addCourse(course_str, true);

    if (_failed) {
      return false;
    } else {
      return true;
    }
  }

  verifyAllCourseReqsSatisifedRemoved(course_str, course_semester_id) {
    /* Method which checks if deleting a course from specific semester will cause other courses' requisites to be invalidated
     */

     this.sem[course_semester_id].current.removeCourse(course_str, true);

     var _failed = false;
     for (var semester_id in this.sem) {
       for (var i=0; i<this.sem[semester_id].current.courses.length; i++) {
         var course_obj = this.getCourseObjectByString(this.sem[semester_id].current.courses[i], semester_id);

         for (var j=0; j<course_obj["requisites"].length; j++) {
           if (!this.isRequisiteSatisfied(course_obj["requisites"][j], semester_id, true)) {
             _failed = true;
           }
         }
       }
     }

     this.sem[course_semester_id].current.addCourse(course_str, true);

     if (_failed) {
       return false;
     } else {
       return true;
     }
  }

  verifyCourseOffered(course_str, semester_id) {
    /* Checks if course offered in semester. If it is, return true.
    If not, return false */
    if (this.getCourseObjectByString(course_str)["offered"].includes(this.sem[semester_id].current.props.courses[2])) {
      return true;
    } else {
      return false;
    }
  }

  verifyCourseCreditLimit(course_str, semester_id) {
    var course_credit = this.getCourseObjectByString(course_str)["credits"];
    var semester_credit = this.sem[semester_id].current.state.current_units;
    var credit_limit = this.sem[semester_id].current.state.max_units;

    if (semester_credit + course_credit > credit_limit) {
      return false;
    } else {
      return true;
    }
  }

  verifyCourseIsNotDuplicate(course_str) {
    for (var semester in this.sem) {
      var current_semester = this.sem[semester].current;
      var current_semester_courses = current_semester.courses;

      if (current_semester_courses.includes(course_str)) {
        return false;
      }
    }
    return true;
  }

  convertYearAndSemesterToProgramSemesterId(year, semester) {
    // Matches the year and semester value with an existing semester ID.
    // If does not match, return null/-1/false or something...
    for (var semester_id in this.state.sequence) {
      var current_year = this.state.sequence[semester_id][1];
      var current_semester = this.state.sequence[semester_id][2];

      if (current_year == year && current_semester == semester) {
        return semester_id;
      }
    }
    return null;
  }

  getNextSemesterYearAndInitial(year, semester) {
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
    }

    return {year: new_year, semester: new_semester};
  }

  getCurrentAvailableYears() {
    // Returns a list of years which matches the existing years
    // added to the Program. Used by ModalAddCourse to display
    // available years user can add course
    var available_years = [];

    for (var semester_id in this.state.sequence) {
      var current_year = this.state.sequence[semester_id][1];
      if (!available_years.includes(current_year)) {
        available_years.push(current_year);
      }
    }

    return available_years;
  }

  getCourseObjectByString(course_str) {
    for (var i=0; i<this.props.data.length; i++) {
      if (this.props.data[i]["course_str"] == course_str) {
        return this.props.data[i];
      }
    }
  }

  renderSemesters() {
    var semesters = [];
    var last_added_semester = null;

    // Evaluate each course requisites, and adjust props accordingly
    for (var semester_id in this.state.sequence) {
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

  componentDidMount() {
    // After all semesters mounted, add every course
    for (var semester_id in this.props.sequence) {
      for (var j=0; j<this.props.sequence[semester_id][0].length; j++) {
        var course_str = this.props.sequence[semester_id][0][j];
        this.actionAddCourse(semester_id, course_str);
      }
    }

    this.props.updateProgramRequirements(this.sem);
  }

  componentDidUpdate() {
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
