import React, { useState } from 'react';

export default function LoginModal({ onClose, onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setBusy(true);
    setError('');
    try { await onLogin(email, password); }
    catch (err) { setError(err.message); }
    finally { setBusy(false); }
  };

  return <div className="auth-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <form className="auth-card" onSubmit={submit} aria-label="Login">
      <button className="auth-close" type="button" aria-label="Close" onClick={onClose}>×</button>
      <h2>Login</h2>
      <p>เข้าสู่ระบบเพื่อใช้งาน User หรือ Admin mode</p>
      <label htmlFor="login-email">Email</label>
      <input id="login-email" type="email" autoComplete="username" required value={email} onChange={(e) => setEmail(e.target.value)} autoFocus />
      <label htmlFor="login-password">Password</label>
      <input id="login-password" type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} />
      {error && <p className="auth-error" role="alert">{error}</p>}
      <button className="btn-submit" disabled={busy}>{busy ? 'กำลังเข้าสู่ระบบ...' : 'Login'}</button>
      <button className="guest-link" type="button" onClick={onClose}>Continue as guest</button>
    </form>
  </div>;
}
