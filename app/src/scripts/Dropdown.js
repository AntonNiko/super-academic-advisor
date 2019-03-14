import $ from 'jquery';

class Dropdown {
  static configureDropdownActions(){
    $(function(){
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
    });
  }
}

export default Dropdown;
