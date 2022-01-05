import './App.css';
import Navbar from './Components/Navbar';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { Home } from './Home';
import { About } from './Components/About';
import NoteState from './context/notes/NoteState';
import Login from './Components/Login';
import Signup from './Components/Signup';
import AuthToken from './context/AuthToken';

function App() {
  return (
    <>
      <Router>
        <AuthToken>
          <NoteState>
            <Navbar title='Notes App' />
            <Switch>
              <Route exact path='/'>
                <Home />
              </Route>
              <Route exact path='/about'>
                <About />
              </Route>

              <Route exact path='/login'>
                <Login />
              </Route>
              <Route exact path='/signup'>
                <Signup />
              </Route>

            </Switch>
          </NoteState>
        </AuthToken>
      </Router>
    </>
  );
}

export default App;
