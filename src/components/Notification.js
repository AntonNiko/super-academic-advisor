import React, { Component } from 'react';
import '../style/Notification.css';


class Notification extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="notification-content"></div>
        );
    }
}

export default Notification;