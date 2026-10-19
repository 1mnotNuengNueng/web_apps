import React from 'react';

const imageMap = {
  'เค้กแครอท': '/img/carrotcake.jpg',
  'เค้กมัทฉะ': '/img/matchacake.webp',
  'เค้กฟักทอง': '/img/pumkincake.webp',
  'แครอทลาเต้': '/img/carrotlatte.jpg',
  'มัทฉะลาเต้': '/img/matchalatte.jpg',
  'ฟักทองลาเต้': '/img/pumpkinlatte.jpg',
  'ไอศกรีมแครอท': '/img/carrot-ice-cream.jpg',
  'ไอศกรีมมัทฉะ': '/img/matcha-ice-cream.jpg',
  'ไอศกรีมฟักทอง': '/img/pumpkin-ice-cream.jpg',
};

const FoodItem = ({ item, index, deleteItem, onEdit, mode, rateItem }) => {
  const thumbnail = imageMap[item.name];

  return (
    <li className="food-item">
      <div className="food-details">
        <span className="bullet-point">•</span>

        {thumbnail ? (
          <img
            src={thumbnail}
            alt={item.name}
            className="food-item-thumb"
            loading="lazy"
          />
        ) : (
          <span className="food-item-icon">🍰</span>
        )}

        <span className="food-name">{item.name}</span>
        <span className="separator">-</span>
        <span className="food-price">{item.price} baht</span>

        {item.isBestSeller && (
          <span className="bestseller-badge" title="Best Seller">
            <span className="medal-icon">🏅</span>
            <span className="badge-text">BestSeller</span>
          </span>
        )}

        {item.rating != null && <span className="rating-summary">⭐ {item.rating.toFixed(1)} ({item.ratingCount})</span>}

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
        ) : mode === 'User' ? (
          <label className="rating-control">Choose rating: <select aria-label={`Rate ${item.name}`} value={item.myRating ?? ''} onChange={(event) => rateItem(item.menuId, Number(event.target.value))}>
            <option value="" disabled>เลือก</option>
            {[1, 2, 3, 4, 5].map((value) => <option key={value} value={value}>{value}</option>)}
          </select></label>
        ) : null}
      </div>
    </li>
  );
};

export default FoodItem;
