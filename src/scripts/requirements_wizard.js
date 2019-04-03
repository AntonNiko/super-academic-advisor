import React from 'react';

// Class which servers as helper to generate a list of required courses for selected
// faculties, programs, minors, and specializations. It also updates itself based on
// active courses, and displays what requirements have and have not been met yet.
class RequirementsWizard {
    constructor(requirements_data){
        this.requirements_data = requirements_data;
        this.result_course_requirements = [];
        this.result_course_requirements_fulfilled = {};
        this.active_courses = [];

        // Dictionary of list of courses that have been acocunted for in terms of electives (e.g: two ["ELECTIVE ENG_COMP"] in requirements)
        this.result_course_categories_fulfilled = {};

        this.inactive_course_icon_link = "/assets/icons8-delete-96.png";
        this.active_course_icon_link = "/assets/icons8-checkmark-96.png";
    }

    // Whenever user submits new set of choices, this method gets called
    // to store new choices
    setNewRequirements(faculty, program, minor, specialization) {
        this.selected_faculty = faculty;
        this.selected_program = program;
        this.selected_minor = minor;
        this.selected_specialization = specialization;
    }

    // Method which updats the list of currently active courses in the program component.
    // Used to display correct icon for requirements list, and for other method to evaluate
    // how many requirements have been met.
    updateActiveCourses(semesters) {
      var new_active_courses = [];
      for(var semester_id in semesters){
        var current_semester_courses = semesters[semester_id].current.state.courses;
        new_active_courses = new_active_courses.concat(current_semester_courses);
      }

      this.active_courses = new_active_courses;
    }

    updateFulfilledRequirements() {
      for(var i=0; i<this.result_course_requirements.length; i++) {
        var requirement = this.result_course_requirements[i][0];
        this.result_course_requirements[i][1] = this.isRequirementFulfilled(requirement);
        //.result_course_requirements_fulfilled[requirement] = this.isRequirementFulfilled(requirement);
        // TODO: FIX WITH SAME REQUIREMENT NAMES (E.G: ELECTIVE ENG_COMP)
      }
    }

    // Method which generates list of course requirements based on selected values.
    // Generates program course requirements first, then moves on to minors and
    // specializations, which are program-specific. Stores result in class
    generateCourseRequirementsBasedOnSelectedRequirements() {
        // Generate basic program requirements;
        var program_required_courses = this.requirements_data["Faculty"][this.selected_faculty][this.selected_program]["required"];

        // Add all program requirements in array with requirement and fulfilled state as elements
        for (var i=0; i<program_required_courses.length; i++) {
          this.result_course_requirements.push([program_required_courses[i], false]);
        }

        // Handle specializations/options
        if(this.selected_specialization != "None") {
            // Different program specializations have different rules to handle specializations
            // Call appropriate method for respective program
            switch(this.selected_program) {
                case "Software Engineering":
                  this.handleSoftwareEngineeringSpecialization();
                  break;
                default:
                  break;
            }
        }

        // Handle minors
        if(this.selected_minor != "None") {
            var minor_requirements = this.requirements_data["Minors"][this.selected_minor];
            for(var i=0; i<minor_requirements.length; i++) {
              this.result_course_requirements.push([minor_requirements[i], false]);
            }
        }
    }

    // Handling Software Engineering specialization according to Calendar regulations:
    // Choosing specialization means removing 3 previously non-specialization specific
    // technical electives
    // Reference: https://www.uvic.ca/engineering/software/current-students/specializations/index.php
    handleSoftwareEngineeringSpecialization(specialization_type) {
        var program_specialization = this.requirements_data["Faculty"][this.selected_faculty][this.selected_program]["specializations"][this.selected_specialization];

        // Remove 3 entries of "ELECTIVE ENG_TECH_SENG" from current course_requirements
        var result_course_requirements = [];
        var courses_removed = 0;
        for(var i=0; i<this.result_course_requirements.length; i++) {
            if(this.result_course_requirements[i][0][0] != "ELECTIVE ENG_TECH_SENG" ||
               this.result_course_requirements[i][0][0] == "ELECTIVE ENG_TECH_SENG" && courses_removed >=3){
                // Add requirement and initial fulfilled state to array
                result_course_requirements.push([this.result_course_requirements[i][0], false]);
            } else {
                courses_removed++;
            }
        }

        // Append the program_specialization requirements with requirement and initial state,
        // and reassign the updated requirements
        for (var i=0; i < program_specialization.length; i++) {
          result_course_requirements.push([program_specialization[i], false]);
        }

        this.result_course_requirements = result_course_requirements;
    }

