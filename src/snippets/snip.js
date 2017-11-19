import React, { Component } from 'react';
import axios from 'axios';
import './snippets.css';
import {  SnipIcon } from './snipicon';
export class Snip extends Component {
  render() {
    console.log('asdasd', this.props);
    return (
      <div className="snip-container">
        <p className="snip-title">{this.props.props.title}</p>
        <div style={{width:'100%', backgroundColor:'white', display:'flex', alignItems:'center', justifyContent:'center'}}><SnipIcon /></div>
      </div>
    );
  }
}
