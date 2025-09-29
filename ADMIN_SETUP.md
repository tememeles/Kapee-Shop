# Admin Access Setup

This application now has role-based access control where only admin users can access the dashboard, add products, and manage orders.

## Setting up Admin Access

### 1. Create Admin User

To create the default admin user, run the following command in the server directory:

```bash
cd server
npm run create-admin
```

This will create an admin user with the following credentials:
- **Email:** admin@kapee.com
- **Password:** admin123

⚠️ **Important:** Change the default password after first login for security.

### 2. Manual Admin Creation

You can also create admin users manually by making a POST request to `/api/users` with the role field:

```bash
curl -X POST http://localhost:5000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin User",
    "email": "admin@example.com",
    "password": "your-secure-password",
    "role": "admin"
  }'
```

## User Roles

- **user** (default): Can browse products, place orders, but cannot access admin features
- **admin**: Can access all features including:
  - Admin Dashboard
  - Add/Edit/Delete Products
  - View and Manage Orders
  - Settings

## Admin Features

Once logged in as an admin, you'll have access to:

1. **Dashboard** (`/dashboard`): Analytics and overview
2. **Add Products** (`/addproducts`): Manage product inventory
3. **Orders** (`/orders`): View and manage customer orders
4. **Settings** (`/settings`): Application settings

## Access Control

- Non-admin users trying to access admin routes will see an "Access Denied" page
- Unauthenticated users will be redirected to the login page
- The navbar shows different options based on user role and authentication status

## Security Notes

1. Admin passwords should be strong and unique
2. Consider implementing password change functionality
3. For production, use proper JWT tokens instead of localStorage
4. Implement password reset functionality for admin users