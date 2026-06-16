# BEB Fragrance API Documentation

## Base URL
```
https://api.bebfragrance.uz/api
```

## Authentication
All authenticated endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <token>
```

## Endpoints

### Products
- `GET /products` - Get all products
- `GET /products/:slug` - Get product by slug
- `GET /products/search?q=query` - Search products

### Orders
- `GET /orders` - Get user's orders
- `GET /orders/:id` - Get order details
- `POST /orders` - Create order
- `PUT /orders/:id` - Update order
- `PATCH /orders/:id/cancel` - Cancel order

### Authentication
- `POST /auth/verify-otp` - Verify OTP
- `POST /auth/register` - Register new user
- `POST /auth/refresh-token` - Refresh JWT token
- `POST /auth/logout` - Logout

### Users
- `GET /users/me` - Get current user
- `PUT /users/me` - Update current user
- `POST /users/change-password` - Change password

### Addresses
- `GET /addresses` - Get user's addresses
- `POST /addresses` - Create address
- `PUT /addresses/:id` - Update address
- `DELETE /addresses/:id` - Delete address
- `PATCH /addresses/:id/default` - Set as default

### Notifications
- `GET /notifications` - Get notifications
- `PATCH /notifications/:id/read` - Mark as read
- `PATCH /notifications/read-all` - Mark all as read
- `DELETE /notifications/:id` - Delete notification

### Payments
- `POST /payments/payme/create` - Create Payme payment
- `POST /payments/click/create` - Create Click payment
- `GET /payments/:transactionId/status` - Get payment status
- `POST /payments/:transactionId/cancel` - Cancel payment

## Error Codes
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

## Response Format
```json
{
  "success": true,
  "data": {},
  "message": "Success message",
  "statusCode": 200
}
```
