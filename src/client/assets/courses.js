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

var courses_eng_seng = {
  "CSC 111": null,
  "ENGR 130": null,
  "ENGR 110": null,
  "MATH 100": null,
  "MATH 110": null,
  "PHYS 110": null,
  "CSC 115": ["CSC 111"],
  "ENGR 120": ["CSC 111", "ENGR 110"],
  "ENGR 141": ["MATH 100", "MATH 110"],
  "MATH 101": ["MATH 100"],
  "PHYS 111": ["MATH 100", "PHYS 110"],
  "CSC 230": ["CSC 115"],
  "CHEM 101": null,
  "ECE 260": ["MATH 101", "MATH 110"],
  "MATH 122": ["MATH 100"],
  "SENG 265": ["CSC 115"],
  "STAT 260": ["MATH 101"],
  "CSC 225": ["CSC 115", "MATH 122"],
  "ECE 310": ["ECE 260"],
  "ECON 180": ["MATH 101"],
  "SENG 275": ["SENG 265"],
  "CSC 361": ["SENG 265", "CSC 230", "CSC 226"],
  "CSC 226": ["CSC 225"],
  "ECE 360": ["ECE 260"],
  "SENG 321": ["SENG 265"],
  "SENG 371": ["SENG 275"],
  "CSC 355": ["CSC 230", "MATH 122"],
  "CSC 320": ["CSC 226"],
  "CSC 360": ["SENG 265", "CSC 230", "CSC 226"],
  "CSC 370": ["CSC 226", "SENG 265"],
  "SENG 350": ["SENG 275"],
  "SENG 360": ["SENG 265"]
}
/* HANDLE CO-REQUISITES */

class Course {
  constructor(subj, course_num, prereqs, coreqs, blocks){
    this.subj = subj;
    this.course_num = course_num;
    this.prereqs = prereqs;
    this.coreqs = coreqs;
    this.blocks = blocks;
    this.semester = null;
  }
}

class Semester {
  constructor(id, year, semester){
    this.id = id;
    this.year = year;
    this.semester = semester;
  }
}

class ProgramSelection {
  constructor(){
    this.semester = new Map();
  }

  addCourse(course, semester){

  }

  moveCourse(course, origin_semester, dest_semester){

  }

  removeCourse(course, semester){

  }
}
