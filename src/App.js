import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Game from './pages/Game';
import Feedback from './pages/results';
import Ranking from './pages/Ranking';

export default function App() {
  return (
    <Switch>
      <Route
        exact
        path="/"
        render={ (history) => <Login { ...history } /> }
      />
      <Route
        exact
        path="/game"
        render={ (history) => <Game { ...history } /> }
      />
      <Route
        exact
        path="/feedback"
        render={ (history) => <Feedback { ...history } /> }
      />
      <Route
        exact
        path="/ranking"
        render={ (history) => <Ranking { ...history } /> }
      />
    </Switch>
  );
}
