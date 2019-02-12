/*
Graduate me...
- Program
- Specialization <if applicable>
- Minor <if applicable>
- Complementary Studies & Natural Science Electives
- Classes per semester
*/

function createSemesterDOM(semester){
  $("#panel-container").append(`
  <div class="panel-term" id="term-`+semester.id+`">
    <div class="panel-term-header">
      <span>`+semester.id+`</span>
      <span style="float:right;">`+semester.semester_name+` `+semester.year+`</span>
    </div>
    <ul class="panel-term-list" id="`+semester.id+`">
    </ul>
    <div class="panel-term-footer">
      <span style="float:right;">Total Credits: <span id="credit-`+semester.id+`">0</span></span>
    </div>
  </div>
  `);
}

function createCourseDOM(semester, course){
  $("#"+semester).append(`
    <li class="panel-course" id="`+course.subj+`_`+course.course_num+`">
      <a href="#">
        <div class="panel-course-header">
          <span class="panel-course-name">`+course.subj+` `+course.course_num+`</span>
          <span class="panel-course-details-icon">
            <img src="assets/icons/icons8-checkmark-24.png" style="width:80%;float:right;">
          </span>
        </div>
        <div class="panel-course-body">
          <span class="panel-course-offered">`+course.semesters_offered+`</span>
          <span class="panel-course-prereqs"></span>
        </div>
        <div class="panel-course-footer">
          <span class="panel-course-credits">`+course.credits+`</span>
        </div>
      </a>
    </li>
  `);

  // Update total credits in DOM

}


class Course {
  constructor(subj, course_num, credits, semesters_offered, reqs, blocks){
    this.subj = subj;
    this.course_num = course_num;
    this.credits = credits;
    this.semesters_offered = semesters_offered; /* E.g; ["F","Sp"] */
    this.reqs = reqs; /* e.g: [["MATH 100","MATH 109"], ["MATH 110"]] math 100 or math 109, and math 110 */
    this.blocks = blocks; /* Not possible to take if credit w/ one of these  */
    this.semester = null;
  }
}

class Semester {
  constructor(id, year, semester_name, prev_semester, next_semester){
    this.id = id;
    this.year = year;
    this.semester_name = semester_name; /* "F","Sp","Su" */
    this.prev_semester = prev_semester; /* Previous semester, even if off semester */
    this.next_semester = next_semester; /* Next semester, even if off semester */
    this.courses = new Map();
    this.max_units = 9;
    this.current_units = 0;
  }

  addCourse(course){
    // Assert course will not exceeded current units
    if(this.current_units + course.credits > this.max_units){
      alert("Too many units!!!");
      return -1;
    }
    course.semester = this.semester_name;
    this.current_units = this.current_units + course.credits;
    //console.log("credit-"+this.id);
    $("#credit-"+this.id).text(this.current_units);
    //console.log(document.getElementById("credit-"+this.id));
    this.courses.set(course.subj+" "+course.course_num, course);
  }

  removeCourse(course){
    this.courses.delete(course.subj+" "+course.course_num, course);
  }
}

class ProgramSelection {
  constructor(){
    this.semesters = new Map();
    this.last_added_semester = null;
  }

  addSemester(semester_id, semester_year, semester_name){
    var current_semester = new Semester(semester_id, semester_year, semester_name);
    if(this.last_added_semester!=null) current_semester.prev_semester = this.last_added_semester;
    this.last_added_semester = current_semester;

    this.semesters.set(current_semester.id, current_semester);
    createSemesterDOM(current_semester);
  }

  addCourse(semester_id, course_id){
    var current_course = courses_eng_seng[course_id];

    /* Assert course is offered in selected semester */
    if(!this.verifyCourseOffered(current_course, semester_id)){
      alert("Not offered!!!!");
      return -1;
    }
    /* Assert that both pre-requisites and co-requisites are satisified */
    if(!this.verifyCourseRequisitesSatisfied(current_course, semester_id)){
      alert("Requisites not satisfied!!!");
      return -2;
    }

    this.semesters.get(semester_id).addCourse(current_course)
    createCourseDOM(semester_id, current_course);
  }

  moveCourse(course, origin_semester_id, dest_semester_id){
     this.semesters.get(origin_semester_id).removeCourse(course);
     this.semesters.set(dest_semester_id).addCourse(course);
  }

  removeCourse(course, semester_id){
    this.semesters.get(semester_id).removeCourse(course);
  }

  verifyCourseOffered(course, semester_id){
    /* Checks if course offered in semester. If it is, return true.
    If not, return false */
    var semester = this.semesters.get(semester_id);
    if(course.semesters_offered.includes(semester.semester_name)){
      return true;
    }else{
      return false;
    }
  }

  verifyCourseRequisitesSatisfied(course, semester_id){
     var course_reqs =  course.reqs;
     //console.log("COURSE: "+course.subj+" "+course.course_num);
     /* [[["CSC 110","p"],["CSC 111","c"]], [["ENGR 110","p"],[["ENGR 112","ENGL 135"],"p"]]] */
     for(var i=0; i<course_reqs.length; i++){
       /* Each iteration in outer loop must satisfy reqs*/
       /* Within each iteration, only one of the conditions must be satisfied  */
       var current_req = course_reqs[i];
       /* ["ENGR 110","p"],[["ENGR 112","ENGL 135"],"p"]] */
       var _found_req = false;
       for(var j=0; j<current_req.length; j++){
         var current_course = current_req[j];
         var req_choice = current_course[1];

         if(typeof current_course[0] === 'object'){
           // Case where two or more courses must satisfy one condition
           var _found_joint_reqs = true;
           for(var k=0; k<current_course[0].length; k++){
             if(!this.verifyCourseReqSatisfied(current_course[0][k], semester_id, req_choice)){
               _found_joint_reqs = false;
             }
           }
           if(_found_joint_reqs == true) _found_req = true;

         }else if(typeof current_course[0] === 'string'){
           // Case where only 1 course involved
           if(this.verifyCourseReqSatisfied(current_course[0], semester_id, req_choice)){
             _found_req = true;
           }
         }
       }

       // If at the end of analyzing a required req, if not satisfied, return false
       if(_found_req == false){
         //console.log("Requisites not satisfied!!!");
         return false;
       }
     }
     return true;
   }

   verifyCourseReqSatisfied(course_str, semester_id, req_choice){
     var current_semester = this.semesters.get(semester_id);
     if(req_choice == "p") current_semester = current_semester.prev_semester;
     //console.log(req_choice+": "+course_str);

     while(current_semester != null){
       if(current_semester.courses.has(course_str)){
         //console.log("FOUND!!!");
         return true;
       }
       current_semester = current_semester.prev_semester;
     }
     //console.log("NOT FOUND :(");
     return false;
   }
}

var program_sequence_seng_rec = {
  "1A":[["CSC 111","ENGR 130","ENGR 110","MATH 100","MATH 110","PHYS 110"],2018,"F"],
  "1B":[["CSC 115","ENGR 120","ENGR 141","MATH 101","PHYS 111"],2019,"Sp"],
  "1C":[[],2019,"Su"]/*,
  "2A":["CSC 230","CHEM 101","ECE 260","MATH 122","SENG 265","STAT 260"],
  "2B":[],
  "2C":["CSC 225","SENG 275"]*/
}
