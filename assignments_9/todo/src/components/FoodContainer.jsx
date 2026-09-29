import { useState, useEffect } from 'react';
import FoodList from './FoodList';
import FoodForm from './FoodForm';

const FoodContainer = () => {
  const [food, setFood] = useState([
    { name: "cake", price: 35, isBestSeller: true },
    { name: "bread", price: 25, isBestSeller: false },
    { name: "milk", price: 15, isBestSeller: true },
    { name: "donut", price: 45, isBestSeller: false },
    { name: "cookie", price: 55, isBestSeller: true },
  ]);

  const [mode, setMode] = useState(() => {
    return localStorage.getItem('appMode') || 'User';
  });

  useEffect(() => {
    localStorage.setItem('appMode', mode);
  }, [mode]);

  const deleteItem = (index) => {
    setFood(food.filter((_, i) => i !== index));
  };

  const addItem = (item) => {
    setFood([...food, item]);
  };

  return (
    <div className="food-container">
      <div className="mode-toggle-wrapper">
        <div className="mode-indicator">
          {mode.toUpperCase()} MODE
        </div>
        <div className="toggle-switch">
          <button 
            className={`toggle-btn ${mode === 'User' ? 'active' : ''}`} 
            onClick={() => setMode('User')}
          >
            User Mode
          </button>
          <button 
            className={`toggle-btn admin ${mode === 'Admin' ? 'active' : ''}`} 
            onClick={() => setMode('Admin')}
          >
            Admin
          </button>
        </div>
      </div>
      
      <div className="menu-card">
        <div className="menu-header">
          <h3 className="menu-title">Our Menu</h3>
        </div>
        
        <FoodList food={food} deleteItem={deleteItem} mode={mode} />
        
        {mode === 'Admin' && (
          <div className="form-section">
            <FoodForm addItem={addItem} />
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodContainer;
