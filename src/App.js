import React from 'react';
import './styles/App.css';
import Categories from './Components/Categories';
import Login from './Components/header/login';


function App() {
  return (
    <div className="App">
      <header className="App-header">

          <Login/>
          <Categories/>
      </header>
    </div>
  );
}

export default App;
