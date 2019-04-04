import $ from 'jquery';

class ScriptSidebar {
    static configureSwitchView() {
        // Configure animation for click on button in select view 
        $(document).on("click","#sidebar-select-switch-button", function() {
            $("#sidebar div").animate({
                left: "-200px"
            }, 300);
        });

        // Configure animation for click on button in wizard view
        $(document).on("click","#sidebar-wizard-switch-button", function() {
            $("#sidebar div").animate({
                left: "0px"
            }, 300);
        });
    }
}

export default ScriptSidebar;