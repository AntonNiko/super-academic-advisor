import React, { Component } from 'react';
import '../style/Modal.css';
import '../style/Settings.css';

class Settings extends Component {
    constructor(props){
        super(props);

        this.state = {

        };
    }

    render() {
        return (
            <div id="modal-settings-details" class="modal modal-opaque">
                <div id="modal-settings-content" class="modal-content modal-draggable">
                    <div class="modal-draggable-handle"></div>
                    <span class="modal-close-button">X</span>

                    <h2 class="modal-title" id="modal-settings-title">Settings</h2>

                    <div class="modal-settings-section">
                        <h3 class="modal-subtitle-left"><span>Color Theme</span></h3>
                        <div class="modal-settings-section-text"><span>Dark Theme</span></div>
                        <div class="modal-settings-section-text"><span>Light Theme</span></div>
                    </div>
                </div>
            </div>          
        );
    }
}

export default Settings;