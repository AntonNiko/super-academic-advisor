var program_combs = {
  "Engineering":[
    "Software Engineering",
    "Mechanical Engineering"
  ],
  "Science":[
    "Physics",
    "Biology",
    "Chemistry"
  ]
};

class Course {
  constructor(subj, course_num, prereqs, coreqs, blocks, exists){
    this.subj = subj;
    this.course_num = course_num;
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
    this.semester = semester_name;
    this.prev_semester = prev_semester;
    this.next_semester = next_semester;
    this.courses = new Map();
  }

  addCourse(course){
    this.courses.set(course.subj+" "+course.course_num, course);
  }

  removeCourse(course){
    this.courses.delete(course.subj+" "+course.course_num, course);
  }
}

class ProgramSelection {
  constructor(){
    this.semester = new Map();
  }

  addSemester(semester){
    this.semester.set(semester.id, semester);
  }

  addCourse(course, semester_id){
    this.semester.get(semester_id).addCourse(course);
  }

  moveCourse(course, origin_semester_id, dest_semester_id){
     this.semester.get(origin_semester_id).removeCourse(course);
     this.semester.set(dest_semester_id).addCourse(course);
  }

  removeCourse(course, semester_id){
    this.semester.get(semester_id).removeCourse(course);
  }
}

var courses_eng_seng = {
  "CSC 111": new Course("CSC","111",[],[],[], false),
  "ENGR 130": new Course("ENGR","130",[],[],[], false),
  "ENGR 110": new Course("ENGR","110",[],[],[], false),
  "MATH 100": new Course("MATH","100",[],[],[], false),
  "MATH 110": new Course("MATH","110",[],[],[], false),
  "PHYS 110": new Course("PHYS","110",[],[],[], false),
  "CSC 115": new Course("CSC","115",["CSC 111"],[],[], false),
  "ENGR 120": new Course("ENGR","120",["CSC 111", "ENGR 110"],[],[], false),
  "ENGR 141": new Course("ENGR","141",["MATH 100", "MATH 110"],[],[], false),
  "MATH 101": new Course("MATH","100",["MATH 100"],[],[], false),
  "PHYS 111": new Course("PHYS","111",["MATH 100", "PHYS 110"],[],[], false),
  "CSC 230": new Course("CSC","230",["CSC 115"],[],[], false)/*,
  "CHEM 101": new Course("CHEM","101",[],[],[], false),
  "ECE 260": new Course("ECE","260",["MATH 101", "MATH 110"],[],[], false),
  "MATH 122": new Course("MATH","122",["MATH 100"],[],[], false),
  "SENG 265": new Course("SENG","265",["CSC 115"],[],[], false),
  "STAT 260": new Course("STAT","260",["MATH 101"],[],[], false),
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
/* HANDLE CO-REQUISITES */
