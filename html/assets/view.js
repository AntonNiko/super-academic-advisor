/* Create Program Selection, representing user choices */
var program = new ProgramSelection();

Object.keys(program_sequence_seng_rec).forEach(function(key){
  /* For each semester found, create corresponding semester and add to Program Selection and DOM */
  program.addSemester(key, program_sequence_seng_rec[key][1], program_sequence_seng_rec[key][2]);
  for(var i=0; i < program_sequence_seng_rec[key][0].length; i++){
    /* For each course in same semester, fetch course object, and add to Program selection and DOM */
    program.addCourse(key, program_sequence_seng_rec[key][0][i]);
  }
});
