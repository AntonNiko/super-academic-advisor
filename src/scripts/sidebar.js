import $ from 'jquery';

class ScriptSidebar {
    static configureSwitchView() {
        // Configure animation for click on button in select view 
        $(document).on("click","#sidebar-select-switch-button", function() {
            
        });

        // Configure animation for click on button in wizard view
        $(document).on("click","#sidebar-wizard-switch-button", function() {
            
        });
    }
}

export default ScriptSidebar;