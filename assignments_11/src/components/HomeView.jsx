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

const codeMap = {
  'เค้กแครอท': 'CK-01',
  'เค้กมัทฉะ': 'CK-02',
  'เค้กฟักทอง': 'CK-03',
  'แครอทลาเต้': 'T-01',
  'มัทฉะลาเต้': 'T-02',
  'ฟักทองลาเต้': 'T-03',
  'ไอศกรีมแครอท': 'IC-01',
  'ไอศกรีมมัทฉะ': 'IC-02',
  'ไอศกรีมฟักทอง': 'IC-03',
};

const descMap = {
  'เค้กแครอท': 'เค้กแครอทสูตรโฮมเมด เนื้อนุ่มชุ่มฉ่ำ หอมกลิ่นชินนามอนอ่อนๆ',
  'เค้กมัทฉะ': 'มัทฉะเข้มข้นแท้จากญี่ปุ่น รสสัมผัสละมุน กลมกล่อม ไม่หวานเลี่ยน',
  'เค้กฟักทอง': 'ฟักทองญี่ปุ่นคัดพิเศษ หวานมันจากธรรมชาติ อบสดใหม่ทุกวัน',
  'แครอทลาเต้': 'เครื่องดื่มสุขภาพ ผสานความสดชื่นของแครอทกับนมอุ่นละมุน',
  'มัทฉะลาเต้': 'ชาเขียวมัทฉะพรีเมียมตีฟองนมนุ่ม ละลายในปาก หอมกรุ่น',
  'ฟักทองลาเต้': 'ลาเต้รสฟักทองอบอุ่น เสิร์ฟร้อนหรือเย็น หอมมันกำลังดี',
  'ไอศกรีมแครอท': 'ไอศกรีมโฮมเมดสไตล์เจลาโต หวานเบาๆ สดชื่นคลายร้อน',
  'ไอศกรีมมัทฉะ': 'ไอศกรีมมัทฉะเข้มข้นสัมผัสพรีเมียม อร่อยถูกใจสายชาเขียว',
  'ไอศกรีมฟักทอง': 'เนื้อฟักทองแท้ผสมครีมนมสด ละมุนลิ้นไม่ซ้ำใคร',
};

const HomeView = ({ food, onNavigateToMenu, onNavigateToOrder }) => {
  const [selectedFilter, setSelectedFilter] = useState('ทั้งหมด');

  // Extract unique categories from DB menus
  const categories = useMemo(() => {
    const set = new Set();
    if (food && food.length > 0) {
      food.forEach((item) => {
        if (item.type?.name) set.add(item.type.name);
      });
    } else {
      set.add('เค้ก');
      set.add('ชา');
      set.add('ไอศกรีม');
    }
    return ['ทั้งหมด', ...Array.from(set)];
  }, [food]);

  const displayItems = useMemo(() => {
    if (!food || food.length === 0) return [];
    return food.map((item) => ({
      id: codeMap[item.name] || `MN-${String(item.menuId).padStart(2, '0')}`,
      menuId: item.menuId,
      name: item.name,
      category: item.type?.name || 'เบเกอรี่',
      price: item.price,
      img: imageMap[item.name] || '/img/carrotcake.jpg',
      description: descMap[item.name] || 'เมนูพิเศษอบสดใหม่จากทางร้าน Neptuny Bakery',
      isBestSeller: item.isBestSeller,
    }));
  }, [food]);

  const filteredItems = useMemo(() => {
    if (selectedFilter === 'ทั้งหมด') return displayItems;
    return displayItems.filter((item) => item.category === selectedFilter);
  }, [displayItems, selectedFilter]);

  return (
    <div className="home-view-container">
      {/* Hero Welcome Card */}
      <section className="hero-banner-card">
        <div className="hero-content">
          <div className="hero-badge-pill">🥐 Artisanal Bakery & Cafe</div>
          <h2 className="hero-title">Welcome to Neptuny</h2>
          <p className="hero-description">
            ยินดีต้อนรับสู่ <strong>Neptuny Bakery</strong> ขอบคุณที่แวะมาเยี่ยมชมร้านของเรา
            เราตั้งใจอบขนมสดใหม่ทุกวัน ด้วยวัตถุดิบคุณภาพและความใส่ใจในทุกขั้นตอน
            หวังว่าขนมทุกชิ้นจะเติมเต็มความสุขให้กับทุกช่วงเวลาของคุณ 💛🍞✨
          </p>

          <div className="hero-action-buttons">
            <button
              type="button"
              className="btn-hero-primary"
              onClick={onNavigateToMenu}
            >
              📋 จัดการเมนู (Our Menu)
            </button>
            <button
              type="button"
              className="btn-hero-secondary"
              onClick={onNavigateToOrder}
            >
              🛍️ สั่งซื้อสินค้า (Order)
            </button>
          </div>
        </div>

        <div className="hero-decorations">
          <div className="baking-tags-row">
            <div className="baking-tag">
              <span className="tag-emoji">🌾</span>
              <div>
                <strong>Organic Flour</strong>
                <span>แป้งพรีเมียมคัดสรร</span>
              </div>
            </div>
            <div className="baking-tag">
              <span className="tag-emoji">⏰</span>
              <div>
                <strong>Baked Daily</strong>
                <span>อบสดใหม่ทุกเช้า</span>
              </div>
            </div>
            <div className="baking-tag">
              <span className="tag-emoji">🍃</span>
              <div>
                <strong>Matcha Shizuoka</strong>
                <span>มัทฉะแท้เกรดพิธีชง</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Showcase Grid from real database */}
      <section className="showcase-section">
        <div className="showcase-header">
          <div>
            <h3 className="section-title">เมนูประจำร้าน (Signature Collection)</h3>
            <p className="section-subtitle">
              เลือกสรรขนม ชา รวมถึงไอศกรีมจากฐานข้อมูลร้านค้าที่มีมากมายหลายรายการได้อย่างตามใจชอบ
            </p>
          </div>

          <div className="category-filter-pills">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`category-pill ${selectedFilter === cat ? 'active' : ''}`}
                onClick={() => setSelectedFilter(cat)}
              >
                {cat === 'เค้ก' && '🍰 '}
                {cat === 'ชา' && '🍵 '}
                {cat === 'ไอศกรีม' && '🍨 '}
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="product-cards-grid">
          {filteredItems.map((item) => (
            <article key={item.menuId || item.id} className="bakery-card">
              <div className="card-image-wrap">
                <img
                  src={item.img}
                  alt={item.name}
                  className="card-product-img"
                  loading="lazy"
                />
                <span className="item-code-badge">{item.id}</span>
                {item.isBestSeller && (
                  <span className="card-bestseller-ribbon">🏅 Best Seller</span>
                )}
              </div>

              <div className="card-body">
                <div className="card-title-row">
                  <h4 className="card-name">{item.name}</h4>
                  <span className="card-price">{item.price} บาท</span>
                </div>
                <p className="card-desc">{item.description}</p>

                <div className="card-footer">
                  <span className="card-category-tag">{item.category}</span>
                  <button
                    type="button"
                    className="btn-card-order"
                    onClick={onNavigateToOrder}
                  >
                    สั่งซื้อ
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomeView;
