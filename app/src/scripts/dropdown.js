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

  static configureDropdownSelection(sidebar){
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
    });
  }
}

export default Dropdown;
