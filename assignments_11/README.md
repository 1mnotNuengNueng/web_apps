# Neptuny Bakery - Full Stack Menu Management (Assignment 11)

โปรเจกต์ Full Stack Web Application พัฒนาขึ้นสำหรับ **Assignment 11** โดยต่อยอดและปรับแก้จากงานครั้งก่อน ให้สามารถเชื่อมต่อกับฐานข้อมูล MySQL ผ่าน Backend API ด้วย Express และ Prisma ORM รองรับการเพิ่ม ลบ แก้ไข (CRUD) รายการเมนู และตกแต่ง UI ให้สวยงามทันสมัยระดับพรีเมียม

---

## 🚀 เทคโนโลยีที่ใช้ (Tech Stack)

### **Frontend**
- **React 19** + **Vite 8**
- **Vanilla CSS (Design System Tokens)**: ตกแต่งด้วย Glassmorphism, Gradient แสงเงา, Micro-animations, Google Fonts (`Prompt` & `Outfit`)
- **Responsive Layout**: รองรับทั้งจอคอมพิวเตอร์และมือถือ
- ระบบแจ้งเตือน Toast Notifications แบบเรียลไทม์

### **Backend**
- **Node.js** + **Express.js**
- **Prisma ORM** เชื่อมต่อกับ **MySQL (`myshop`)**
- **CORS** และ **Nodemon** สำหรับ Hot-reloading

---

## 🗄️ โครงสร้างฐานข้อมูล (Database Schema)

### ตาราง `type`
| Field | Type | Description |
|---|---|---|
| `typeId` | Int (PK) | รหัสประเภท (Auto Increment) |
| `name` | String | ชื่อประเภท (เช่น Dessert, Bakery, Drink) |

### ตาราง `menu`
| Field | Type | Description |
|---|---|---|
| `menuId` | Int (PK) | รหัสเมนู (Auto Increment) |
| `name` | String | ชื่อเมนู (เช่น cake, bread, milk) |
| `price` | Float | ราคา (บาท) |
| `isBestSeller` | Boolean | เป็นสินค้าขายดีหรือไม่ (`true`/`false`) |
| `typeId` | Int (FK) | รหัสประเภทเมนู เชื่อมกับ `type.typeId` |

---

## 🔌 API Endpoints

### 🍽️ Menu APIs (`/api/menu`)
- `GET /api/menu` : ดึงรายการเมนูทั้งหมด (พร้อมข้อมูลประเภท `type`)
- `GET /api/menu/:id` : ดึงข้อมูลเมนูตาม ID
- `POST /api/menu` : เพิ่มเมนูใหม่ (`name`, `price`, `isBestSeller`, `typeId`)
- `PUT /api/menu/:id` : แก้ไขเมนูตาม ID
- `DELETE /api/menu/:id` : ลบเมนูตาม ID

### 🏷️ Type APIs (`/api/type`)
- `GET /api/type` : ดึงประเภทเมนูทั้งหมด
- `GET /api/type/:id` : ดึงข้อมูลประเภทตาม ID
- `POST /api/type` : เพิ่มประเภทเมนูใหม่
- `PUT /api/type/:id` : แก้ไขประเภท
- `DELETE /api/type/:id` : ลบประเภท

### 🩺 Health Check
- `GET /api/check` : ตรวจสอบสถานะการทำงานของ API

---

## 💻 วิธีการรันโปรเจกต์ (How to Run)

### 1. ตรวจสอบการเปิด MySQL
เปิดโปรแกรม **XAMPP Control Panel** แล้วกด **Start MySQL** (หรือตรวจสอบว่า Port 3306 กำลังเปิดใช้งาน)

### 2. รันระบบพร้อมกันทั้ง Frontend และ Backend
เปิด Terminal ที่โฟลเดอร์ `assignments_11` แล้วพิมพ์:

```bash
npm run dev
```

- **Frontend (Vite)**: เปิดที่ `http://localhost:5173`
- **Backend (API)**: เปิดที่ `http://localhost:3000`

---

## ✨ ฟีเจอร์เด่นในระบบ

1. **ปุ่ม Navigation (Home / Menu / Order)**: ออกแบบตามภาพตัวอย่างของอาจารย์ พร้อมการไฮไลต์สถานะแท็บ
2. **หน้า Menu (Our Menu)**:
   - แสดงรายการเมนูครบถ้วน พร้อมสัญลักษณ์จุด • ราคา และเหรียญ 🏅 Best Seller
   - ฟอร์ม **New Food** เพิ่มเมนูใหม่พร้อมเลือกประเภทและสถานะ Best Seller
   - ปุ่ม **Edit (แก้ไข)** เปิดหน้าต่าง Modal ให้แก้ไขชื่อ ราคา หมวดหมู่ และสถานะ
   - ปุ่ม **Del (ลบ)** พร้อมกล่องยืนยันก่อนลบ ป้องกันการกดผิด
   - แถบค้นหา (Search) และตัวกรองหมวดหมู่ (Category Filters)
   - สวิตช์ **User Mode / Admin Mode** เพื่อควบคุมสิทธิ์การจัดการเมนู
3. **หน้า Home**: นำเสนอภาพและเรื่องราวของร้าน **Neptuny Bakery** จากงานเดิม พร้อมรูปภาพเมนูเค้ก ชา และไอศกรีม
4. **หน้า Order**: แบบฟอร์มสั่งซื้อสินค้า คำนวณราคารวม ค่าจัดส่ง และสรุปยอดแบบเรียลไทม์
