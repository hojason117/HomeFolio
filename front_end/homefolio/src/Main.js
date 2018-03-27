import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './scenes/Home/Home';
import LooginSignup from './scenes/LoginSignup/LoginSignup';

class Main extends Component {
  render() {
      return (
        <BrowserRouter>
          <div>
            <Route exact path='/' component={Home} />
            <Route path='/loginsignup' component={LooginSignup} />
          </div>
        </BrowserRouter>
      )
    }
  }

export default Main;
