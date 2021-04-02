import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from '../pages/Login';
import Join from '../pages/Join';
import Waiting from '../pages/Waiting';
import Game from '../pages/Game';
import Result from '../pages/Result';

class Main extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" render={() => { return <Login /> }} />
        <Route path="/join" render={() => { return <Join /> }} />
        <Route path="/waiting" render={() => { return <Waiting /> }} />
        <Route path="/game" render={() => { return <Game /> }} />
        <Route path="/leaderboard" render={() => { return <Result /> }} />
      </Switch>
    );
  }
}

export default Main;
