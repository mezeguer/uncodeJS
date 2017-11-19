import React, { Component } from 'react';

import './App.css';
const _ = require('lodash');

class About extends Component {
  state = {
    aboutFlag: false,
  }

  //=============================================== REDERING

  renderTeam = () => {
    let arr = [{name:'Charlie', url:'https://github.com/cboyce183'},{name:'Hannah', url:'https://github.com/redspanner'},{name:'Mike',url:'https://github.com/MPastorMeseguer'},{name:'Javier', url:'https://github.com/moranlemusj'},{name:'Jack',url:'https://github.com/vidocco'}]
    arr = _.shuffle(arr);
    return arr.map( el => {
      return (
        <a
          href={el.url}
          style={{textDecoration:'none'}}
          target="_blank">
          <div
            style={{
              padding:'5px',
              width:'60px',
              height:'60px',
              borderRadius:'35px',
              backgroundColor:'rgb(64,89,147)',
              display:'flex',
              justifyContent:'space-around',
              alignItems:'center'
            }}>
            <p
              style={{
                fontFamily: 'Roboto',
                fontWeight: '300',
                color: 'white',
                textAlign: 'center'
              }}>{el.name}</p>
          </div>
        </a>
      )
    })
  }

  render() {
    return this.props.display ? (
        <div>
          <div className="Overlay" onClick={this.props.handleDisplay}>
          </div>
          <div className="about-container">
            <h1 className="about-title">MADE BY DEVELOPERS FOR FUTURE DEVELOPERS</h1>
            <img
              alt="People"
              src={require('./assets/icons8-multicultural-people-100.png')}
              style={{height:'80px'}}/>
            <h3 className="about-text">
              uncode.js is a tool for learning how to code JavaScript in the friendliest 
              way possible: converting code into your own, (generally) more comfortable 
              and easy to understand native language. Check the example below to understand 
              how it works.
            </h3>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '800px',
            }}>
              <div className="Example">
                <code>var foo = 10 + 5;</code>
                <p style={{color: '#46598F', width: '100%', textAlign: 'center', fontWeight: '400'}}>is uncoded into</p>
                <code>1 var variable foo is assigned to 10 plus 5</code>
              </div>
              <div className="Example">
              <p style={{color: '#46598F', width: '100%', textAlign: 'center', fontWeight: '400', marginBottom:'0'}}>currently unsupported expressions</p>
                <ul className="UnsupportedList">
                  <li><code>try/catch/throw</code></li>
                  <li><code>export/import</code></li>
                  <li><code>with</code></li>
                  <li><code>yield</code></li>
                  <li><code>console statements</code></li>
                  <li><code>async/await</code></li>
                  <li><code>super()</code></li>
                  <li><code>templates</code></li>
                </ul>
              </div>
            </div>
            <h3 className="about-text">
              In other words: simply start coding, copy in some code from elsewhere or 
              drag and drop a text file in, watch our algorithm convert it into plain old 
              english, spanish or italian (by selecting your language in the top right corner) 
              and read what you just typed in terms anyone can understand. 
              It really is that simple!</h3>
            <h3 className="about-text" style={{textAlign: 'center', fontWeight: '400'}}>The Team: </h3>
            <div style={{display:'flex', flexFlow:'row nowrap',justifyContent:'space-around', paddingBottom:'5vh', width:'40%'}}>
              {this.renderTeam()}
            </div>
          </div>
        </div>
    ) : (
      ''
    );
  }
}

export default About;