import React from 'react';
import FoodItem from './FoodItem';

const FoodList = ({ food, deleteItem, onEdit, mode }) => {
  if (!food || food.length === 0) {
    return (
      <div className="food-list-empty">
        <div className="empty-icon">🍽️</div>
        <p className="empty-title">ไม่มีรายการเมนูในระบบ</p>
        <p className="empty-subtitle">คุณสามารถเพิ่มเมนูใหม่ได้ที่แบบฟอร์มด้านล่าง</p>
      </div>
    );
  }

  return (
    <div className="food-list-container">
      <ul className="food-list">
        {food.map((item, index) => (
          <FoodItem
            key={item.menuId ?? index}
            item={item}
            index={index}
            deleteItem={deleteItem}
            onEdit={onEdit}
            mode={mode}
          />
        ))}
      </ul>
    </div>
  );
};

export default FoodList;
