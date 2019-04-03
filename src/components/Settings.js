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
                        <ul class="dropdown-select">
                          <li id="settings-color-theme-dropdown">
                            <div class="dropdown-header">
                                <p class="dropdown-value">Dark Theme</p>
                                <span class="arrow-down"></span>
                            </div>
                            <ul>
                                <li value="Dark Theme"><span>Dark Theme</span></li>
                                <li value="Light Theme"><span>Light Theme</span></li>
                            </ul>
                          </li>
                        </ul>

                        <button type="button" class="btn-primary" id="settings-color-theme-submit">Submit</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Settings;
