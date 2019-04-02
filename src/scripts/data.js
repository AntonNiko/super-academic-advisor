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

  static getRequirementsData(){
    return JSON.parse($.ajax({
      type: "GET",
      url: "/data/requirements.json",
      async: false
    }).responseText);
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
