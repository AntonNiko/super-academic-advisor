import $ from 'jquery';

class ScriptNotification {
    static configureNotificationBarToggle() {
        $(document).on("click", "#notification-dismiss-button", function() {
            $("#notification-content").animate({
                bottom: "-210px"
            }, 300);
        });

        $(document).on("click", "#notification-details-toggle", function() {
            $("#notification-content").animate({
                bottom: "0px"
            }, 300);
        });
    }
}

export default ScriptNotification;