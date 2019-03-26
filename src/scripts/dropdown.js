import $ from 'jquery';

class Dropdown {
  static configureDropdownActions(){
    $(document).on("mouseenter", "ul.dropdown-select li, ul.dropdown-select-small li", function(){
      $(this).find("ul").css({"visibility":"visible", "opacity":"1"});
    });

    $(document).on("mouseleave", "ul.dropdown-select li, ul.dropdown-select-small li", function(){
      $(this).find("ul").css({"visibility":"hidden", "opacity":"0"});
    });

    $(document).on("mouseenter", "ul.dropdown-select li ul li, ul.dropdown-select-small li ul li", function(){
      $(this).css({"background":"#666"});
    });

    $(document).on("mouseleave", "ul.dropdown-select li ul li, ul.dropdown-select-small li ul li", function(){
      $(this).css({"background":"#353535"});
    });
  }

  static configureDropdownSelection(sidebar, modalAddCourse){
    // Dropdown select value
    $(document).on("click", "ul.dropdown-select li ul li, ul.dropdown-select-small li ul li", function(){
      var selected_value = $(this).attr("value");
      var selected_display = $(this).parent().parent().children(".dropdown-header").children("p.dropdown-value");
      selected_display.attr("value", selected_value);
      selected_display.text(selected_value);
      $(this).parent().css({"visibility":"hidden", "opacity":"0"});

      switch($(this).parent().parent().attr("id")){
        case "faculty-dropdown":
          sidebar.actionSelectFaculty(selected_value);
          break;
        case "program-dropdown":
          sidebar.actionSelectProgram(selected_value);
          break;
        case "minor-dropdown":
          sidebar.actionSelectMinor(selected_value);
          break;
        case "specialization-dropdown":
          sidebar.actionSelectSpecialization(selected_value);
          break;
        default:
          break;
      }

      if($(this).parent().parent().find(".dropdown-header").hasClass("staged-course-year")){
        var course_str = $(this).parents().eq(4).attr("id").replace("_staged","").replace("_"," ");
        modalAddCourse.actionSelectStagedCourseYear(course_str, selected_value);
      }else if($(this).parent().parent().find(".dropdown-header").hasClass("staged-course-semester")){
        var course_str = $(this).parents().eq(4).attr("id").replace("_staged","").replace("_"," ");
        modalAddCourse.actionSelectStagedCourseSemester(course_str, selected_value);
      }
    });
  }

  static configureSidebarSubmitSelection(sidebar){
    $(document).on("click", "#sidebar-selection-submit", function(){
      sidebar.actionSubmitSelections();
    });
  }
}

export default Dropdown;
