import React, { Component } from 'react';

import './App.css';
import { translations } from './assets/translations/config';

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
            <h1 className="about-title">{translations.dictionary.about_title}</h1>
            <img
              alt="People"
              src={require('./assets/icons8-multicultural-people-100.png')}
              style={{height:'80px'}}/>
            <h3 className="about-text">
              {translations.dictionary.about_text_1}
            </h3>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '800px',
            }}>
              <div className="Example">
                <code>{translations.dictionary.about_example_1}</code>
                <p style={{color: '#46598F', width: '100%', textAlign: 'center', fontWeight: '400'}}>{translations.dictionary.about_example_2}</p>
                <code>{translations.dictionary.about_example_3}</code>
              </div>
              <div className="Example">
              <p style={{color: '#46598F', width: '100%', textAlign: 'center', fontWeight: '400', marginBottom:'0'}}>{translations.dictionary.about_unsupported_title}</p>
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
              {translations.dictionary.about_text_2}
            </h3>
            <h3 className="about-text" style={{textAlign: 'center', fontWeight: '400'}}>{translations.dictionary.about_the_team} </h3>
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