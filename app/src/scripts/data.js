import $ from 'jquery';

class Data {
  static getCoursesData(){
    return JSON.parse($.ajax({
      type: "GET",
      url: "/data/course_dir.json",
      async: false
    }).responseText);
  }

  static getSequenceData(){
    return JSON.parse($.ajax({
      type: "GET",
      url: "/data/program_sequence.json",
      async: false
    }).responseText);
  }

  static getSelectionData(){
    return JSON.parse($.ajax({
      type: "GET",
      url: "/data/program_selection.json",
      async: false
    }).responseText);
  }

  static getRequirementsData(){
    var program_requirements_seng = [
      ["CSC 111"],
      ["CSC 115","CSC 116"],
      ["ENGR 110",["ENGR 112","ENGL 135"]],
      ["ENGR 120"],
      ["ENGR 130"],
      ["ENGR 141"],
      ["MATH 100"],
      ["MATH 101"],
      ["MATH 110"],
      ["PHYS 110"],
      ["PHYS 111"],
      ["CSC 230"],
      ["CHEM 101"],
      ["CSC 225"],
      ["ECE 260"],
      ["ECE 310"],
      ["ECON 180"],
      ["MATH 122"]
    ]
    return program_requirements_seng;
  }

  static getSemesterSequenceIds(){
    var sequence_ids = [
      "1A",
      "1B",
      "1C",
      "2A",
      "2B",
      "2C",
      "3A",
      "3B",
      "3C",
      "4A",
      "4B",
      "4C",
      "5A",
      "5B",
      "5C",
      "6A",
      "6B",
      "6C",
      "7A",
      "7B",
      "7C"
    ];
    return sequence_ids;
  }
}

export default Data;
