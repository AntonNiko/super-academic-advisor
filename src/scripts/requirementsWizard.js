import React from 'react';

// Class which servers as helper to generate a list of required courses for selected
// faculties, programs, minors, and specializations
class RequirementsWizard {
    constructor(requirements_data){
        this.requirements_data = requirements_data;
        this.result_course_requirements = [];

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

    // Method which generates list of course requirements based on selected values.
    // Generates program course requirements first, then moves on to minors and
    // specializations, which are program-specific. Stores result in class
    generateCourseRequirementsBasedOnSelectedRequirements() {
        /*
        FOR ANY PROGRAM, MINOR, AND SPECIALIZATION CHOICE:
          1) ALL PROGRAM BASE REQUIREMENTS ARE SAME
          2) MINORS WILL SIMPLY ADD ON REQUIRED COURSES
          3) SPECIALIZATION MAY OVERRIDE TECHNICAL ELECTIVES IN BASIC REQUIREMENTS
        */

        // Generate basic program requirements;
        var program_required_courses = this.requirements_data["Faculty"][this.selected_faculty][this.selected_program]["required"];
        this.result_course_requirements = this.result_course_requirements.concat(program_required_courses);

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
            this.result_course_requirements = this.result_course_requirements.concat(minor_requirements);
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
            if(this.result_course_requirements[i][0] != "ELECTIVE ENG_TECH_SENG" ||
               this.result_course_requirements[i][0] == "ELECTIVE ENG_TECH_SENG" && courses_removed >=3){
                result_course_requirements.push(this.result_course_requirements[i]);
            } else {
                courses_removed++;
            }
        }

        // Append the program_specialization requirements, and reassign the updated requirements
        result_course_requirements.push(program_specialization);
        this.result_course_requirements = result_course_requirements;
    }

    handleMechanicalEngineeringSpecialization(specialization_type) {

    }

    getRequirementType(requirement) {
      /*
      Statement types:
      1) ["SUBJ XXX","OR/AND","SUBJ YYY"] / [[],"OR/AND",[]] (Conditional)
      2) [">=/</N OF",["SUBJ XXX","SUBJ YYY",...]] (Collection)
      3) [ELECTIVE CAT] (Elective)
      4) ["N CREDITS/COURSES",["SUBJ"],["100",...],["WITH"],"M CREDITS/COURSES",["100",..]]] (Quantified)
      */

      console.log(requirement);
      if (requirement.length == 3 && ["OR","AND"].includes(requirement[1])) {
        console.log("conditional");
        return "conditional";

      } else if (requirement.length == 2 && requirement[0].slice(-2) == "OF" && Array.isArray(requirement[1])) {
        console.log("collection");
        return "collection";

      } else if (requirement.length == 1 && requirement[0].slice(0,8) == "ELECTIVE"){
        console.log("elective");
        return "elective";

      } else if ((requirement[0].slice(-7) == "CREDITS" || requirement[0].slice(-7) == "COURSES") &&
            Array.isArray(requirement[1]) &&
            Array.isArray(requirement[2])) {
              console.log("quantified");
        return "quantified";

      } else if (requirement.length == 1 && requirement[0].slice(0,8) != "ELECTIVE") {
        console.log("course");
        return "course";

      } else {
        return "unrecognized";

      }
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
      return <li class="reqs-course-item"><span class="reqs-checkmark-bg"><img src={this.inactive_course_icon_link}></img></span><span class="reqs-course-name">{requirement[0]}</span></li>;
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
        requirements_list = requirements_list.concat(this.getRequirementElement(this.result_course_requirements[i]));
        requirements_list.push(<li class="reqs-course-separator"><hr></hr></li>);
      }
      /*
      for(var i=0; i<requirements.length; i++){
        // Cycle through each course requirement's elements
        for(var j=0; j<requirements[i].length; j++){
          // Represents a program requirements
          var current_course = requirements[i][j];
          if(typeof current_course == "object"){
            // If the requirements is an array, means that both courses need to be satisfied
            for(var k=0; k<current_course.length; k++){
              list_items.push(<li class="reqs-course-item"><span class="reqs-checkmark-bg"><img src={this.utilIsCourseActive(current_course[k]) ? this.active_course_icon_link : this.inactive_course_icon_link}></img></span><span class="reqs-course-name">{current_course[k]}</span></li>);
              if(k+1 != current_course.length){
                list_items.push(<li class="reqs-course-conditional"><span class="reqs-conditional-text">AND</span></li>);
              }
            }

          }else if(typeof current_course == "string"){
            // Individual course, so can simply add course item and move on
            list_items.push(<li class="reqs-course-item"><span class="reqs-checkmark-bg"><img src={this.utilIsCourseActive(current_course) ? this.active_course_icon_link : this.inactive_course_icon_link}></img></span><span class="reqs-course-name">{current_course}</span></li>);
          }

          // If we've reached the end of the individual program requirement, we can avoid placing a conditional item
          if(j+1 != requirements[i].length){
            list_items.push(<li class="reqs-course-conditional"><span class="reqs-conditional-text">OR</span></li>);
          }
        }

        list_items.push(<li class="reqs-course-separator"><hr></hr></li>);
      }
      */
      return requirements_list;
    }
}

export default RequirementsWizard;
