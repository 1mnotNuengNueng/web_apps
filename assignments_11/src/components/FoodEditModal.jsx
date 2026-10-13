import React, { useState, useEffect } from 'react';

const FoodEditModal = ({ item, isOpen, onClose, onSave, types, isSaving }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    typeId: '1',
    isBestSeller: false,
  });

  useEffect(() => {
    if (item) {
      setFormData({
        name: item.name || '',
        price: item.price !== undefined ? item.price : '',
        typeId: item.typeId ? String(item.typeId) : (types && types[0] ? String(types[0].typeId) : '1'),
        isBestSeller: Boolean(item.isBestSeller),
      });
    }
  }, [item, types]);

  if (!isOpen || !item) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || formData.price === '') return;

    onSave(item.menuId, {
      name: formData.name.trim(),
      price: parseFloat(formData.price),
      typeId: parseInt(formData.typeId),
      isBestSeller: formData.isBestSeller,
    });
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-wrapper">
            <span className="modal-icon">✏️</span>
            <h3 className="modal-title">แก้ไขข้อมูลเมนู (Edit Menu)</h3>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="modal-form-group">
            <label htmlFor="edit-name">ชื่อเมนู (Name)</label>
            <input
              type="text"
              id="edit-name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="modal-input"
            />
          </div>

          <div className="modal-form-group">
            <label htmlFor="edit-price">ราคา (Price - Baht)</label>
            <input
              type="number"
              id="edit-price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
              step="any"
              className="modal-input"
            />
          </div>

          {types && types.length > 0 && (
            <div className="modal-form-group">
              <label htmlFor="edit-type">หมวดหมู่ (Type)</label>
              <select
                id="edit-type"
                name="typeId"
                value={formData.typeId}
                onChange={handleChange}
                className="modal-select"
              >
                {types.map((t) => (
                  <option key={t.typeId} value={t.typeId}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="modal-form-group checkbox-group">
            <label className="checkbox-label" htmlFor="edit-isBestSeller">
              <input
                type="checkbox"
                id="edit-isBestSeller"
                name="isBestSeller"
                checked={formData.isBestSeller}
                onChange={handleChange}
                className="modal-checkbox"
              />
              <span className="checkbox-custom"></span>
              <span className="checkbox-text">ตั้งเป็นสินค้าขายดี (Best Seller 🏅)</span>
            </label>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onClose} disabled={isSaving}>
              ยกเลิก
            </button>
            <button type="submit" className="btn-save" disabled={isSaving}>
              {isSaving ? 'กำลังบันทึก...' : 'บันทึกการแก้ไข'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FoodEditModal;
