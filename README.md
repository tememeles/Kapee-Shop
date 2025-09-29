# 🛒 Kapee Shop - Complete E-commerce Platform

A modern, full-stack e-commerce platform built with React, TypeScript, Node.js, and MongoDB. Features a comprehensive admin dashboard, shopping cart functionality, user authentication, and real-time data management.

![GitHub repo size](https://img.shields.io/github/repo-size/tememeles/Kapee-Shop)
![GitHub last commit](https://img.shields.io/github/last-commit/tememeles/Kapee-Shop)
![GitHub issues](https://img.shields.io/github/issues/tememeles/Kapee-Shop)

## ✨ Features

### 🛍️ **Customer Features**
- 🏠 **Modern Homepage** - Clean, responsive design with product showcase
- 🔍 **Product Browsing** - Browse products by category with search functionality
- 🛒 **Shopping Cart** - Add/remove items, update quantities, persistent cart
- 👤 **User Authentication** - Register, login, and profile management
- 📱 **Responsive Design** - Works seamlessly on all devices

### 👑 **Admin Features**
- 📊 **Dashboard Analytics** - Real-time statistics and charts
- 👥 **User Management** - View, edit, and manage all users
- 📦 **Product Management** - CRUD operations for products
- 🖼️ **Image Upload** - Cloudinary integration for product images
- 📋 **Order Management** - Track and manage customer orders
- 🔒 **Role-based Access** - Admin-only protected routes

## 🛠️ Technology Stack

### **Frontend**
- ⚛️ **React 19** - Latest React with concurrent features
- 📘 **TypeScript** - Type-safe development
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 🚀 **Vite** - Fast build tool and dev server
- 📊 **Recharts** - Beautiful data visualization

### **Backend**
- 🟢 **Node.js** - JavaScript runtime
- 🚀 **Express.js** - Web application framework
- 🗄️ **MongoDB** - NoSQL database
- 🔗 **Mongoose** - MongoDB object modeling
- 🔐 **bcrypt** - Password hashing
- ☁️ **Cloudinary** - Image management service

## 📦 Installation & Setup

### **Prerequisites**
- Node.js (v18 or higher)
- MongoDB (local or cloud)
- Cloudinary account (for image uploads)

### **1. Clone Repository**
```bash
git clone https://github.com/tememeles/Kapee-Shop.git
cd Kapee-Shop
```

### **2. Frontend Setup**
```bash
npm install
npm run dev
```

### **3. Backend Setup**
```bash
cd server
npm install
npm run dev
```

### **4. Environment Configuration**
Create `server/.env` with:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/kapee-shop
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## 🎯 Usage Guide

### **For Customers**
1. Browse products on the homepage
2. Register for a new account or login
3. Add products to cart
4. Complete checkout process

### **For Admins**
1. Login with admin credentials
2. Access dashboard at `/dashboard`
3. Manage products, orders, and users
4. View real-time analytics

## 👨‍💻 Author

**Teme Meles**
- GitHub: [@tememeles](https://github.com/tememeles)

---

⭐ **Star this repository if you found it helpful!**
