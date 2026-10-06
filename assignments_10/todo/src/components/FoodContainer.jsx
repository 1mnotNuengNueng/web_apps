import { useState, useEffect } from 'react';
import FoodList from './FoodList';
import FoodForm from './FoodForm';

const FoodContainer = () => {
  const [food, setFood] = useState([]);

  const [mode, setMode] = useState(() => {
    return localStorage.getItem('appMode') || 'User';
  });

  useEffect(() => {
    localStorage.setItem('appMode', mode);
  }, [mode]);

  const fetchMenu = () => {
    fetch('http://localhost:3000/api/menu')
      .then(res => res.json())
      .then(data => setFood(data))
      .catch(err => console.error("Error fetching data:", err));
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  const deleteItem = (index) => {
    const itemToDelete = food[index];
    if (itemToDelete && itemToDelete.menuId) {
      fetch(`http://localhost:3000/api/menu/${itemToDelete.menuId}`, {
        method: 'DELETE',
      })
      .then(() => {
        setFood(food.filter((_, i) => i !== index));
      })
      .catch(err => console.error("Error deleting:", err));
    } else {
      setFood(food.filter((_, i) => i !== index));
    }
  };

  const addItem = (item) => {
    // สมมติว่าเพิ่มเข้า typeId: 1 (Dessert) เป็นค่าเริ่มต้นไปก่อน เนื่องจากฟอร์มอาจจะไม่ได้ส่ง type มา
    const newItem = { ...item, typeId: 1 };
    
    fetch('http://localhost:3000/api/menu', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newItem)
    })
    .then(res => res.json())
    .then(savedItem => {
      setFood([...food, savedItem]);
    })
    .catch(err => console.error("Error adding:", err));
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
