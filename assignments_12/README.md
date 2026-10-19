# Neptuny Bakery - Authentication and Roles (Assignment 12)

## Assignment 12: Guest / User / Admin

### บัญชีสำหรับทดลอง

| โหมด | Email | Password | สิทธิ์ |
|---|---|---|---|
| Guest | ไม่ต้องเข้าสู่ระบบ | ไม่ต้องใช้ | ดูเมนู |
| User | `user@neptuny.local` | `12345678` | ดูเมนูและให้คะแนนอาหาร |
| Admin | `admin@neptuny.local` | `12345678` | จัดการเมนูและ role ของผู้ใช้ |

เปิด MySQL แล้วตั้งค่าตาราง `User`, `Session` และ `Rating` พร้อมบัญชีตัวอย่าง (ไม่ลบเมนูเดิม):

```powershell
cd assignments_12/backend
npm.cmd run db:push
$env:ADMIN_EMAIL = 'admin@neptuny.local'
$env:ADMIN_PASSWORD = '12345678'
$env:USER_EMAIL = 'user@neptuny.local'
$env:USER_PASSWORD = '12345678'
npm.cmd run seed:users
cd ..
npm.cmd run dev
```

`seed:users` สร้างบัญชีที่ยังไม่มี และตั้งรหัสผ่านใหม่ให้บัญชีที่มีอีเมลตรงกัน รหัสในฐานข้อมูลเก็บเป็น salted scrypt hash เปิดเว็บที่ `http://localhost:5173` เพื่อทดสอบ Login/Logout; เมื่อ Admin เปิดหน้า Menu จะมีปุ่ม **จัดการเมนู / จัดการผู้ใช้** สลับเนื้อหาในพื้นที่เดียวกัน server ตรวจสอบ role ใน API ทุกครั้งที่แก้ไขข้อมูล และ session อยู่ใน HTTP-only cookie อายุ 7 วัน บัญชีและรหัสนี้ใช้สำหรับงานจำลองเท่านั้น

โปรเจกต์ Full Stack Web Application สำหรับ **Assignment 12** ต่อยอดจากงานครั้งก่อน เพิ่มการเข้าสู่ระบบและสิทธิ์ guest/user/admin บนฐานข้อมูล MySQL ผ่าน Express และ Prisma ORM

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
เปิด Terminal ที่โฟลเดอร์ `assignments_12` แล้วพิมพ์:

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
   - สิทธิ์ **Guest / User / Admin** จากการเข้าสู่ระบบ โดย server ตรวจสอบ role ก่อนแก้ไขข้อมูล
3. **หน้า Home**: นำเสนอภาพและเรื่องราวของร้าน **Neptuny Bakery** จากงานเดิม พร้อมรูปภาพเมนูเค้ก ชา และไอศกรีม
4. **หน้า Order**: แบบฟอร์มสั่งซื้อสินค้า คำนวณราคารวม ค่าจัดส่ง และสรุปยอดแบบเรียลไทม์
