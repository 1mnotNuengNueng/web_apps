import React, { useEffect, useState } from 'react';

export default function UsersView() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/auth/users').then((res) => {
      if (!res.ok) throw new Error('โหลดรายชื่อผู้ใช้ไม่สำเร็จ');
      return res.json();
    }).then(setUsers).catch((err) => setError(err.message));
  }, []);

  const changeRole = async (userId, role) => {
    const res = await fetch(`/api/auth/users/${userId}/role`, {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ role }),
    });
    if (!res.ok) {
      setError((await res.json()).error || 'เปลี่ยน role ไม่สำเร็จ');
      return;
    }
    setUsers((current) => current.map((user) => user.userId === userId ? { ...user, role } : user));
    setError('');
  };

  return <section className="users-card">
    <h2>Users</h2>
    {error && <p className="auth-error" role="alert">{error}</p>}
    <ul className="users-list">{users.map((user) => <li key={user.userId}>
      <span><strong>{user.name}</strong><br />{user.email}</span>
      <select aria-label={`Role for ${user.name}`} value={user.role} onChange={(event) => changeRole(user.userId, event.target.value)}>
        <option value="user">user</option><option value="admin">admin</option>
      </select>
    </li>)}</ul>
  </section>;
}
