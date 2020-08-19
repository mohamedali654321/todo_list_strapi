import React from 'react';
import logo from './logo.svg';
import './App.css';
import Register from './Components/Register';
import Login from './Components/Login';
import Navbar from './Components/Navbar'
import Home from './Components/Home'

import {BrowserRouter , Router , Route ,Link ,Switch} from 'react-router-dom'


function App() {
  return (
   <BrowserRouter>
    <div className="App">
      
      {/* <Navbar></Navbar> */}
     
      {/* <Messages></Messages> */}
      {/* <Register></Register> */}
      {/* <Login></Login> */}
      {/* <Router>
        <Route exact path='register' component={<Register></Register>}></Route>
        <Route path="login" component={<Login></Login>}></Route>
      </Router> */}
      
      <Switch>
      <Route  path="/register" component={Register}></Route>
      <Route path="/login" component={Login}></Route>
      <Route exact path="/" component={Home} ></Route>
      </Switch>

      </div>
  
    
    </BrowserRouter>
  );
}

export default App;
