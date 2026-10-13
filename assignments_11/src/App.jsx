import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import HomeView from './components/HomeView';
import MenuView from './components/MenuView';
import OrderView from './components/OrderView';
import Toast from './components/Toast';

const API_BASE = 'http://localhost:3000/api';

function App() {
  const [activeTab, setActiveTab] = useState('menu'); // 'home' | 'menu' | 'order'
  const [mode, setMode] = useState(() => {
    return localStorage.getItem('appMode') || 'Admin';
  });

  const [food, setFood] = useState([]);
  const [types, setTypes] = useState([]);
  const [isDbConnected, setIsDbConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast((current) => (current?.message === message ? null : current));
    }, 3500);
  };

  useEffect(() => {
    localStorage.setItem('appMode', mode);
  }, [mode]);

  // Check backend health
  const checkHealth = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/check`);
      if (res.ok) {
        setIsDbConnected(true);
      } else {
        setIsDbConnected(false);
      }
    } catch {
      setIsDbConnected(false);
    }
  }, []);

  // Fetch Types from /api/type
  const fetchTypes = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/type`);
      if (res.ok) {
        const data = await res.json();
        setTypes(data);
      }
    } catch (err) {
      console.error('Error fetching types:', err);
    }
  }, []);

  // Fetch Menu from /api/menu
  const fetchMenu = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE}/menu`);
      if (res.ok) {
        const data = await res.json();
        setFood(data);
        setIsDbConnected(true);
      } else {
        throw new Error('Failed to fetch menu');
      }
    } catch (err) {
      console.error('Error fetching menu:', err);
      setIsDbConnected(false);
      showToast('ไม่สามารถเชื่อมต่อฐานข้อมูลได้ กรุณาตรวจสอบ Backend Server', 'error');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkHealth();
    fetchTypes();
    fetchMenu();
  }, [checkHealth, fetchTypes, fetchMenu]);

  // Create Menu (POST /api/menu)
  const addItem = async (item) => {
    setIsSubmitting(true);
    try {
      const res = await fetch(`${API_BASE}/menu`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      });

      if (!res.ok) {
        throw new Error('Create failed');
      }

      const savedItem = await res.json();
      setFood((prev) => [...prev, savedItem]);
      showToast(`เพิ่มเมนู "${savedItem.name}" เรียบร้อยแล้ว!`, 'success');
    } catch (err) {
      console.error('Error adding food:', err);
      showToast('เกิดข้อผิดพลาดในการเพิ่มเมนู', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Update Menu (PUT /api/menu/:id)
  const updateItem = async (menuId, updatedData) => {
    try {
      const res = await fetch(`${API_BASE}/menu/${menuId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });

      if (!res.ok) {
        throw new Error('Update failed');
      }

      const updatedMenu = await res.json();
      setFood((prev) =>
        prev.map((item) => (item.menuId === menuId ? updatedMenu : item))
      );
      showToast(`แก้ไขเมนู "${updatedMenu.name}" เรียบร้อยแล้ว!`, 'success');
    } catch (err) {
      console.error('Error updating menu:', err);
      showToast('เกิดข้อผิดพลาดในการแก้ไขข้อมูลเมนู', 'error');
    }
  };

  // Delete Menu (DELETE /api/menu/:id)
  const deleteItem = async (menuId, index) => {
    const itemToDelete = food.find((f) => f.menuId === menuId) || food[index];
    const confirmDelete = window.confirm(
      `คุณต้องการลบเมนู "${itemToDelete?.name || 'นี้'}" ใช่หรือไม่?`
    );
    if (!confirmDelete) return;

    if (menuId) {
      try {
        const res = await fetch(`${API_BASE}/menu/${menuId}`, {
          method: 'DELETE',
        });
        if (!res.ok) throw new Error('Delete failed');

        setFood((prev) => prev.filter((item) => item.menuId !== menuId));
        showToast(`ลบเมนู "${itemToDelete?.name}" สำเร็จ`, 'info');
      } catch (err) {
        console.error('Error deleting menu:', err);
        showToast('เกิดข้อผิดพลาดในการลบเมนู', 'error');
      }
    } else {
      setFood((prev) => prev.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="app-root-container">
      <Header
        mode={mode}
        setMode={setMode}
        isDbConnected={isDbConnected}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <main className="main-content-layout">
        <div className="layout-split">
          {/* Left Navigation as shown in Teacher's Slide */}
          <div className="layout-left-sidebar">
            <Sidebar
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              menuCount={food.length}
            />
          </div>

          {/* Right Main Panel */}
          <div className="layout-right-view">
            {activeTab === 'home' && (
              <HomeView
                onNavigateToMenu={() => setActiveTab('menu')}
                onNavigateToOrder={() => setActiveTab('order')}
              />
            )}

            {activeTab === 'menu' && (
              <MenuView
                food={food}
                types={types}
                mode={mode}
                deleteItem={deleteItem}
                addItem={addItem}
                updateItem={updateItem}
                fetchMenu={fetchMenu}
                isLoading={isLoading}
                isSubmitting={isSubmitting}
              />
            )}

            {activeTab === 'order' && (
              <OrderView
                onOrderSuccess={(msg) => showToast(msg, 'success')}
              />
            )}
          </div>
        </div>
      </main>

      <footer className="app-footer">
        <p>Neptuny Bakery &copy; 2026 - Web Applications Assignment 11</p>
      </footer>

      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}

export default App;
