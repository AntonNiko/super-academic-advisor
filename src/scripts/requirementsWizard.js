import React from 'react';

// Class which servers as helper to generate a list of required courses for selected
// faculties, programs, minors, and specializations
class RequirementsWizard {
    constructor(requirements_data){
        this.requirements_data = requirements_data;
        this.result_course_requirements = [];
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
        Challenge:
          Program requirements are composed of individual requirements. These individual
          requirements are defined in several ways:
           1) [SUBJ XXX] AND [SUBJ YYY]  (And conditional)
           2) [SUBJ XXX] OR [SUBJ YYY] (Or conditional)
           3) N of ([SUBJ 111],[SUBJ 222],...) (Exact number N of specific collection of courses)
           4) >=N of ([SUBJ 111],[SUBJ 222],...) (Bounds of N number of courses collection)
           5) [ELECTIVE CAT] (Elective course, based on specific category (CAT))
           6) [CRED/N [SUBJ1 OR/AND SUBJ2 ...]  LEVEL WITH CRED_SUB LEVEL] (CRED credits or N courses with minimum of SUBJ(s), and optional LEVEL (i.e 100/200/300/400))
        To implement first: 1), 2), 3), 4), 5)


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
            this.result_course_requirements.push(minor_requirements);
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
      2) [">=/</N OF",["SUBJ XXX","SUBJ YYY",...]] (Conditional collection)
      3) [ELECTIVE CAT] (Elective)
      4) ["N CREDITS/COURSES",["SUBJ"],["100",...],["WITH"],"M CREDITS/COURSES",["100",..]]] (Credit/course quantified)
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

    getConditionalRequirementElement(requirement) {
      console.log(requirement);
      var requirement_list = [];


      // Get jsx element of first element

      // Add conitional element
      requirement_list.push(<li class="reqs-course-conditional"><span class="reqs-conditional-text">{requirement[1]}</span></li>)

      // Get jsx element of third element
    }

    getCollectionRequirementElement(requirement) {
      console.log(requirement);
    }

    getElectiveRequirementElement(requirement) {
      console.log(requirement);
    }

    getQuantifiedRequirementElement(requirement) {
      console.log(requirement);
    }

    getCourseRequirementElement(requirement) {
      return <li class="reqs-course-item"><span class="reqs-checkmark-bg"><img src=""></img></span><span class="reqs-course-name">{requirement[0]}</span></li>;
    }

    // This method is called from Requirements component, and is used to convert the
    // various course requirement formats into readable html elements to be rendered
    getGeneratedCourseRequirementsList() {
      var requirements_list = [];

      for(var i=0; i<this.result_course_requirements.length; i++) {
        var requirement = this.result_course_requirements[i];
        switch(this.getRequirementType(requirement)) {
          case "conditional":
            this.getConditionalRequirementElement(requirement);
            break;
          case "collection":
            this.getCollectionRequirementElement(requirement);
            break;
          case "elective":
            this.getElectiveRequirementElement(requirement);
            break;
          case "quantified":
            this.getQuantifiedRequirementElement(requirement);
            break;
          case "course":
            this.getCourseRequirementElement(requirement);
            break;
          default:
            break;
        }

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
