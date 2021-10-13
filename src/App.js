import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Favorite from './components/Favorite';
import Home from './components/Home';
import Navbar from './components/header/Navbar';
import Rated from './components/Rated';
import Movie from './components/movie/Movie';
import LoginPage from './components/login/LoginPage';

function App() {
  return (
    <Router>
      <div className='App'>
        <Navbar />
        <div className='content'>
          <Switch>
            <Route path='/' exact>
              <Home />
            </Route>
            <Route path='/favorite' exact>
              <Favorite />
            </Route>
            <Route path='/rated' exact>
              <Rated />
            </Route>
            <Route path='/movies/:movieId' exact>
              <Movie />
            </Route>
            <Route path='/login' exact>
              <LoginPage />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
