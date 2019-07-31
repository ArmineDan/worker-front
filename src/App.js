import React from 'react';
import './styles/App.css';
import Categories from './Components/Categories';
import PrimarySearchAppBar from './Components/header/header';
import Login from './Components/header/login';
import Register from'./Components/header/register'


function App() {
  return (
    <div className="App">
      <header className="App-header">
          <PrimarySearchAppBar/>
          <Categories/>
          {/*<Register/>*/}
          {/*<Login/>*/}
      </header>
    </div>
  );
}

export default App;
