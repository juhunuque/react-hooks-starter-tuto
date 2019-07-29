import React from 'react';
import {Route, BrowserRouter} from 'react-router-dom'
import axios from 'axios'

import '../node_modules/materialize-css/dist/css/materialize.min.css'
import '../node_modules/materialize-css/dist/js/materialize.min.js'
import './App.css';

import Navbar from './components/Navbar'
import About from './pages/About'
import Home from './pages/Home'

axios.defaults.baseURL = 'https://ndb99xkpdk.execute-api.eu-west-2.amazonaws.com/dev'

function App() {
  return (
  <BrowserRouter>
    <Navbar/>
    <div className="container">
      <Route exact path="/" component={Home}/>
      <Route exact path="/about" component={About}/>
    </div>
  </BrowserRouter>
  );
}

export default App;
