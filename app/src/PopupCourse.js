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
    }

    this.populateCourse = this.populateCourse.bind(this);
  }

  populateCourse(course){
    this.setState({
      course_str: course[0]+" "+course[1],
      course_offered: course[3].join(", "),
      course_credits: course[2],
    });
  }

  render() {
    return (
      <div class="modal-course-details" id="modal">
        <div class="modal-course-details-content" id="modal-content">
    	    <span class="close" id="close-btn">X</span>
    	    <h2 class="modal-title" id="modal-course-title">{this.state.course_str}</h2>
    	    <h2 class="modal-title" id="mocal-course-desc">Dynamics</h2>

    	    <div class="modal-subtitle">
    	      <h3 class="modal-subtitle-left"><span>Offered: </span><span id="modal-course-offered">{this.state.course_offered}</span></h3>
    		    <h3 class="modal-subtitle-right"><span>Credits: </span><span id="modal-course-credits">{this.state.course_credits}</span></h3>
    	    </div>

    	    <div class="modal-course-reqs" id="modal-course-reqs">
    	      <h3 class="modal-course-reqs-title">Prerequisites</h3>
    		    <ul class="modal-course-reqs-content">
    	        <li><span>MECH 141 or ENGR 141; and</span></li>
    		      <li><span>CSC 110 or CSC 111; and</span></li>
    		      <li><span>MATH 101; and</span></li>
    		      <li><span>MATH 110 or MATH 211; and</span></li>
    		      <li><span>one of PHYS 110, PHYS 122, PHYS 120</span></li>
    		    </ul>

    	      <h3 class="modal-course-reqs-title">Pre- or Co-requisites</h3>
    		    <ul class="modal-course-reqs-content">
    	        <li><span>MATH 200 or MATH 204; or</span></li>
    		      <li><span>permission of the department.</span></li>
    		    </ul>

    	      <h3 class="modal-course-reqs-title">Notes</h3>
    		    <ul class="modal-course-reqs-content">
    	        <li><span>Credit will be granted for only one of MECH 242, CIVE 242</span></li>
    		    </ul>

    	      </div>
    	      <div class="modal-course-links">
    	          Course link: <a href="https://web.uvic.ca/calendar2019-05/CDs/MECH/242.html">https://web.uvic.ca/calendar2019-05/CDs/MECH/242.html</a>
    	      </div>
    	      <div class="modal-footer">
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
