/* Create Program Selection */



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

/* Create Program Selection, representing user choices */
var program = new ProgramSelection();

function addSemester(semester_id, semester_year, semester_name){
  var current_semester = new Semester(semester_id, semester_year, semester_name);
  createSemesterDOM(current_semester);
  program.addSemester(current_semester);
}

function addCourse(semester_id, course_id){
  var current_course = courses_eng_seng[course_id];
  program.addCourse(current_course, semester_id);
  createCourseDOM(semester_id, current_course);
}

Object.keys(program_sequence_seng_rec).forEach(function(key){
  /* For each semester found, create corresponding semester and add to Program Selection and DOM */
  addSemester(key, program_sequence_seng_rec[key][1], program_sequence_seng_rec[key][2]);
  for(var i=0; i < program_sequence_seng_rec[key][0].length; i++){
    /* For each course in same semester, fetch course object, and add to Program selection and DOM */
    addCourse(key, program_sequence_seng_rec[key][0][i]);
  }
});
