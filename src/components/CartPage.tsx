import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const CartPage = () => {
  const { items, totalItems, totalPrice, updateQuantity, removeFromCart, clearCart } = useCart();
  const { isAuthenticated, user } = useAuth();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Please Login</h2>
          <p className="mb-4">You need to be logged in to view your cart.</p>
          <Link to="/login" className="bg-yellow-400 text-black px-6 py-2 rounded hover:bg-yellow-500">
            Login
          </Link>
        </div>
      </div>
    );
  }

  if (totalItems === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
          <p className="mb-4">Add some products to get started!</p>
          <Link to="/" className="bg-yellow-400 text-black px-6 py-2 rounded hover:bg-yellow-500">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  const handleCheckout = async () => {
    // Prevent multiple clicks
    if (isCheckingOut) return;
    
    // Confirm checkout
    if (!confirm(`Are you sure you want to place an order for ${totalItems} items totaling $${totalPrice.toFixed(2)}?`)) {
      return;
    }
    
    setIsCheckingOut(true);
    
    try {
      // Prepare orders data
      const ordersData = items.map(item => ({
        product: item.name,
        quantity: item.quantity,
        price: item.price,
        status: 'pending',
        image: item.image,
        userId: user?.id,
        userName: user?.name || 'Guest',
        userEmail: user?.email || ''
      }));

      // Create all orders in a single batch request
      const response = await fetch('http://localhost:5000/api/orders/batch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orders: ordersData }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to place order');
      }

      const result = await response.json();
      alert(`🎉 Order placed successfully! ${result.message}`);
      clearCart();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      if (errorMessage.includes('Similar orders were recently placed')) {
        alert('⚠️ It looks like you recently placed a similar order. Please check your order history or wait a few minutes before trying again.');
      } else {
        alert('❌ Failed to place order. Please try again.');
      }
      console.error('Checkout error:', error);
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Shopping Cart ({totalItems} items)</h1>
          <button
            onClick={clearCart}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Clear Cart
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md">
          {items.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-6 border-b">
              <div className="flex items-center">
                <img
                  src={item.image && item.image.startsWith('http')
                    ? item.image
                    : new URL(`../assets/${item.image}`, import.meta.url).href}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded mr-4"
                />
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-gray-600">${item.price}</p>
                </div>
              </div>

              <div className="flex items-center">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="bg-gray-200 px-3 py-1 rounded-l hover:bg-gray-300"
                >
                  -
                </button>
                <span className="bg-gray-100 px-4 py-1">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="bg-gray-200 px-3 py-1 rounded-r hover:bg-gray-300"
                >
                  +
                </button>
                <span className="ml-4 font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="ml-4 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xl font-semibold">Total: ${totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex gap-4">
            <Link
              to="/"
              className="bg-gray-500 text-white px-6 py-3 rounded hover:bg-gray-600"
            >
              Continue Shopping
            </Link>
            <button
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className={`px-6 py-3 rounded font-semibold transition-colors ${
                isCheckingOut 
                  ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
                  : 'bg-yellow-400 text-black hover:bg-yellow-500'
              }`}
            >
              {isCheckingOut ? 'Processing...' : 'Checkout'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;