    handleMechanicalEngineeringSpecialization(specialization_type) {

    }

    utilIsCourseActive(course_str){
      if(this.active_courses.includes(course_str)){
        return true;
      }else{
        return false;
      }
    }

    getRequirementElementIconLink(requirement) {
      if(this.result_course_requirements_fulfilled[requirement] == true) {
        return this.active_course_icon_link;
      } else {
        return this.inactive_course_icon_link;
      }
    }

    getRequirementType(requirement) {
      /*
      Statement types:
      1) ["SUBJ XXX","OR/AND","SUBJ YYY"] / [[],"OR/AND",[]] (Conditional)
      2) [">=/</N OF",["SUBJ XXX","SUBJ YYY",...]] (Collection)
      3) [ELECTIVE CAT] (Elective)
      4) ["N CREDITS/COURSES",["SUBJ"],["100",...],["WITH"],"M CREDITS/COURSES",["100",..]]] (Quantified)
      */

      if (requirement.length == 3 && ["OR","AND"].includes(requirement[1])) {
        return "conditional";

      } else if (requirement.length == 2 && requirement[0].slice(-2) == "OF" && Array.isArray(requirement[1])) {
        return "collection";

      } else if (requirement.length == 1 && requirement[0].slice(0,8) == "ELECTIVE"){
        return "elective";

      } else if ((requirement[0].slice(-7) == "CREDITS" || requirement[0].slice(-7) == "COURSES") &&
            Array.isArray(requirement[1]) &&
            Array.isArray(requirement[2])) {
        return "quantified";

      } else if (requirement.length == 1 && requirement[0].slice(0,8) != "ELECTIVE") {
        return "course";

      } else {
        return "unrecognized";

      }
    }

    getConditionalRequirementFulfilledState(requirement) {
      var fulfilled = false;

      var fulfilled_first_element = this.getRequirementFulfilledState(requirement[0]);
      var fulfilled_second_element = this.getRequirementFulfilledState(requirement[2]);

      var conditional_token = requirement[1];
      if (conditional_token == "AND" && fulfilled_first_element && fulfilled_second_element) {
        return true;
      } else if (conditional_token == "OR" && (fulfilled_first_element || fulfilled_second_element)) {
        return true;
      } else {
        return false;
      }
    }

    getCollectionRequirementFulfilledState(requirement) {

      // Track how many requirements of collection are fulfilled
      var requirements_fulfilled = 0;
      for(var i=0; i<requirement[1].length; i++) {
        if (this.getRequirementFulfilledState(requirement[1][i])) {
          requirements_fulfilled++;
        }
      }

      // Depending on condition (>=/=), determine if requirement fulfilled
      var condition_limit = parseInt(requirement[0].match(/\d+/));
      if (requirement[0].slice(0,2) == ">=" && requirements_fulfilled >= condition_limit) {
        return true;
      } else if (requirement[0].slice(0,1) == "=" && requirements_fulfilled >= condition_limit) {
        // Even if more requirements fulfilled, returns true
        return true;
      } else {
        return false;
      }
    }

    getElectiveRequirementFulfilledState(requirement) {

      // Get elective type, to use for look up in requirements data
      var elective_type = requirement[0].slice(9);

      // If elective type index not accounted for in class variable, assign it
      //if (this.result_course_categories_fulfilled[elective_type] == undefined) {
      //  this.result_course_categories_fulfilled[elective_type] = [];
      //}

      // TODO: Ensure that in fulfilling requirement of one elective, does not only get stuck on same requirement
      var elective_type_courses = this.requirements_data["Electives"][elective_type]["Courses"];
      for (var i=0; i<this.active_courses.length; i++) {
        var course = [this.active_courses[i]];
        if (elective_type_courses.includes(course) && !this.result_course_categories_fulfilled[elective_type].includes(course)) {
          // If a new unaccounted for course shows up, then add it to accounted for list of courses
          this.result_course_categories_fulfilled[elective_type].push(course);
          return true;
        }
      }

      // If no unaccounted active courses fulfill requirement, return corresponding result
      return false;
    }

    // TODO: COMPLETE METHOD
    getQuantifiedRequirementFulfilledState(requirement) {
      return false;
    }

    getCourseRequirementFulfilledState(requirement) {
      if (this.active_courses.includes(requirement[0])) {
        return true;
      } else {
        return false;
      }
    }

