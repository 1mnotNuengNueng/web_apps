import { useState } from 'react';

const FoodForm = ({ addItem }) => {
  const [inputs, setInputs] = useState({ name: "", price: "", isBestSeller: 'true' });

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setInputs(values => ({ ...values, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!inputs.name.trim() || !inputs.price) return;
    
    const newFood = {
      name: inputs.name.trim(),
      price: Number(inputs.price),
      isBestSeller: inputs.isBestSeller === 'true'
    };
    
    addItem(newFood);
    setInputs({ name: "", price: "", isBestSeller: 'true' });
  }

  return (
    <div className="food-form-wrapper">
      <h4 className="form-title">New Food</h4>
      <form onSubmit={handleSubmit} className="food-form">
        
        <div className="form-group">
          <label htmlFor="name">name :</label>
          <input 
            type="text" 
            id="name"
            name="name" 
            value={inputs.name} 
            onChange={handleChange} 
            required
            className="form-input"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="price">price :</label>
          <div className="input-with-icon">
            <input 
              type="number" 
              id="price"
              name="price" 
              value={inputs.price} 
              onChange={handleChange} 
              required
              min="0"
              className="form-input"
            />
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="isBestSeller">Best Seller :</label>
          <select 
            id="isBestSeller"
            name="isBestSeller" 
            value={inputs.isBestSeller} 
            onChange={handleChange}
            className="form-select"
          >
            <option value="true">BestSeller</option>
            <option value="false">Normal</option>
          </select>
        </div>
        
        <button type="submit" className="btn-submit">Add menu</button>
      </form>
    </div>
  );
};

export default FoodForm;
