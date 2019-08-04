import React from 'react';
import './styles/App.css';
import Categories from './Components/Categories';
import PrimarySearchAppBar from './Components/header/header';
import Login from './Components/header/login';
<<<<<<< Updated upstream
import Register from'./Components/header/register'
=======
import Register from'./Components/header/register';
import Footer from './Components/Footer/Footer';
import Drawer from './Components/Drawer';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";



>>>>>>> Stashed changes


function App() {
  return (
  
    <div className="App">
      <header className="App-header">
          <PrimarySearchAppBar/>
          <Categories/>
          {/*<Register/>*/}
          {/*<Login/>*/}
      </header>
<<<<<<< Updated upstream
=======


      <Footer/>
>>>>>>> Stashed changes
    </div>
  );
}

export default App;
