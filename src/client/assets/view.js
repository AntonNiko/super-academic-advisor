// USING jQuery

/* Set up semesters by creating DOM elements */

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
  var course_obj = courses_eng_seng[course];
  console.log(course_obj);

  $("#term-"+semester+"-list").append(`
    <li class="panel-course" id="math_101">
      <div class="panel-course-header">
        <span class="panel-course-name">MATH 101</span>
        <span class="panel-course-details-icon ui-icon ui-icon-plusthick" style="background-color:black;position:absolute;"></span>
      </div>
      <div class="panel-course-body">
        <span class="panel-course-offered">F,Sp,Su</span>
        <span class="panel-course-prereqs">MATH 100</span>
      </div>
      <div class="panel-course-footer">
        <span class="panel-course-credits">1.5</span>
      </div>
    </li>
  `);
}

Object.keys(program_sequence_seng_rec).forEach(function(key){
  createSemesterDOM(key);

  for(var i=0; i < program_sequence_seng_rec[key].length; i++){
    createCourseDOM(key, program_sequence_seng_rec[key][i])
  }
});
