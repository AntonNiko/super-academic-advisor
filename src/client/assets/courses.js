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
    <ul class="panel-term-list" id="term-`+semester.id+`-list">
    </ul>
  </div>
  `);
}

function createCourseDOM(semester, course){
  $("#term-"+semester+"-list").append(`
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
          <span class="panel-course-prereqs">MATH 100</span>
        </div>
        <div class="panel-course-footer">
          <span class="panel-course-credits">`+course.credits+`</span>
        </div>
      </a>
    </li>
  `);
}


class Course {
  constructor(subj, course_num, credits, semesters_offered, prereqs, coreqs, blocks, exists){
    this.subj = subj;
    this.course_num = course_num;
    this.credits = credits;
    this.semesters_offered = semesters_offered; /* E.g; ["F","Sp"] */
    this.prereqs = prereqs;
    this.coreqs = coreqs;
    this.blocks = blocks;
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
    /* Adding course to existing semester. Verify valid semester */
    var current_course = courses_eng_seng[course_id];
    if(!this.verifyCourseOffered(current_course, semester_id)){
      alert("Not offered!!!!");
      return -1;
    }
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
     /* Checks that requisites satisfied, by cycling through previous semesters */
     if(!this.verifyCoursePrereqSatisfied(course, semester_id)) return false;
     /* Verify coreqs */
     if(!this.verifyCourseCoreqSatisfied(course, semester_id)) return false;
     /* Very blocks */
     return true;
   }

   verifyCoursePrereqSatisfied(course, semester_id){
     var course_prerequisites = course.prereqs;
     console.log("COURSE: "+course.subj+" "+course.course_num);

     var _found_prereq = false;
     for(var i=0; i<course_prerequisites.length; i++){
       /* Check for every set of prereqs (e.g: MATH 110 or MATH 211 and then MATh 101) */
       var current_semester = this.semesters.get(semester_id);
       current_semester = current_semester.prev_semester;

       while(current_semester != null){
         /* Cycle through OR statements of prereq (e.g: one of MATh 110 or MATH 211)*/
         for(var j=0; j<course_prerequisites[i].length; j++){
           console.log("\tPREREQ:"+current_semester.id+" :"+course_prerequisites[i][j]);
           if(current_semester.courses.has(course_prerequisites[i][j])){
             console.log("\t\tFOUND");
             _found_prereq = true;
             break;
           }
         }
         if(_found_prereq){
           _found_prereq = false;
           break;
         }
         current_semester = current_semester.prev_semester;
       }
       /* Reaching first semester and no satisfied prereq means
       one of prereqs not satisfied */
       if(current_semester == null){
         console.log("\t\tNOT FOUND");
         return false;
       }
     }
     return true;
   }

   verifyCourseCoreqSatisfied(course, semester_id){
     var course_corequisites = course.coreqs;
     var _found_coreq = false;
     for(var i=0; i<course_corequisites.length; i++){
       var current_semester = this.semesters.get(semester_id);
       console.log("\tCOREQ:"+current_semester.id+" :"+course_corequisites[i]);
       while(current_semester != null){
         if(current_semester.courses.has(course_corequisites[i])){
           console.log("\t\tFOUND");
           break;
         }
         current_semester = current_semester.prev_semester;
       }
       if(current_semester == null){
         console.log("\t\tNOT FOUND");
         return false;
       }
     }
     return true;
   }
}

var courses_eng_seng = {
  "CSC 111": new Course("CSC","111",1.5,["F","Sp"],[],[],[], false),
  "ENGR 130": new Course("ENGR","130",0.5,["F","Sp"],[],[],[], false),
  "ENGR 110": new Course("ENGR","110",2.5,["F"],[],[],[], false),
  "MATH 100": new Course("MATH","100",1.5,["F","Sp","Su"],[],[],[], false),
  "MATH 110": new Course("MATH","110",1.5,["F"],[],[],[], false),
  "PHYS 110": new Course("PHYS","110",1.5,["F","Sp"],[],[],[], false),
  "CSC 115": new Course("CSC","115",1.5,["Sp","Su","F"],[["CSC 110","CSC 111"]],[],[], false),
  "ENGR 120": new Course("ENGR","120",2.5,["Sp"],[["CSC 110","CSC 111"], ["ENGR 110"]],[],[], false),
  "ENGR 141": new Course("ENGR","141",1.5,["Sp","Su"],[["MATH 100"], ["MATH 110"]],[],[], false),
  "MATH 101": new Course("MATH","101",1.5,["Sp","Su","F"],[["MATH 100","MATH 109"]],[],[], false),
  "PHYS 111": new Course("PHYS","111",1.5,["Sp","Su"],[["MATH 100","MATH 109"], ["PHYS 110"]],[],[], false),
  "CSC 230": new Course("CSC","230",1.5,["F","Sp","Su"],[["CSC 115","CSC 116"]],[],[], false),
  "CHEM 101": new Course("CHEM","101",1.5,["F","Su"],[],[],[], false),
  "ECE 260": new Course("ECE","260",1.5,["F","Su"],[["MATH 101"], ["MATH 110","MATH 211"]],["MATH 101","ENGR 141"],[], false),
  "MATH 122": new Course("MATH","122",1.5,["F","Sp","Su"],[["MATH 100","MATH 109"]],[],[], false),
  "SENG 265": new Course("SENG","265",1.5,["F","Sp","Su"],[["CSC 115","CSC 116"]],[],[], false),
  "STAT 260": new Course("STAT","260",1.5,["F","Sp","Su"],[["MATH 101"]],[],[], false)/*
  "CSC 225": new Course("CSC","255",["CSC 115", "MATH 122"],[],[], false),
  "ECE 310": new Course("ECE","310",["ECE 260"],[],[], false),
  "ECON 180": new Course("ECON","180",["MATH 101"],[],[], false),
  "SENG 275": new Course("SENG","275",["SENG 265"],[],[], false),
  "CSC 361": new Course("CSC","361",["SENG 265", "CSC 230", "CSC 226"],[],[], false),
  "CSC 226": new Course("CSC","226",["CSC 225"],[],[], false),
  "ECE 360": new Course("ECE","360",["ECE 260"],[],[], false),
  "SENG 321": new Course("SENG","321",["SENG 265"],[],[], false),
  "SENG 371": new Course("SENG","371",["SENG 275"],[],[], false),
  "CSC 355": new Course("CSC","355",["CSC 230", "MATH 122"],[],[], false),
  "CSC 320": new Course("CSC","320",["CSC 226"],[],[], false),
  "CSC 360": new Course("CSC","360",["SENG 265", "CSC 230", "CSC 226"],[],[], false),
  "CSC 370": new Course("CSC","370",["CSC 226", "SENG 265"],[],[], false),
  "SENG 350": new Course("SENG","350",["SENG 275"],[],[], false),
  "SENG 360": new Course("SENG","360",["SENG 265"],[],[], false)*/
}
// TODO: Case of ENGR 120: Either ENGR 110 or ENGL 135 and ENGR 112
// TODO: Case of ECE 260: Either MATH 110 prereq or MATH 211 coreq

var program_sequence_seng_rec = {
  "1A":[["CSC 111","ENGR 130","ENGR 110","MATH 100","MATH 110","PHYS 110"],2018,"F"],
  "1B":[["CSC 115","ENGR 120","ENGR 141","MATH 101","PHYS 111"],2019,"Sp"],
  "1C":[[],2019,"Su"]/*,
  "2A":["CSC 230","CHEM 101","ECE 260","MATH 122","SENG 265","STAT 260"],
  "2B":[],
  "2C":["CSC 225","SENG 275"]*/
}
