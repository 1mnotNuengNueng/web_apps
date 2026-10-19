import React from 'react';

const Sidebar = ({ activeTab, setActiveTab, menuCount }) => {
  return (
    <aside className="app-sidebar" aria-label="Main Navigation">
      <div className="nav-button-group">
        <button
          id="nav-home-btn"
          className={`sidebar-nav-btn ${activeTab === 'home' ? 'active' : ''}`}
          onClick={() => setActiveTab('home')}
          aria-current={activeTab === 'home' ? 'page' : undefined}
        >
          <span className="btn-label">Home</span>
        </button>

        <button
          id="nav-menu-btn"
          className={`sidebar-nav-btn ${activeTab === 'menu' || activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('menu')}
          aria-current={activeTab === 'menu' || activeTab === 'users' ? 'page' : undefined}
        >
          <span className="btn-label">Menu</span>
          {menuCount !== undefined && menuCount > 0 && (
            <span className="menu-count-pill">{menuCount}</span>
          )}
        </button>

        <button
          id="nav-order-btn"
          className={`sidebar-nav-btn nav-order-pill ${activeTab === 'order' ? 'active' : ''}`}
          onClick={() => setActiveTab('order')}
          aria-current={activeTab === 'order' ? 'page' : undefined}
        >
          <span className="btn-label">Order</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
