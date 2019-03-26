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

        console.log(this.result_course_requirements);
    }

    getGeneratedCourseRequirements() {
        return [];
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

    // This method is called from Requirements component, and is used to convert the 
    // various course requirement formats into readable html elements to be rendered
    renderGeneratedCourseRequirementsList() {

    }
}

export default RequirementsWizard;