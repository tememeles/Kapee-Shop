# Kapee Shop API Documentation

Welcome to the Kapee Shop API documentation. This RESTful API provides comprehensive endpoints for managing an e-commerce platform including products, orders, users, best-selling items, image uploads, and more.

## Base URL
```
http://localhost:5000/api
```

## Table of Contents
- [Authentication](#authentication)
- [Products API](#products-api)
- [Best Selling Products API](#best-selling-products-api)
- [Orders API](#orders-api)
- [Users API](#users-api)
- [Upload API](#upload-api)
- [OTP API](#otp-api)
- [Blogs API](#blogs-api)
- [Contact API](#contact-api)
- [Error Handling](#error-handling)
- [Status Codes](#status-codes)

---

## Authentication

### Register User
Create a new user account.

**Endpoint:** `POST /api/users`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "role": "user" // Optional: "user" or "admin", defaults to "user"
}
```

**Response (201):**
```json
{
  "message": "User created successfully",
  "user": {
    "_id": "64a1b2c3d4e5f6789abcdef0",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "createdAt": "2023-09-30T12:00:00.000Z"
  }
}
```

### Login
Authenticate a user and receive access credentials.

**Endpoint:** `POST /api/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response (200):**
```json
{
  "message": "Login successful",
  "user": {
    "_id": "64a1b2c3d4e5f6789abcdef0",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  },
  "token": "jwt-token-here"
}
```

### Reset Password
Request a password reset.

**Endpoint:** `POST /api/reset-password`

**Request Body:**
```json
{
  "email": "john@example.com",
  "newPassword": "newSecurePassword123"
}
```

**Response (200):**
```json
{
  "message": "Password reset successfully"
}
```

---

## Products API

### Get All Products
Retrieve all products with optional filtering, searching, and sorting.

**Endpoint:** `GET /api/products`

**Query Parameters:**
- `category` (string): Filter by product category
- `inStock` (boolean): Filter by stock availability (true/false)
- `minPrice` (number): Minimum price filter
- `maxPrice` (number): Maximum price filter
- `search` (string): Search in product name, description, or category
- `sort` (string): Sort order - "price_asc", "price_desc", "name_asc", "name_desc"

**Example:** `GET /api/products?category=electronics&inStock=true&sort=price_asc`

**Response (200):**
```json
[
  {
    "_id": "64a1b2c3d4e5f6789abcdef1",
    "productname": "Wireless Headphones",
    "productdescrib": "High-quality wireless headphones with noise cancellation",
    "productprice": 99.99,
    "productquantity": 50,
    "category": "electronics",
    "image": "https://cloudinary.com/image/url",
    "createdAt": "2023-09-30T12:00:00.000Z",
    "updatedAt": "2023-09-30T12:00:00.000Z"
  }
]
```

### Get Single Product
Retrieve details of a specific product.

**Endpoint:** `GET /api/products/:id`

**Response (200):**
```json
{
  "_id": "64a1b2c3d4e5f6789abcdef1",
  "productname": "Wireless Headphones",
  "productdescrib": "High-quality wireless headphones with noise cancellation",
  "productprice": 99.99,
  "productquantity": 50,
  "category": "electronics",
  "image": "https://cloudinary.com/image/url",
  "createdAt": "2023-09-30T12:00:00.000Z",
  "updatedAt": "2023-09-30T12:00:00.000Z"
}
```

### Create Product
Add a new product to the catalog.

**Endpoint:** `POST /api/products`

**Request Body:**
```json
{
  "productname": "Smart Watch",
  "productdescrib": "Advanced fitness tracking smartwatch",
  "productprice": 299.99,
  "productquantity": 25,
  "category": "electronics",
  "image": "https://cloudinary.com/image/url"
}
```

**Response (201):**
```json
{
  "_id": "64a1b2c3d4e5f6789abcdef2",
  "productname": "Smart Watch",
  "productdescrib": "Advanced fitness tracking smartwatch",
  "productprice": 299.99,
  "productquantity": 25,
  "category": "electronics",
  "image": "https://cloudinary.com/image/url",
  "createdAt": "2023-09-30T12:00:00.000Z",
  "updatedAt": "2023-09-30T12:00:00.000Z"
}
```

### Update Product
Modify an existing product.

**Endpoint:** `PUT /api/products/:id`

**Request Body:** (Same as Create Product)

**Response (200):**
```json
{
  "message": "Product updated successfully",
  "product": { /* Updated product object */ }
}
```

### Delete Product
Remove a product from the catalog.

**Endpoint:** `DELETE /api/products/:id`

**Response (200):**
```json
{
  "message": "Product deleted successfully"
}
```

### Seed Products
Populate the database with sample products (Development only).

**Endpoint:** `POST /api/products/seed`

**Response (200):**
```json
{
  "message": "Products seeded successfully",
  "count": 15
}
```

---

## Best Selling Products API

### Get All Best Selling Products
Retrieve best-selling products with optional filtering.

**Endpoint:** `GET /api/bestselling`

**Query Parameters:**
- `limit` (number): Maximum number of products to return (default: 10)
- `category` (string): Filter by product category
- `featured` (boolean): Filter by featured status

**Response (200):**
```json
[
  {
    "_id": "64a1b2c3d4e5f6789abcdef3",
    "productId": "64a1b2c3d4e5f6789abcdef1",
    "productname": "Wireless Headphones",
    "productdescrib": "High-quality wireless headphones",
    "productprice": 99.99,
    "category": "electronics",
    "image": "https://cloudinary.com/image/url",
    "salesCount": 150,
    "discount": 10,
    "label": "Best Seller",
    "featured": true,
    "createdAt": "2023-09-30T12:00:00.000Z"
  }
]
```

### Get Featured Best Selling Products
Retrieve only featured best-selling products (for homepage display).

**Endpoint:** `GET /api/bestselling/featured`

**Query Parameters:**
- `limit` (number): Maximum number of products to return (default: 8)

**Response (200):**
```json
[
  {
    "_id": "64a1b2c3d4e5f6789abcdef3",
    "productId": "64a1b2c3d4e5f6789abcdef1",
    "productname": "Wireless Headphones",
    "productdescrib": "High-quality wireless headphones",
    "productprice": 99.99,
    "category": "electronics",
    "image": "https://cloudinary.com/image/url",
    "salesCount": 150,
    "discount": 10,
    "label": "Best Seller",
    "featured": true,
    "createdAt": "2023-09-30T12:00:00.000Z"
  }
]
```

### Add Product to Best Selling
Add a product to the best-selling collection.

**Endpoint:** `POST /api/bestselling`

**Request Body:**
```json
{
  "productId": "64a1b2c3d4e5f6789abcdef1",
  "productname": "Wireless Headphones",
  "productdescrib": "High-quality wireless headphones",
  "productprice": 99.99,
  "category": "electronics",
  "image": "https://cloudinary.com/image/url",
  "salesCount": 150,
  "discount": 10,
  "label": "Best Seller",
  "featured": true
}
```

**Response (201):**
```json
{
  "_id": "64a1b2c3d4e5f6789abcdef3",
  "productId": "64a1b2c3d4e5f6789abcdef1",
  "productname": "Wireless Headphones",
  "salesCount": 150,
  "discount": 10,
  "label": "Best Seller",
  "featured": true,
  "createdAt": "2023-09-30T12:00:00.000Z"
}
```

### Update Best Selling Product
Modify a best-selling product entry.

**Endpoint:** `PUT /api/bestselling/:id`

**Request Body:**
```json
{
  "salesCount": 175,
  "discount": 15,
  "label": "Top Seller",
  "featured": true
}
```

**Response (200):**
```json
{
  "message": "Best selling product updated successfully",
  "product": { /* Updated best selling product object */ }
}
```

### Delete Best Selling Product
Remove a product from the best-selling collection.

**Endpoint:** `DELETE /api/bestselling/:id`

**Response (200):**
```json
{
  "message": "Product removed from best selling successfully"
}
```

---

## Orders API

### Create Single Order
Create a new order for a single product.

**Endpoint:** `POST /api/orders`

**Request Body:**
```json
{
  "userId": "64a1b2c3d4e5f6789abcdef0",
  "productId": "64a1b2c3d4e5f6789abcdef1",
  "quantity": 2,
  "totalAmount": 199.98,
  "shippingAddress": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA"
  }
}
```

**Response (201):**
```json
{
  "_id": "64a1b2c3d4e5f6789abcdef4",
  "userId": "64a1b2c3d4e5f6789abcdef0",
  "productId": "64a1b2c3d4e5f6789abcdef1",
  "quantity": 2,
  "totalAmount": 199.98,
  "status": "pending",
  "shippingAddress": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA"
  },
  "createdAt": "2023-09-30T12:00:00.000Z"
}
```

### Create Batch Order
Create an order with multiple products.

**Endpoint:** `POST /api/orders/batch`

**Request Body:**
```json
{
  "userId": "64a1b2c3d4e5f6789abcdef0",
  "items": [
    {
      "productId": "64a1b2c3d4e5f6789abcdef1",
      "quantity": 2,
      "price": 99.99
    },
    {
      "productId": "64a1b2c3d4e5f6789abcdef2",
      "quantity": 1,
      "price": 299.99
    }
  ],
  "totalAmount": 499.97,
  "shippingAddress": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA"
  }
}
```

**Response (201):**
```json
{
  "_id": "64a1b2c3d4e5f6789abcdef5",
  "userId": "64a1b2c3d4e5f6789abcdef0",
  "items": [
    {
      "productId": "64a1b2c3d4e5f6789abcdef1",
      "quantity": 2,
      "price": 99.99
    },
    {
      "productId": "64a1b2c3d4e5f6789abcdef2",
      "quantity": 1,
      "price": 299.99
    }
  ],
  "totalAmount": 499.97,
  "status": "pending",
  "shippingAddress": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA"
  },
  "createdAt": "2023-09-30T12:00:00.000Z"
}
```

### Get All Orders
Retrieve all orders.

**Endpoint:** `GET /api/orders`

**Response (200):**
```json
[
  {
    "_id": "64a1b2c3d4e5f6789abcdef4",
    "userId": "64a1b2c3d4e5f6789abcdef0",
    "productId": "64a1b2c3d4e5f6789abcdef1",
    "quantity": 2,
    "totalAmount": 199.98,
    "status": "pending",
    "shippingAddress": {
      "street": "123 Main St",
      "city": "New York",
      "state": "NY",
      "zipCode": "10001",
      "country": "USA"
    },
    "createdAt": "2023-09-30T12:00:00.000Z"
  }
]
```

### Get Single Order
Retrieve details of a specific order.

**Endpoint:** `GET /api/orders/:id`

**Response (200):** (Same as single order object above)

### Update Order
Modify an existing order.

**Endpoint:** `PUT /api/orders/:id`

**Request Body:**
```json
{
  "status": "shipped",
  "trackingNumber": "TN123456789"
}
```

**Response (200):**
```json
{
  "message": "Order updated successfully",
  "order": { /* Updated order object */ }
}
```

### Delete Order
Cancel/delete an order.

**Endpoint:** `DELETE /api/orders/:id`

**Response (200):**
```json
{
  "message": "Order deleted successfully"
}
```

---

## Users API

### Get All Users
Retrieve all users (Admin access typically required).

**Endpoint:** `GET /api/users`

**Response (200):**
```json
[
  {
    "_id": "64a1b2c3d4e5f6789abcdef0",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "createdAt": "2023-09-30T12:00:00.000Z"
  }
]
```

### Get Single User
Retrieve details of a specific user.

**Endpoint:** `GET /api/users/:id`

**Response (200):**
```json
{
  "_id": "64a1b2c3d4e5f6789abcdef0",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "user",
  "createdAt": "2023-09-30T12:00:00.000Z"
}
```

### Update User
Modify user information.

**Endpoint:** `PUT /api/users/:id`

**Request Body:**
```json
{
  "name": "John Smith",
  "email": "johnsmith@example.com",
  "role": "admin"
}
```

**Response (200):**
```json
{
  "message": "User updated successfully",
  "user": { /* Updated user object */ }
}
```

### Delete User
Remove a user account.

**Endpoint:** `DELETE /api/users/:id`

**Response (200):**
```json
{
  "message": "User deleted successfully"
}
```

---

## Upload API

### Upload Image
Upload an image file to Cloudinary storage.

**Endpoint:** `POST /api/upload`

**Content-Type:** `multipart/form-data`

**Form Data:**
- `image` (file): Image file to upload (JPEG, PNG, GIF, WebP supported)

**Example using curl:**
```bash
curl -X POST \
  http://localhost:5000/api/upload \
  -H 'Content-Type: multipart/form-data' \
  -F 'image=@/path/to/your/image.jpg'
```

**Response (200):**
```json
{
  "success": true,
  "message": "Image uploaded successfully",
  "url": "https://res.cloudinary.com/your-cloud/image/upload/v1234567890/sample.jpg",
  "public_id": "sample",
  "width": 1920,
  "height": 1080,
  "format": "jpg",
  "bytes": 245760
}
```

**Error Response (400):**
```json
{
  "success": false,
  "error": "No image file provided."
}
```

**Error Response (500):**
```json
{
  "success": false,
  "error": "Failed to upload image to Cloudinary",
  "details": "Error details here"
}
```

---

## OTP API

### Create OTP
Generate a new OTP for verification purposes.

**Endpoint:** `POST /api/otp/create`

**Request Body:**
```json
{
  "email": "user@example.com",
  "purpose": "email_verification" // or "password_reset"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "OTP sent successfully",
  "expiresAt": "2023-09-30T12:10:00.000Z"
}
```

### Verify OTP
Verify an OTP code.

**Endpoint:** `POST /api/otp/verify`

**Request Body:**
```json
{
  "email": "user@example.com",
  "otp": "123456",
  "purpose": "email_verification"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "OTP verified successfully"
}
```

### Resend OTP
Resend an OTP code.

**Endpoint:** `POST /api/otp/resend`

**Request Body:**
```json
{
  "email": "user@example.com",
  "purpose": "email_verification"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "OTP resent successfully",
  "expiresAt": "2023-09-30T12:10:00.000Z"
}
```

---

## Blogs API

### Get All Blogs
Retrieve all blog posts.

**Endpoint:** `GET /api/blogs`

**Response (200):**
```json
[
  {
    "_id": "64a1b2c3d4e5f6789abcdef6",
    "title": "Latest Tech Trends",
    "content": "Blog content here...",
    "author": "John Doe",
    "category": "technology",
    "tags": ["tech", "trends", "innovation"],
    "published": true,
    "createdAt": "2023-09-30T12:00:00.000Z",
    "updatedAt": "2023-09-30T12:00:00.000Z"
  }
]
```

### Get Blogs by Category
Retrieve blog posts filtered by category.

**Endpoint:** `GET /api/blogs/category/:category`

**Example:** `GET /api/blogs/category/technology`

**Response (200):** (Same as Get All Blogs but filtered)

### Get Blogs by Author
Retrieve blog posts filtered by author.

**Endpoint:** `GET /api/blogs/author/:author`

**Example:** `GET /api/blogs/author/john-doe`

**Response (200):** (Same as Get All Blogs but filtered)

---

## Contact API

### Submit Contact Form
Submit a contact form message.

**Endpoint:** `POST /api/contact`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Product Inquiry",
  "message": "I have a question about your wireless headphones..."
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Contact form submitted successfully",
  "contactId": "64a1b2c3d4e5f6789abcdef7"
}
```

---

## Error Handling

The API uses standard HTTP status codes and returns JSON error responses in the following format:

```json
{
  "error": "Error message describing what went wrong",
  "details": "Additional error details (optional)"
}
```

### Common Error Responses

**400 Bad Request:**
```json
{
  "error": "Invalid request data",
  "details": "Product name is required"
}
```

**401 Unauthorized:**
```json
{
  "error": "Unauthorized access",
  "details": "Valid authentication token required"
}
```

**404 Not Found:**
```json
{
  "error": "Resource not found",
  "details": "Product with ID 64a1b2c3d4e5f6789abcdef1 not found"
}
```

**500 Internal Server Error:**
```json
{
  "error": "Internal server error",
  "details": "Database connection failed"
}
```

---

## Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created successfully |
| 400 | Bad Request - Invalid request data |
| 401 | Unauthorized - Authentication required |
| 403 | Forbidden - Access denied |
| 404 | Not Found - Resource not found |
| 409 | Conflict - Resource already exists |
| 422 | Unprocessable Entity - Validation failed |
| 500 | Internal Server Error - Server error |

---

## Rate Limiting

The API currently does not implement rate limiting, but it's recommended to implement it in production environments.

## CORS

The API allows cross-origin requests from all origins (`*`). In production, this should be restricted to your frontend domain.

## Security

- Passwords are hashed using bcrypt
- Sensitive routes should implement proper authentication middleware
- Input validation is performed on all endpoints
- File uploads are restricted to image types only

---

## Examples

### Complete Product Management Flow

```javascript
// 1. Create a product
const newProduct = await fetch('http://localhost:5000/api/products', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    productname: 'Gaming Mouse',
    productdescrib: 'High-precision gaming mouse',
    productprice: 79.99,
    productquantity: 30,
    category: 'electronics',
    image: 'https://cloudinary.com/image/url'
  })
});

// 2. Add to best selling
const bestSelling = await fetch('http://localhost:5000/api/bestselling', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    productId: newProduct._id,
    productname: 'Gaming Mouse',
    productdescrib: 'High-precision gaming mouse',
    productprice: 79.99,
    category: 'electronics',
    image: 'https://cloudinary.com/image/url',
    salesCount: 100,
    discount: 5,
    label: 'Gaming Essential',
    featured: true
  })
});

// 3. Create an order
const order = await fetch('http://localhost:5000/api/orders', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    userId: 'user-id-here',
    productId: newProduct._id,
    quantity: 1,
    totalAmount: 79.99,
    shippingAddress: {
      street: '123 Gamer St',
      city: 'Tech City',
      state: 'CA',
      zipCode: '90210',
      country: 'USA'
    }
  })
});
```

### Image Upload with Form Data

```javascript
const formData = new FormData();
formData.append('image', fileInput.files[0]);

const uploadResponse = await fetch('http://localhost:5000/api/upload', {
  method: 'POST',
  body: formData
});

const imageData = await uploadResponse.json();
console.log('Uploaded image URL:', imageData.url);
```

---

## Version

**API Version:** 1.0.0  
**Last Updated:** September 30, 2025  
**Server Framework:** Express.js with TypeScript  
**Database:** MongoDB with Mongoose ODM  

---

## Support

For questions or issues with the API, please contact the development team or create an issue in the project repository.