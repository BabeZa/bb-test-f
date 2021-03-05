import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import MyNavbar from './components/Navbar';
import Home from './pages/Home';
import Add from './pages/Add';
import Edit from './pages/Edit';
import Report from './pages/Report';
import { ToastContainer ,toast} from "react-toastify";

function App() {
  return (
    <>
    <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
      />
    <Router>
      <MyNavbar/>
          <Switch>
            <Route path='/' exact component={Home}/>
            <Route path='/add' component={Add} />
            <Route path='/edit/:id' component={Edit} />
            <Route path='/report' component={Report} />
            {/* <Route path='/detail/:id' component={PersonnelRouter} /> */}
          </Switch>
    </Router>
    </>
  );
}

export default App;
