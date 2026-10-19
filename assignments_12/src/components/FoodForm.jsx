import React, { useState } from 'react';

const FoodForm = ({ addItem, types, isSubmitting }) => {
  const [inputs, setInputs] = useState({
    name: '',
    price: '',
    typeId: types && types.length > 0 ? types[0].typeId : '1',
    isBestSeller: 'true',
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!inputs.name.trim() || inputs.price === '') return;

    const newFood = {
      name: inputs.name.trim(),
      price: parseFloat(inputs.price),
      typeId: parseInt(inputs.typeId) || (types && types[0] ? types[0].typeId : 1),
      isBestSeller: inputs.isBestSeller === 'true',
    };

    addItem(newFood);
    setInputs({
      name: '',
      price: '',
      typeId: types && types.length > 0 ? types[0].typeId : '1',
      isBestSeller: 'true',
    });
  }

  return (
    <div className="food-form-wrapper">
      <h4 className="form-title">New Food</h4>
      <form onSubmit={handleSubmit} className="food-form">
        <div className="form-group">
          <label htmlFor="form-name">name :</label>
          <input
            type="text"
            id="form-name"
            name="name"
            placeholder="e.g. เค้กช็อกโกแลต, ครัวซองต์"
            value={inputs.name}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="form-price">price :</label>
          <div className="input-with-icon">
            <input
              type="number"
              id="form-price"
              name="price"
              placeholder="0.00"
              value={inputs.price}
              onChange={handleChange}
              required
              min="0"
              step="any"
              className="form-input"
            />
          </div>
        </div>

        {types && types.length > 0 && (
          <div className="form-group">
            <label htmlFor="form-typeId">type :</label>
            <select
              id="form-typeId"
              name="typeId"
              value={inputs.typeId}
              onChange={handleChange}
              className="form-select"
            >
              {types.map((t) => (
                <option key={t.typeId} value={t.typeId}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="form-group">
          <label htmlFor="form-isBestSeller">Best Seller :</label>
          <select
            id="form-isBestSeller"
            name="isBestSeller"
            value={inputs.isBestSeller}
            onChange={handleChange}
            className="form-select"
          >
            <option value="true">BestSeller</option>
            <option value="false">Normal</option>
          </select>
        </div>

        <div className="form-button-container">
          <button type="submit" className="btn-submit" disabled={isSubmitting}>
            {isSubmitting ? 'Adding...' : 'Add menu'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FoodForm;
