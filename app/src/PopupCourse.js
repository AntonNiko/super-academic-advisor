import React, { Component } from 'react';
import logo from './logo.svg';
import './style/PopupCourse.css';

class PopupCourse extends Component {
  constructor(props){
    super(props);

    this.state = {
      course_str: null,
      course_title: null,
      course_offered: null,
      course_credits: null,
			course_link: null,
			course_details: null,
		}
		
		this.course_link_url = "https://web.uvic.ca/calendar2019-05/CDs/";

    this.populateCourse = this.populateCourse.bind(this);
  }

  populateCourse(course){
		console.log(course);
    this.setState({
      course_str: course[0]+" "+course[1],
      course_offered: course[3].join(", "),
			course_credits: course[2],
			course_details: course[6],
			course_link_extension: course[7],
    });
	}
	
	renderCourseDetails(){
		var elements = [];


		// TEMPORARY: ONLY FOR CSC 115 (TEST)
		if(this.state.course_str != "CSC 115"){
			return [<h3 id="modal-course-reqs-title">Prerequisites</h3>,
			<ul id="modal-course-reqs-content">
				<li><span>MECH 141 or ENGR 141; and</span></li>
				<li><span>CSC 110 or CSC 111; and</span></li>
				<li><span>MATH 101; and</span></li>
				<li><span>MATH 110 or MATH 211; and</span></li>
				<li><span>one of PHYS 110, PHYS 122, PHYS 120</span></li>
			</ul>,

			<h3 class="modal-course-reqs-title">Pre- or Co-requisites</h3>,
			<ul class="modal-course-reqs-content">
				<li><span>MATH 200 or MATH 204; or</span></li>
				<li><span>permission of the department.</span></li>
			</ul>,

			<h3 class="modal-course-reqs-title">Notes</h3>,
			<ul class="modal-course-reqs-content">
				<li><span>Credit will be granted for only one of MECH 242, CIVE 242</span></li>
			</ul>];
		}


		
		if(this.state.course_details.Prerequisites != undefined){
			elements.push(<h3 id="modal-course-reqs-title">Prerequisites</h3>);
			// Look through prerequisites list
			for(var i=0; i<this.state.course_details.Prerequisites.length; i++){
				elements.push(<li><span>{this.state.course_details.Prerequisites[i]}</span></li>);
			}
		}

		if(this.state.course_details.Corequisites != undefined){
			elements.push(<h3 class="modal-course-reqs-title">Corequisites</h3>);
			// Look through corequisites list
			for(var i=0; i<this.state.course_details.Corequisites.length; i++){
				elements.push(<li><span>{this.state.course_details.Corequisites[i]}</span></li>);
			}	
		}

		if(this.state.course_details.Note != undefined){
			elements.push(<h3 class="modal-course-reqs-title">Notes</h3>);
			// Look through notes list
			elements.push(<ul class="modal-course-reqs-content"></ul>);
			for(var i=0; i<this.state.course_details.Note.length; i++){
				elements.push(<li><span>{this.state.course_details.Note[i]}</span></li>);
			}
		}

		return elements;
	}

	renderCourseLink(){
		return this.course_link_url + this.state.course_link_extension;
	}

  render() {
    return (
      <div id="modal-course-details">
        <div id="modal-course-content">
    	    <span id="close-btn">X</span>
    	    <h2 class="modal-course-title" id="modal-course-title">{this.state.course_str}</h2>
    	    <h2 class="modal-course-title" id="modal-course-desc">{this.state.course_str == "CSC 115" ? this.state.course_details.Title : "Course Title"}</h2>

    	    <div id="modal-course-subtitle">
    	      <h3 id="modal-course-subtitle-left"><span>Offered: </span><span id="modal-course-offered">{this.state.course_offered}</span></h3>
    		    <h3 id="modal-course-subtitle-right"><span>Credits: </span><span id="modal-course-credits">{this.state.course_credits}</span></h3>
    	    </div>

    	    <div class="modal-course-reqs" id="modal-course-reqs">
    	      {this.renderCourseDetails()}
    	    </div>
    	      <div id="modal-course-links">
    	          Course link: <a href={this.renderCourseLink()}>{this.renderCourseLink()}</a>
    	      </div>
    	      <div id="modal-course-footer">
              <div class="form-group">
                <button type="button" class="btn-primary" id="modal-course-submit">Submit</button>
              </div>
              <div class="form-group">
                <button type="button" class="btn-secondary" id="modal-course-cancel">Cancel</button>
              </div>
    	      </div>
    	   </div>
      </div>
    );
  }
}

export default PopupCourse;
