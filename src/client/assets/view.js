/* Create Program Selection */



function createSemesterDOM(name){
  $("#panel-container").append(`
  <div class="panel-term" id="term-`+name+`">
    <div class="panel-term-header">`+name+`
    </div>
    <ul class="panel-term-list" id="term-`+name+`-list">
    </ul>
  </div>
  `);
}

function createCourseDOM(semester, course){
  $("#term-"+semester+"-list").append(`
    <li class="panel-course" id="`+course.subj+`_`+course.course_num+`">
      <div class="panel-course-header">
        <span class="panel-course-name">`+course.subj+` `+course.course_num+`</span>
        <span class="panel-course-details-icon ui-icon ui-icon-plusthick" style="background-color:black;position:absolute;"></span>
      </div>
      <div class="panel-course-body">
        <span class="panel-course-offered">`+course.semesters_offered+`</span>
        <span class="panel-course-prereqs">MATH 100</span>
      </div>
      <div class="panel-course-footer">
        <span class="panel-course-credits">`+course.credits+`</span>
      </div>
    </li>
  `);
}

/* Create Program Selection */
var program = new ProgramSelection();

Object.keys(program_sequence_seng_rec).forEach(function(key){
  var current_semester = new Semester(key, program_sequence_seng_rec[key][1], program_sequence_seng_rec[key][2], null, null);
  createSemesterDOM(key);

  program.addSemester(current_semester);
  for(var i=0; i < program_sequence_seng_rec[key][0].length; i++){
    var current_course = courses_eng_seng[program_sequence_seng_rec[key][0][i]];
    program.addCourse(current_course, key);
    createCourseDOM(key, current_course);
  }
});