    getRequirementFulfilledState(requirement) {
      switch(this.getRequirementType(requirement)) {
        case "conditional":
          return this.getConditionalRequirementFulfilledState(requirement);
        case "collection":
          return this.getCollectionRequirementFulfilledState(requirement);
        case "elective":
          return this.getElectiveRequirementFulfilledState(requirement);
        case "quantified":
          return this.getQuantifiedRequirementFulfilledState(requirement);
        case "course":
          return this.getCourseRequirementFulfilledState(requirement);
        default:
          return null;
      }
    }

    isRequirementFulfilled(requirement) {
      return this.getRequirementFulfilledState(requirement);
    }

    getConditionalRequirementElement(requirement) {
      var requirement_list = [];

      // Get jsx element of first element
      requirement_list = requirement_list.concat(this.getRequirementElement(requirement[0]));
      // Add conitional element
      requirement_list.push(<li class="reqs-course-conditional"><span class="reqs-conditional-text">{requirement[1]}</span></li>)
      // Get jsx element of third element
      requirement_list = requirement_list.concat(this.getRequirementElement(requirement[2]));

      return requirement_list;
    }

    getCollectionRequirementElement(requirement) {
      var requirement_list = [];

      // Handle first part of requirement (i.e >=/ N of...)
      if(requirement[0].match(/>=\d+/)) {
        var collection_limit = parseInt(requirement[0].match(/\d+/));
        requirement_list.push(<li class="reqs-course-conditional"><span class="reqs-conditional-text">{collection_limit} OR MORE OF:</span></li>);
      } else if (requirement[0].match(/\d+/)) {
        var collection_number = parseInt(requirement[0].match(/\d+/));
        requirement_list.push(<li class="reqs-course-conditional"><span class="reqs-conditional-text">{collection_number} OF:</span></li>);
      }

      // Get requirement element for all elements of second part of requirement
      for(var i=0; i<requirement[1].length; i++) {
        requirement_list = requirement_list.concat(this.getRequirementElement(requirement[1][i]));
      }

      return requirement_list;
    }

    getElectiveRequirementElement(requirement) {
      var elective_type = requirement[0].slice(9);
      var elective_abbreviation = this.requirements_data["Electives"][elective_type]["Abbreviation"];

      return <li class="reqs-course-item"><span class="reqs-checkmark-bg"><img src={this.inactive_course_icon_link}></img></span><span class="reqs-course-name">{elective_abbreviation}</span></li>;
    }

    // TODO: COMPLETE METHOD
    getQuantifiedRequirementElement(requirement) {
      var requirement_list = [];

      var primary_requirement_type = requirement[0].match(/CREDITS/) != null ? "CREDITS" : "COURSES";
      var requirement_number = parseInt(requirement[0].match(/\d+/));

      // TODO: MANAGE SECOND PART OF REQUIREMENT OF QUANTIFIED REQUIREMENT
      return (
        <li class="reqs-course-item">
          <span class="reqs-checkmark-bg">
            <img src={this.inactive_course_icon_link}></img></span><span class="reqs-course-name">{requirement_number} {primary_requirement_type}
          </span>
        </li>
      );
    }

    getCourseRequirementElement(requirement) {
      return <li class="reqs-course-item"><span class="reqs-checkmark-bg"><img src={this.active_courses.includes(requirement[0]) ? this.active_course_icon_link : this.inactive_course_icon_link}></img></span><span class="reqs-course-name">{requirement[0]}</span></li>;
    }

    getRequirementElement(requirement) {
      switch(this.getRequirementType(requirement)) {
        case "conditional":
          return this.getConditionalRequirementElement(requirement);
        case "collection":
          return this.getCollectionRequirementElement(requirement);
        case "elective":
          return this.getElectiveRequirementElement(requirement);
        case "quantified":
          return this.getQuantifiedRequirementElement(requirement);
        case "course":
          return this.getCourseRequirementElement(requirement);
        default:
          return null;
      }
    }

    // This method is called from Requirements component, and is used to convert the
    // various course requirement formats into readable html elements to be rendered
    getGeneratedCourseRequirementsList() {
      var requirements_list = [];
      for(var i=0; i<this.result_course_requirements.length; i++) {
        requirements_list = requirements_list.concat(
          <div class={this.result_course_requirements[i][1] == true ? "fulfilled" : ""}>
            {this.getRequirementElement(this.result_course_requirements[i][0], true)}
          </div>
        );

        requirements_list.push(<li class="reqs-course-separator"><hr></hr></li>);
      }

      return requirements_list;
    }
}

export default RequirementsWizard;
