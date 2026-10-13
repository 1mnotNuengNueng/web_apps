import React from 'react';

const FoodItem = ({ item, index, deleteItem, onEdit, mode }) => {
  return (
    <li className="food-item">
      <div className="food-details">
        <span className="bullet-point">•</span>
        <span className="food-name">{item.name}</span>
        <span className="separator">-</span>
        <span className="food-price">{item.price} baht</span>
        
        {item.isBestSeller && (
          <span className="bestseller-badge" title="Best Seller">
            <span className="medal-icon">🏅</span>
            <span className="badge-text">BestSeller</span>
          </span>
        )}

        {item.type && (
          <span className="type-badge" title={`Category: ${item.type.name}`}>
            {item.type.name}
          </span>
        )}
      </div>

      <div className="food-actions">
        {mode === 'Admin' ? (
          <>
            <button
              type="button"
              className="btn-edit"
              onClick={() => onEdit(item)}
              title="แก้ไขเมนู"
              aria-label={`Edit ${item.name}`}
            >
              Edit
            </button>
            <button
              type="button"
              className="btn-delete"
              onClick={() => deleteItem(item.menuId, index)}
              title="ลบเมนู"
              aria-label={`Delete ${item.name}`}
            >
              Del
            </button>
          </>
        ) : (
          <span className="user-view-price">{item.price} ฿</span>
        )}
      </div>
    </li>
  );
};

export default FoodItem;
