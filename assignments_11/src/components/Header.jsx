import React from 'react';

const Header = ({ mode, setMode, isDbConnected, activeTab, setActiveTab }) => {
  return (
    <header className="main-app-header">
      <div className="header-brand-section">
        <div className="brand-logo-icon">🥐</div>
        <div className="brand-titles">
          <h1 className="brand-title">Neptuny Bakery</h1>
          <p className="brand-subtitle">Full Stack Menu Management System</p>
        </div>
      </div>

      <div className="header-controls">
        <div className={`db-status-pill ${isDbConnected ? 'connected' : 'disconnected'}`}>
          <span className="status-dot"></span>
          <span className="status-text">
            {isDbConnected ? 'MySQL Connected' : 'Connecting to DB...'}
          </span>
        </div>

        <div className="mode-toggle-group">
          <span className="mode-label-text">
            {mode === 'Admin' ? 'ADMIN MODE' : 'USER MODE'}
          </span>
          <div className="toggle-switch-pill">
            <button
              type="button"
              id="mode-user-btn"
              className={`toggle-option ${mode === 'User' ? 'active' : ''}`}
              onClick={() => setMode('User')}
            >
              User Mode
            </button>
            <button
              type="button"
              id="mode-admin-btn"
              className={`toggle-option admin ${mode === 'Admin' ? 'active' : ''}`}
              onClick={() => setMode('Admin')}
            >
              Admin
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
