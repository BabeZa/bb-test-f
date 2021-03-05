import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import MyNavbar from './components/Navbar';
import Home from './pages/Home';
import Add from './pages/Add';
function App() {
  return (
    <Router>
      <MyNavbar/>
          <Switch>
            <Route path='/' exact component={Home}/>
            <Route path='/add' component={Add} />
            {/*<Route path='/edit/:id' component={DocumentRouter} />
            <Route path='/detail/:id' component={PersonnelRouter} /> */}
          </Switch>
    </Router>
  );
}

export default App;
