import React, { useState } from 'react';

const bakeryCatalog = [
  {
    id: 'CK-01',
    name: 'เค้กแครอท',
    nameEn: 'Carrot Cake',
    category: 'ขนม',
    price: 50,
    img: '/img/carrotcake.jpg',
    description: 'เค้กแครอทสูตรโฮมเมด เนื้อนุ่มชุ่มฉ่ำ หอมกลิ่นชินนามอนอ่อนๆ',
    isBestSeller: true,
  },
  {
    id: 'CK-02',
    name: 'เค้กมัทฉะ',
    nameEn: 'Matcha Cake',
    category: 'ขนม',
    price: 50,
    img: '/img/matchacake.webp',
    description: 'มัทฉะเข้มข้นแท้จากญี่ปุ่น รสสัมผัสละมุน กลมกล่อม ไม่หวานเลี่ยน',
    isBestSeller: true,
  },
  {
    id: 'CK-03',
    name: 'เค้กฟักทอง',
    nameEn: 'Pumpkin Cake',
    category: 'ขนม',
    price: 50,
    img: '/img/pumkincake.webp',
    description: 'ฟักทองญี่ปุ่นคัดพิเศษ หวานมันจากธรรมชาติ อบสดใหม่ทุกวัน',
    isBestSeller: false,
  },
  {
    id: 'T-01',
    name: 'แครอทลาเต้',
    nameEn: 'Carrot Latte',
    category: 'ชา',
    price: 50,
    img: '/img/carrotlatte.jpg',
    description: 'เครื่องดื่มสุขภาพ ผสานความสดชื่นของแครอทกับนมอุ่นละมุน',
    isBestSeller: false,
  },
  {
    id: 'T-02',
    name: 'มัทฉะลาเต้',
    nameEn: 'Matcha Latte',
    category: 'ชา',
    price: 50,
    img: '/img/matchalatte.jpg',
    description: 'ชาเขียวมัทฉะพรีเมียมตีฟองนมนุ่ม ละลายในปาก หอมกรุ่น',
    isBestSeller: true,
  },
  {
    id: 'T-03',
    name: 'ฟักทองลาเต้',
    nameEn: 'Pumpkin Latte',
    category: 'ชา',
    price: 50,
    img: '/img/pumpkinlatte.jpg',
    description: 'ลาเต้รสฟักทองอบอุ่น เสิร์ฟร้อนหรือเย็น หอมมันกำลังดี',
    isBestSeller: false,
  },
  {
    id: 'IC-01',
    name: 'ไอศกรีมแครอท',
    nameEn: 'Carrot Ice Cream',
    category: 'ไอศกรีม',
    price: 50,
    img: '/img/carrot-ice-cream.jpg',
    description: 'ไอศกรีมโฮมเมดสไตล์เจลาโต หวานเบาๆ สดชื่นคลายร้อน',
    isBestSeller: false,
  },
  {
    id: 'IC-02',
    name: 'ไอศกรีมมัทฉะ',
    nameEn: 'Matcha Ice Cream',
    category: 'ไอศกรีม',
    price: 50,
    img: '/img/matcha-ice-cream.jpg',
    description: 'ไอศกรีมมัทฉะเข้มข้นสัมผัสพรีเมียม อร่อยถูกใจสายชาเขียว',
    isBestSeller: true,
  },
  {
    id: 'IC-03',
    name: 'ไอศกรีมฟักทอง',
    nameEn: 'Pumpkin Ice Cream',
    category: 'ไอศกรีม',
    price: 50,
    img: '/img/pumpkin-ice-cream.jpg',
    description: 'เนื้อฟักทองแท้ผสมครีมนมสด ละมุนลิ้นไม่ซ้ำใคร',
    isBestSeller: false,
  },
];

const HomeView = ({ onNavigateToMenu, onNavigateToOrder }) => {
  const [selectedFilter, setSelectedFilter] = useState('ทั้งหมด');

  const categories = ['ทั้งหมด', 'ขนม', 'ชา', 'ไอศกรีม'];

  const filteredItems =
    selectedFilter === 'ทั้งหมด'
      ? bakeryCatalog
      : bakeryCatalog.filter((item) => item.category === selectedFilter);

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

      {/* Showcase Grid from previous assignment */}
      <section className="showcase-section">
        <div className="showcase-header">
          <div>
            <h3 className="section-title">เมนูประจำร้าน (Signature Collection)</h3>
            <p className="section-subtitle">
              เลือกสรรขนม ชา รวมถึงไอศกรีมจากทางร้านที่มีมากมายหลายรายการได้อย่างตามใจชอบ
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
                {cat === 'ขนม' && '🍰 '}
                {cat === 'ชา' && '🍵 '}
                {cat === 'ไอศกรีม' && '🍨 '}
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="product-cards-grid">
          {filteredItems.map((item) => (
            <article key={item.id} className="bakery-card">
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
                <p className="card-name-en">{item.nameEn}</p>
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
