import React from 'react';
import './styles/App.css';
import Categories from './Components/Categories';
import PrimarySearchAppBar from './Components/header/header';
import Login from './Components/header/login';
import Profile from './Components/profile/profile';
import Register from'./Components/header/register'
import Footer from './Components/Footer/Footer';



function App() {
  return (
    <div className="App">
      <header className="App-header">
  
        <Profile />
          {/* <PrimarySearchAppBar/>
          <Categories/>
          <Register/>
          <Login/> */}

      </header>
      {/* <Footer/> */}
    </div>
  );
}

export default App;
