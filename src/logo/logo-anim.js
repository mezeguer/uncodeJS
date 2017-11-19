import React, { Component } from 'react';
import './logo.css';

export class LogoAnim extends Component {
  constructor () {
    super();
    this.state = {
      flag: false,
    }
  }
  componentDidMount () {
    setTimeout( () => {
      this.wait = {animation: "boxxy 5s ease-in-out infinite"}
      this.setState({flag:!this.state.flag})
    },5000);
  }
  handleAnimationChange = () => {
    this.setState({flag:!this.state.flag})
    setTimeout(() => {
      this.setState({flag:!this.state.flag})
    }, 5000)
  };

  handleAnimation = () => {
    if (!this.state.flag) {
      return (
          <div className="logo-lander" style={{animation: 'contract 5s ease'}}>
            <p style={{color:'cyan'}}>console</p>
            <p style={{color:'rgb(255, 0, 84)'}}>.</p>
            <p style={{color:'cyan'}}>log</p>
            <p style={{color:'white'}}>(uncode</p>
            <p style={{color:'rgb(255, 0, 84)'}}>.</p>
            <p style={{color:'rgb(163, 222, 46)'}}>call</p>
            <p style={{color:'white'}}>(this, </p>
            <p style={{color:'rgb(255, 0, 84)'}}>...</p>
            <p style={{color:'white'}}>arguments));</p>
          </div>
      )
    }
    return (
        <div className="subcontainer" style={{animation: 'expand 2.0s linear'}}>
          <p className="logo-uncode">uncode</p>
          <p className="logo-js">.js</p>
        </div>
    )
  }

  render() {
    return (
      <div className="container" onClick={this.handleAnimationChange}>
        <div className="container">
          <img alt="logo" className="logo" src={require('../assets/logobox.png')} style={this.wait}/>
          <img alt="logoBack" className="logoback" src={require('../assets/logobox-background.png')} style={this.wait}/>
        </div>
        {this.handleAnimation()}
      </div>
    );
  }
}
