import $ from 'jquery';

class Data {
  static getCoursesData(){
    return JSON.parse($.ajax({
      type: "GET",
      url: "/data/courses.json",
      async: false
    }).responseText);
  }

  static getSequenceData(){
    return JSON.parse($.ajax({
      type: "GET",
      url: "/data/sequence.json",
      async: false
    }).responseText);
  }

  static getSelectionData(){
    return JSON.parse($.ajax({
      type: "GET",
      url: "/data/programs.json",
      async: false
    }).responseText);
  }

  static getRequirementsDataNew(){
    return JSON.parse($.ajax({
      type: "GET",
      url: "/data/requirements.json",
      async: false
    }).responseText);
  }

  static getRequirementsData(){
    var program_requirements_seng = [
      ["CSC 111"],
      ["CSC 115","OR","CSC 116"],
      ["ENGR 110","OR",["ENGR 112","AND","ENGL 135"]],
      ["ENGR 120","OR",["ENGR 240","AND","ENGR 121"]]
    ]

    /*
      ["ENGR 130"],
      ["ENGR 141"],
      ["MATH 100"],
      ["MATH 101"],
      ["MATH 110","MATH 211"],
      ["PHYS 110"],
      ["PHYS 111"],
      ["CSC 230", "ECE 255"],
      ["CHEM 101"],
      ["CSC 225"],
      ["ECE 260"],
      ["ECE 310"],
      ["ECON 180"],
      ["MATH 122"]
    */
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
