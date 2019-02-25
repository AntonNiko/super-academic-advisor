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

  addCourse(semester_id, course_id, dom_create){
    //var current_course = this.props.data[this.state.sem[semester_id].current.state.courses[0][i]];
  }

  moveCourse(course_str, origin_semester_id, new_semester_id){
    // Temporarily move course DOM back to original semester for processing (needed for React to properly update DOM)
    $("#"+origin_semester_id).prepend($("#"+course_str.replace(" ","_")))

    if(!this.verifyAllCourseReqsSatisfied(course_str, origin_semester_id, new_semester_id)){
      console.log("One or more courses were invalidated...");
      return false;
    }

    if(!this.addCourse(new_semester_id, course_str, false)){

    }


    /*    if(!this.verifyAllCourseReqsSatisfied(course_str, origin_semester_id, new_semester_id)){
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

    this.removeCourse(origin_semester_id, course_str);
	return true;*/
    //console.log("moving...");
    //console.log(this.sem);
	  return true;
  }

  verifyAllCourseReqsSatisfied(course_str, origin_semester_id, new_semester_id){
    /* Method which checks that for all existing courses, all reqs are satisified
    . Commonly used after course moved, to check it does not break any other course reqs */

    // Temporarily move course in question to new position, simulate new arrangement
    this.state.sem[origin_semester_id].current.removeCourse(course_str, true);
    this.state.sem[new_semester_id].current.addCourse(course_str, true);

    var _failed = false;
    for(var semester_id in this.state.sem){
      for(var i=0; i<this.state.sem[semester_id].current.state.courses[0].length; i++){
        var course_obj = this.props.data[this.state.sem[semester_id].current.state.courses[0][i]];
        if(!this.verifyCourseRequisitesSatisfied(course_obj, semester_id)){
          _failed = true;
        }
      }
    }

    this.state.sem[new_semester_id].current.removeCourse(course_str, true);
    this.state.sem[origin_semester_id].current.addCourse(course_str, true);

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
      console.log("Requisites not satisfied!!!");
      return false;
    }
    return true;
  }

  verifyCourseReqSatisfied(course_str, semester_id, req_choice){
    var current_semester = this.state.sem[semester_id];
    if(req_choice == "p") current_semester = this.state.sem[current_semester.current.state.prev_semester];
    while(current_semester != null){
      //console.log(current_semester.current.props.courses[0]);
      if(current_semester.current.props.courses[0].includes(course_str)){
        return true;
      }
      current_semester = this.state.sem[current_semester.current.state.prev_semester];
    }

    return false;
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
