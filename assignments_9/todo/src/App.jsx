import React from 'react';
import FoodContainer from './components/FoodContainer';

function App() {
  return (
    <div className="app-wrapper">
      <header className="app-header">
        <h1>Menu Management</h1>
      </header>
      <main>
        <FoodContainer />
      </main>
    </div>
  );
}

export default App;
