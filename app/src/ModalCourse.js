import React, { Component } from 'react';
import './style/ModalCourse.css';
import './style/Modal.css';

class ModalCourse extends Component {
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

    this.actionPopulateCourse = this.actionPopulateCourse.bind(this);
  }

  actionPopulateCourse(course){
    this.setState({
      course_str: course[0]+" "+course[1],
      course_offered: course[3].join(", "),
			course_credits: course[2],
			course_details: course[6],
			course_link_extension: course[7],
    });
	}

	renderCourseDetails(){
		if(!["CSC 111","CSC 115","ENGR 110","ENGR 130","MATH 100"].includes(this.state.course_str)){
			return [<h3 class="modal-subsection-title">Prerequisites</h3>,
			<ul class="modal-course-reqs-content">
				<li><span>MECH 141 or ENGR 141; and</span></li>
				<li><span>CSC 110 or CSC 111; and</span></li>
				<li><span>MATH 101; and</span></li>
				<li><span>MATH 110 or MATH 211; and</span></li>
				<li><span>one of PHYS 110, PHYS 122, PHYS 120</span></li>
			</ul>,

			<h3 class="modal-subsection-title">Pre- or Co-requisites</h3>,
			<ul class="modal-course-reqs-content">
				<li><span>MATH 200 or MATH 204; or</span></li>
				<li><span>permission of the department.</span></li>
			</ul>,

			<h3 class="modal-subsection-title">Notes</h3>,
			<ul class="modal-course-reqs-content">
				<li><span>Credit will be granted for only one of MECH 242, CIVE 242</span></li>
			</ul>];
		}

		var elements = [];
		var prereq_elements = [];
		var coreq_elements = [];
		var notes_elements = [];

		if(this.state.course_details.Prerequisites != undefined){
			elements.push(<h3 class="modal-subsection-title">Prerequisites</h3>);
			// Look through prerequisites list
			for(var i=0; i<this.state.course_details.Prerequisites.length; i++){
				prereq_elements.push(<li><span>{this.state.course_details.Prerequisites[i]}</span></li>);
			}
			elements.push(<ul class="modal-list">{prereq_elements}</ul>);
		}

		if(this.state.course_details.Corequisites != undefined){
			elements.push(<h3 class="modal-subsection-title">Corequisites</h3>);
			// Look through corequisites list
			for(var i=0; i<this.state.course_details.Corequisites.length; i++){
				coreq_elements.push(<li><span>{this.state.course_details.Corequisites[i]}</span></li>);
			}
			elements.push(<ul class="modal-list">{coreq_elements}</ul>);
		}

		if(this.state.course_details.Note != undefined){
			elements.push(<h3 class="modal-subsection-title">Notes</h3>);
			// Look through notes list
			for(var i=0; i<this.state.course_details.Note.length; i++){
				notes_elements.push(<li><span>{this.state.course_details.Note[i]}</span></li>);
			}
			elements.push(<ul class="modal-list">{notes_elements}</ul>);
		}

		return elements;
	}

	renderCourseDescription(){
		// On render, check null state
		if(this.state.course_details == null){
			return <div></div>
		}

		if(this.state.course_details.Description != undefined){
			return (<p>{this.state.course_details.Description}</p>);
		}else{
			return (<p></p>);
		}
	}

	renderCourseLink(){
		return this.course_link_url + this.state.course_link_extension;
	}

	componentDidUpdate(){
    this.props.colors.updateColorThemes();
	}

  render() {
    return (
      <div id="modal-course-details" class="modal modal-opaque">
        <div id="modal-course-content" class="modal-content modal-draggable">
    	    <span class="modal-close-button">X</span>
    	    <h2 class="modal-title" id="modal-course-title">{this.state.course_str}</h2>
    	    <h2 class="modal-title" id="modal-course-desc">{["CSC 111","CSC 115","ENGR 110","ENGR 130","MATH 100"].includes(this.state.course_str) ? this.state.course_details.Title : "Course Title"}</h2>

    	    <div class="modal-subtitle">
    	      <h3 id="modal-course-subtitle-left" class="modal-subtitle-left"><span>Offered: </span><span id="modal-course-offered">{this.state.course_offered}</span></h3>
    		    <h3 id="modal-course-subtitle-right" class="modal-subtitle-right"><span>Credits: </span><span id="modal-course-credits">{this.state.course_credits}</span></h3>
    	    </div>

					<div id="modal-course-description" class="modal-text">
						{this.renderCourseDescription()}
					</div>

    	    <div class="modal-course-reqs" id="modal-course-reqs">
    	      {this.renderCourseDetails()}
    	    </div>
    	      <div id="modal-course-links" class="modal-text-footer">
    	          Course link: <a href={this.renderCourseLink()}>{this.renderCourseLink()}</a>
    	      </div>
    	      <div id="modal-course-footer" class="modal-footer">
						  <div class="modal-footer-buttons">
								<div class="form-group">
									<button type="button" class="btn-primary" id="modal-course-submit">Submit</button>
								</div>
								<div class="form-group">
									<button type="button" class="btn-danger" id="modal-course-delete">Delete</button>
								</div>
								<div class="form-group">
									<button type="button" class="btn-secondary modal-cancel-button" id="modal-course-cancel">Cancel</button>
								</div>
							</div>
    	      </div>
    	   </div>
      </div>
    );
  }
}

export default ModalCourse;
