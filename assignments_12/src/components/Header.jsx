import React from 'react';

const Header = ({ mode, user, onLogin, onLogout, isDbConnected }) => (
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
        <span className="status-dot" />
        <span className="status-text">{isDbConnected ? 'MySQL Connected' : 'Connecting to DB...'}</span>
      </div>
      <span className="mode-label-text">{mode.toUpperCase()} MODE</span>
      {user ? <>
        <span className="account-name">{user.name}</span>
        <button className="account-button" type="button" onClick={onLogout}>Logout</button>
      </> : <button className="account-button" type="button" onClick={onLogin}>Login</button>}
    </div>
  </header>
);

export default Header;
