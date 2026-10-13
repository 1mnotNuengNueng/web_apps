import React, { useState, useMemo } from 'react';
import FoodList from './FoodList';
import FoodForm from './FoodForm';
import FoodEditModal from './FoodEditModal';

const MenuView = ({
  food,
  types,
  mode,
  deleteItem,
  addItem,
  updateItem,
  fetchMenu,
  isLoading,
  isSubmitting,
}) => {
  const [selectedType, setSelectedType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyBestSeller, setOnlyBestSeller] = useState(false);

  // Edit Modal State
  const [editingItem, setEditingItem] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSavingEdit, setIsSavingEdit] = useState(false);

  // Filtered Food List
  const filteredFood = useMemo(() => {
    return food.filter((item) => {
      const matchType =
        selectedType === 'all' ||
        (item.typeId && String(item.typeId) === String(selectedType));

      const matchSearch =
        !searchQuery ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        String(item.price).includes(searchQuery);

      const matchBestSeller = !onlyBestSeller || item.isBestSeller;

      return matchType && matchSearch && matchBestSeller;
    });
  }, [food, selectedType, searchQuery, onlyBestSeller]);

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setIsEditModalOpen(true);
  };

  const handleCloseEdit = () => {
    setEditingItem(null);
    setIsEditModalOpen(false);
  };

  const handleSaveEdit = async (menuId, updatedData) => {
    setIsSavingEdit(true);
    await updateItem(menuId, updatedData);
    setIsSavingEdit(false);
    handleCloseEdit();
  };

  return (
    <div className="menu-view-container">
      {/* Menu Card Matching Teacher's Layout */}
      <div className="menu-card">
        <div className="menu-card-header">
          <div className="menu-header-main">
            <h3 className="menu-title">Our Menu</h3>
            <span className="menu-counter-badge">
              {food.length} items
            </span>
          </div>

          <div className="menu-quick-tools">
            <button
              type="button"
              className="btn-refresh"
              onClick={fetchMenu}
              disabled={isLoading}
              title="รีเฟรชข้อมูลจาก Database"
            >
              🔄 {isLoading ? 'Loading...' : 'Refresh'}
            </button>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="menu-filters-bar">
          <div className="search-input-wrap">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="ค้นหาเมนู..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="menu-search-input"
            />
            {searchQuery && (
              <button
                type="button"
                className="clear-search-btn"
                onClick={() => setSearchQuery('')}
              >
                ✕
              </button>
            )}
          </div>

          <div className="type-filter-group">
            <button
              type="button"
              className={`type-filter-btn ${selectedType === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedType('all')}
            >
              All
            </button>
            {types.map((t) => (
              <button
                key={t.typeId}
                type="button"
                className={`type-filter-btn ${String(selectedType) === String(t.typeId) ? 'active' : ''}`}
                onClick={() => setSelectedType(String(t.typeId))}
              >
                {t.name}
              </button>
            ))}
            <button
              type="button"
              className={`type-filter-btn bestseller-filter ${onlyBestSeller ? 'active' : ''}`}
              onClick={() => setOnlyBestSeller(!onlyBestSeller)}
              title="แสดงเฉพาะ Best Seller"
            >
              🏅 Best Sellers
            </button>
          </div>
        </div>

        {/* Food List */}
        {isLoading ? (
          <div className="loading-state-box">
            <div className="spinner"></div>
            <p>กำลังโหลดข้อมูลเมนูจากฐานข้อมูล...</p>
          </div>
        ) : (
          <FoodList
            food={filteredFood}
            deleteItem={deleteItem}
            onEdit={handleOpenEdit}
            mode={mode}
          />
        )}

        {/* New Food Form Section - As shown in Teacher Screenshot */}
        {mode === 'Admin' ? (
          <div className="form-section">
            <FoodForm
              addItem={addItem}
              types={types}
              isSubmitting={isSubmitting}
            />
          </div>
        ) : (
          <div className="admin-hint-bar">
            <span>💡 ต้องการเพิ่ม ลบ หรือแก้ไขเมนูหรือไม่? สลับไปที่</span>
            <button
              type="button"
              className="admin-hint-link"
              onClick={() => {}}
            >
              Admin Mode ด้านบนขวา
            </button>
          </div>
        )}
      </div>

      {/* Edit Food Modal */}
      <FoodEditModal
        item={editingItem}
        isOpen={isEditModalOpen}
        onClose={handleCloseEdit}
        onSave={handleSaveEdit}
        types={types}
        isSaving={isSavingEdit}
      />
    </div>
  );
};

export default MenuView;
