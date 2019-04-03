import '../style/Navbar.css';
import React, { Component } from 'react';

class Navbar extends Component {
  constructor(props){
    super(props);
  }

  componentDidUpdate(){
    this.props.colors.updateColorThemes();
  }

  render() {
    return (
      <div>
        <a class="navbar-text" href="#"><span>UVic</span></a>
        <a class="navbar-img" type="submit" href="#" id="navbar-settings-icon">
          <img src="/assets/icons8-services-480.png"></img>
        </a>
        <a class="navbar-img" type="submit" href="#" id="navbar-course-icon">
          <img src="/assets/icons8-course-80.png"></img>
        </a>
      </div>
    );
  }
}

export default Navbar;
