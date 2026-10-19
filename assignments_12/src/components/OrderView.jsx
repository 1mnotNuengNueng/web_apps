import React, { useState, useMemo } from 'react';

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

const OrderView = ({ food, onOrderSuccess }) => {
  const [selectedItems, setSelectedItems] = useState({});

  const orderCatalog = useMemo(() => {
    if (!food || food.length === 0) return [];
    return food.map((item) => ({
      id: String(item.menuId),
      name: item.name,
      price: item.price,
      img: imageMap[item.name] || '/img/carrotcake.jpg',
      category: item.type?.name || '',
    }));
  }, [food]);

  const [deliveryInfo, setDeliveryInfo] = useState({
    name: 'สมชาย รักขนม',
    phone: '081-234-5678',
    date: new Date().toISOString().split('T')[0],
    time: '14:00',
    address: '123/45 ถนนสุขุมวิท กรุงเทพฯ',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleToggleItem = (id) => {
    setSelectedItems((prev) => {
      const current = prev[id] || { selected: false, qty: 1, note: '' };
      return {
        ...prev,
        [id]: {
          ...current,
          selected: !current.selected,
          qty: current.qty || 1,
        },
      };
    });
  };

  const handleQtyChange = (id, delta) => {
    setSelectedItems((prev) => {
      const current = prev[id] || { selected: true, qty: 1, note: '' };
      const newQty = Math.max(1, Math.min(20, (current.qty || 1) + delta));
      return {
        ...prev,
        [id]: { ...current, selected: true, qty: newQty },
      };
    });
  };

  const handleNoteChange = (id, note) => {
    setSelectedItems((prev) => {
      const current = prev[id] || { selected: true, qty: 1, note: '' };
      return {
        ...prev,
        [id]: { ...current, note },
      };
    });
  };

  const handleDeliveryChange = (e) => {
    const { name, value } = e.target;
    setDeliveryInfo((prev) => ({ ...prev, [name]: value }));
  };

  // Calculations
  const activeOrders = orderCatalog.filter(
    (item) => selectedItems[item.id]?.selected
  );

  const subtotal = activeOrders.reduce((sum, item) => {
    const qty = selectedItems[item.id]?.qty || 1;
    return sum + item.price * qty;
  }, 0);

  const deliveryFee = subtotal > 0 ? 30 : 0;
  const grandTotal = subtotal + deliveryFee;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeOrders.length === 0) {
      alert('กรุณาเลือกรายการสินค้าอย่างน้อย 1 รายการ');
      return;
    }
    setIsSubmitted(true);
    if (onOrderSuccess) {
      onOrderSuccess('สั่งซื้อสินค้าเรียบร้อยแล้ว! ขอบคุณที่อุดหนุน Neptuny Bakery');
    }
  };

  const handleReset = () => {
    setSelectedItems({});
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <div className="order-success-card">
        <div className="success-icon">🎉</div>
        <h3>สั่งซื้อสินค้าสำเร็จ!</h3>
        <p className="success-sub">
          ขอบคุณคุณ <strong>{deliveryInfo.name}</strong> สำหรับคำสั่งซื้อ
        </p>
        <div className="success-summary">
          <p>📅 วันที่รับสินค้า: {deliveryInfo.date} เวลา {deliveryInfo.time}</p>
          <p>📍 ที่อยู่จัดส่ง: {deliveryInfo.address}</p>
          <p>💰 ยอดรวมทั้งสิ้น: <strong>{grandTotal} บาท</strong></p>
        </div>
        <button
          type="button"
          className="btn-new-order"
          onClick={handleReset}
        >
          สั่งซื้อรายการใหม่
        </button>
      </div>
    );
  }

  return (
    <div className="order-view-container">
      <div className="order-card-header">
        <h3 className="order-title">แบบฟอร์มการสั่งซื้อสินค้า (Order Form)</h3>
        <p className="order-subtitle">
          เลือกรายการขนม เครื่องดื่ม และไอศกรีมจากฐานข้อมูลร้านค้า พร้อมระบุรายละเอียดจัดส่ง
        </p>
      </div>

      <form onSubmit={handleSubmit} className="order-main-form">
        <div className="order-layout-grid">
          {/* Items Selection Column */}
          <div className="order-items-column">
            <h4 className="column-title">1. เลือกรายการสินค้า</h4>

            {orderCatalog.length === 0 ? (
              <p className="empty-subtitle">กำลังโหลดรายการสินค้าจากฐานข้อมูล...</p>
            ) : (
              <div className="order-items-list">
                {orderCatalog.map((item) => {
                  const orderState = selectedItems[item.id] || {
                    selected: false,
                    qty: 1,
                    note: '',
                  };

                  return (
                    <div
                      key={item.id}
                      className={`order-item-row ${orderState.selected ? 'checked' : ''}`}
                    >
                      <label className="order-item-checkbox-label">
                        <input
                          type="checkbox"
                          checked={orderState.selected}
                          onChange={() => handleToggleItem(item.id)}
                          className="order-checkbox"
                        />
                        <img
                          src={item.img}
                          alt={item.name}
                          className="order-thumbnail"
                        />
                        <div className="order-item-info">
                          <span className="order-item-name">{item.name}</span>
                          <span className="order-item-price">{item.price} บาท</span>
                          {item.category && (
                            <span className="order-category-tag">{item.category}</span>
                          )}
                        </div>
                      </label>

                      {orderState.selected && (
                        <div className="order-item-controls">
                          <div className="qty-control-wrapper">
                            <label className="qty-label">จำนวน:</label>
                            <div className="qty-stepper">
                              <button
                                type="button"
                                className="qty-btn"
                                onClick={() => handleQtyChange(item.id, -1)}
                              >
                                -
                              </button>
                              <span className="qty-value">{orderState.qty}</span>
                              <button
                                type="button"
                                className="qty-btn"
                                onClick={() => handleQtyChange(item.id, 1)}
                              >
                                +
                              </button>
                            </div>
                          </div>

                          <div className="note-control-wrapper">
                            <input
                              type="text"
                              placeholder="หมายเหตุ (เช่น หวานน้อย)"
                              value={orderState.note}
                              onChange={(e) => handleNoteChange(item.id, e.target.value)}
                              className="order-note-input"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Delivery & Summary Column */}
          <div className="order-delivery-column">
            <div className="delivery-card">
              <h4 className="column-title">2. ข้อมูลจัดส่ง</h4>

              <div className="delivery-fields">
                <div className="delivery-field">
                  <label htmlFor="del-name">ชื่อผู้รับ</label>
                  <input
                    type="text"
                    id="del-name"
                    name="name"
                    value={deliveryInfo.name}
                    onChange={handleDeliveryChange}
                    required
                    className="delivery-input"
                  />
                </div>

                <div className="delivery-field">
                  <label htmlFor="del-phone">เบอร์โทรศัพท์</label>
                  <input
                    type="tel"
                    id="del-phone"
                    name="phone"
                    value={deliveryInfo.phone}
                    onChange={handleDeliveryChange}
                    required
                    className="delivery-input"
                  />
                </div>

                <div className="delivery-field-row">
                  <div className="delivery-field">
                    <label htmlFor="del-date">วันที่ต้องการรับ</label>
                    <input
                      type="date"
                      id="del-date"
                      name="date"
                      value={deliveryInfo.date}
                      onChange={handleDeliveryChange}
                      required
                      className="delivery-input"
                    />
                  </div>

                  <div className="delivery-field">
                    <label htmlFor="del-time">เวลาที่ต้องการรับ</label>
                    <input
                      type="time"
                      id="del-time"
                      name="time"
                      value={deliveryInfo.time}
                      onChange={handleDeliveryChange}
                      required
                      className="delivery-input"
                    />
                  </div>
                </div>

                <div className="delivery-field">
                  <label htmlFor="del-address">ที่อยู่จัดส่ง</label>
                  <textarea
                    id="del-address"
                    name="address"
                    rows="3"
                    value={deliveryInfo.address}
                    onChange={handleDeliveryChange}
                    required
                    className="delivery-textarea"
                  ></textarea>
                </div>
              </div>

              {/* Order Summary Box */}
              <div className="order-summary-box">
                <h5 className="summary-title">สรุปยอดคำสั่งซื้อ</h5>
                <div className="summary-row">
                  <span>จำนวนรายการ</span>
                  <span>{activeOrders.length} รายการ</span>
                </div>
                <div className="summary-row">
                  <span>ค่าสินค้า</span>
                  <span>{subtotal} บาท</span>
                </div>
                <div className="summary-row">
                  <span>ค่าจัดส่ง</span>
                  <span>{deliveryFee} บาท</span>
                </div>
                <div className="summary-row total-row">
                  <span>ยอดสุทธิ</span>
                  <span className="grand-total-amount">{grandTotal} บาท</span>
                </div>
              </div>

              <div className="order-submit-buttons">
                <button
                  type="submit"
                  className="btn-confirm-order"
                  disabled={activeOrders.length === 0}
                >
                  ยืนยันการสั่งซื้อ ({grandTotal} ฿)
                </button>
                <button
                  type="button"
                  className="btn-cancel-order"
                  onClick={handleReset}
                >
                  ล้างรายการ
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default OrderView;
