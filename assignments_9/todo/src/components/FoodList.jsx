import FoodItem from './FoodItem';

const FoodList = ({ food, deleteItem, mode }) => {
  return (
    <div className="food-list-container">
      <ul className="food-list">
        {food.map((item, index) => (
          <FoodItem 
            key={index} 
            item={item} 
            index={index}
            deleteItem={deleteItem} 
            mode={mode} 
          />
        ))}
      </ul>
    </div>
  );
};

export default FoodList;
