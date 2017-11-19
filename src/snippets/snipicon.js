import React, { Component } from 'react';
import axios from 'axios';
import './snippets.css';

export class SnipIcon extends Component {
  render() {
    return (
      <div className="snip-icon-wrapper">
        <div className="snip-bg"/>
        <div className="over">
          <span>
            <img className="snip-icon" src={require('../assets/iconfile.png')}/>
          </span>
        </div>
      </div>
    );
  }
}
