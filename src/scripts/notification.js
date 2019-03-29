import $ from 'jquery';

class ScriptNotification {
    static configureNotificationBarToggle() {
        $(document).on("click", "#notification-dismiss-button", function(){
            $("#notification-content").animate({
                bottom: "-80px"
            }, 300);
        });
    }
}

export default ScriptNotification;