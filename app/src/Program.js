import React, { Component } from 'react';
import Semester from './Semester';
import logo from './logo.svg';
import $ from 'jquery';
import 'jquery-ui/ui/widgets/sortable'; 
import 'jquery-ui/ui/widgets/draggable'; 

class Program extends Component {
  constructor(props){
    super(props);
    this.state = {
      sequence : this.props.program_sequence,
      data: null,
    };

    const request = async() => {
      const response = await fetch("course_dir.json");
      const json = await response.json();
      const result = await this.setState({data: json});
    }
    request();
  }

  createSemesters(){
    var semesters = [];
    var last_added_semester = null;

    for(var semester_id in this.state.sequence){
      semesters.push(<Semester semester_id={semester_id} courses={this.state.sequence[semester_id]} last_added_semester={last_added_semester} ref={sem => {this.sem = sem;}}/>);
      last_added_semester = semester_id;
    }
    return semesters;
  }

  moveCourse(course_str, origin_semester_id, new_semester_id){
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
	  return true;
  }

  verifyAllCourseReqsSatisfied(course_str, origin_semester_id, new_semester_id){
    /* Method which checks that for all existing courses, all reqs are satisified
    . Commonly used after course moved, to check it does not break any other course reqs */

    // Temporarily move course in question to new position, simulate new arrangement
    var current_course = this.state[course_str];
    /*this.semesters.get(origin_semester_id).removeCourse(current_course, true);
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
    this.semesters.get(origin_semester_id).addCourse(current_course, true);
  
    console.log("__________");
    if(_failed){
      return false;
    }else{
      return true;
    }*/
    return true;
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
