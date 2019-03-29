import React, { Component } from 'react';
import '../style/Notification.css';

import $ from 'jquery';

class Notification extends Component {
    constructor(props) {
        super(props);

        this.state = {
            notification_type: null,
            title: null,
            text: null
        };

        this.throwNewNotification = this.throwNewNotification.bind(this);
    }

    throwNewNotification(notification_type, title, text) {
        this.setState({
            notification_type: notification_type,
            title: title,
            text: text
        });

        this.makeVisible();
    }

    makeVisible() {
        $("#notification-content").animate({
            bottom: "0px"
        }, 300);
    }

    makeHidden() {
        $("#notification-content").animate({
            bottom: "-60px"
        }, 300);
    }

    renderNotificationIcon() {
        return [];
    }

    renderNotificationType() {

    }

    render() {
        return (
            <div id="notification-content" class="notification-danger">
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