const FoodItem = ({ item, index, deleteItem, mode }) => {
  return (
    <li className="food-item">
      <div className="food-details">
        <span className="bullet-point">•</span>
        <span className="food-name">{item.name}</span>
        <span className="separator">-</span>
        <span className="food-price">{item.price} baht</span>
        {item.isBestSeller && (
          <span className="bestseller-badge" title="Best Seller">
            🏆
          </span>
        )}
      </div>
      
      {mode === 'Admin' && (
        <button 
          className="btn-delete" 
          onClick={() => deleteItem(index)}
          aria-label="Delete item"
        >
          Del
        </button>
      )}
    </li>
  );
};

export default FoodItem;
