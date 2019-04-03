import $ from 'jquery';
import '../style/Notification.css';
import React, { Component } from 'react';

class Notification extends Component {
    constructor(props) {
        super(props);

        this.state = {
            notification_type: null,
            title: null,
            text: null
        };

        this.visible = false;

        this.throwNewNotification = this.throwNewNotification.bind(this);
    }

    throwNewNotification(notification_type, title, text) {
        // Add animation of hiding to accentuate reactive behavior
        if (this.visible) {
            this.makeHidden(true);
        }

        this.setState({
            notification_type: notification_type,
            title: title,
            text: text
        });

        this.makeVisible();
    }

    makeVisible(no_animation = false) {
        if (no_animation) {
            $("#notification-content").css({
                bottom: "0px"
            });
        } else {
            $("#notification-content").animate({
                bottom: "0px"
            }, 300);
        }

        this.visible = true;
    }

    makeHidden(no_animation = false) {
        if (no_animation) {
            $("#notification-content").css({
                bottom: "-60px"
            });
        } else {
            $("#notification-content").animate({
                bottom: "-60px"
            }, 300);
        }

        this.visible = false;
    }

    renderNotificationIcon() {
        return [];
    }

    renderNotificationTypeClass() {
        switch (this.state.notification_type) {
            case "danger":
              return "notification-danger";
            case "success":
              return "notification-success";
            case "warning":
              return "notification-warning";
            case "info":
              return "notification-info";
            default:
              break;
        }
    }

    render() {
        return (
            <div id="notification-content" class={this.renderNotificationTypeClass()}>
                <div id="notification-icon">
                    <span>{this.renderNotificationIcon()}</span>
                </div>
                <div id="notification-title">
                  <span>{this.state.title}:</span>
                </div>
                <div id="notification-text">
                  <span>{this.state.text}</span>
                </div>
                <div id="notification-dismiss-button"><span>X</span></div>
            </div>
        );
    }
}

export default Notification;
