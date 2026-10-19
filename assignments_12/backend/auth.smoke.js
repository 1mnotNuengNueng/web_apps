const assert = require('node:assert/strict');

const base = 'http://localhost:3000/api';
async function request(path, options = {}) {
  const res = await fetch(base + path, options);
  return { status: res.status, cookie: res.headers.get('set-cookie')?.split(';')[0], body: res.status === 204 ? null : await res.json() };
}

async function main() {
  assert.equal((await request('/auth/me')).body, null);
  assert.equal((await request('/menu', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{}' })).status, 401);
  const menu = (await request('/menu')).body;
  assert(Array.isArray(menu));
  const login = (email, password) => request('/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) });
  const user = await login(process.env.USER_EMAIL, process.env.USER_PASSWORD);
  assert.equal(user.status, 200);
  assert.equal(user.body.role, 'user');
  assert.equal((await request('/auth/users', { headers: { Cookie: user.cookie } })).status, 403);
  if (menu.length) {
    assert.equal((await request(`/menu/${menu[0].menuId}/rating`, { method: 'PUT', headers: { Cookie: user.cookie, 'Content-Type': 'application/json' }, body: JSON.stringify({ value: 5 }) })).status, 200);
  }
  const admin = await login(process.env.ADMIN_EMAIL, process.env.ADMIN_PASSWORD);
  assert.equal(admin.status, 200);
  assert.equal(admin.body.role, 'admin');
  assert.equal((await request('/auth/users', { headers: { Cookie: admin.cookie } })).status, 200);
  assert.equal((await request('/auth/logout', { method: 'POST', headers: { Cookie: admin.cookie } })).status, 204);
  assert.equal((await request('/auth/users', { headers: { Cookie: admin.cookie } })).status, 401);
  console.log('Authentication and role smoke checks passed');
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
