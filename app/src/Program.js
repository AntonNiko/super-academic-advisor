import React, { Component, createRef } from 'react';
import Semester from './Semester';
import logo from './logo.svg';
import $ from 'jquery';
import 'jquery-ui/ui/widgets/sortable';
import 'jquery-ui/ui/widgets/draggable';

class Program extends Component {
  constructor(props){
    super(props);

    this.sem = {};
    for(var semester_id in this.props.sequence){
      this.sem[semester_id] = createRef();
    }

    this.state = {
      sem: {},
    };

    this.moveCourse = this.moveCourse.bind(this);
  }

  createSemesters(){
    var semesters = [];
    var last_added_semester = null;

    for(var semester_id in this.props.sequence){
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

  updateCreditValues(){
    console.log("update credit 2");
  }

  moveCourse(course_str, origin_semester_id, new_semester_id){
    if(!this.verifyAllCourseReqsSatisfied(course_str, origin_semester_id, new_semester_id)){

    }
    /*if(!this.verifyAllCourseReqsSatisfied(course_str, origin_semester_id, new_semester_id)){
	  console.log("One or more courses were invalidated...");
      // Delete
      $("#"+origin_semester_id).append($("#"+course_str.replace(" ","_")));
      //console.log(this.semesters.get(origin_semester_id).courses);
      return false;
    }

	  if(!this.addCourse(new_semester_id, course_str, false)){
      $("#"+origin_semester_id).append($("#"+course_str.replace(" ","_")));
	    console.log("Could not add...");
      return false;
    }

    this.removeCourse(origin_semester_id, course_str);*/
    console.log("moving...");
    //console.log(this.sem);
	  return true;
  }

  verifyAllCourseReqsSatisfied(course_str, origin_semester_id, new_semester_id){
    /* Method which checks that for all existing courses, all reqs are satisified
    . Commonly used after course moved, to check it does not break any other course reqs */

    // Temporarily move course in question to new position, simulate new arrangement
    //var current_course = this.state.data[course_str];
    console.log(this.sem);
    //this.sem[origin_semester_id].removeCourse(course_str);

    /*var current_course = courses_eng_seng[course_str];
    this.semesters.get(origin_semester_id).removeCourse(current_course, true);
    this.semesters.get(new_semester_id).addCourse(current_course, true);

    var selection = this;
    var _failed = false;
    this.semesters.forEach(function e(semester, semester_id, map){
      for(var course_id in semester.courses){
        if(!selection.verifyCourseRequisitesSatisfied(semester.courses[course_id], semester.id)){
      console.log(semester.courses[course_id]);
          _failed = true;
        }
      }
    });
    this.semesters.get(new_semester_id).removeCourse(current_course, true);
    this.semesters.get(origin_semester_id).addCourse(current_course, true);*/
    //console.log("checking all course reqs");
  }

  componentDidMount(){
    this.setState({sem: this.sem});
  }

  render() {
    return (
      <div class="panel-container" id="panel-container">
        {this.createSemesters()}
      </div>
    );
  }
}

export default Program;
