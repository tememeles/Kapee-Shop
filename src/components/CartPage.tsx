import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartSidebar = ({ isOpen, onClose }: CartSidebarProps) => {
  const { items, totalItems, totalPrice, updateQuantity, removeFromCart, clearCart } = useCart();
  const { isAuthenticated, user } = useAuth();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

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
      onClose(); // Close sidebar after successful checkout
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
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-gray-50">
          <h2 className="text-xl font-bold">Shopping Cart ({totalItems})</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
            aria-label="Close cart"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col h-full">
          {!isAuthenticated ? (
            <div className="flex-1 flex items-center justify-center p-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-3">Please Login</h3>
                <p className="text-gray-600 mb-4">You need to be logged in to view your cart.</p>
                <Link 
                  to="/login" 
                  className="bg-yellow-400 text-black px-6 py-2 rounded hover:bg-yellow-500 inline-block"
                  onClick={onClose}
                >
                  Login
                </Link>
              </div>
            </div>
          ) : totalItems === 0 ? (
            <div className="flex-1 flex items-center justify-center p-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-3">Your Cart is Empty</h3>
                <p className="text-gray-600 mb-4">Add some products to get started!</p>
                <button
                  onClick={onClose}
                  className="bg-yellow-400 text-black px-6 py-2 rounded hover:bg-yellow-500"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Clear Cart Button */}
              <div className="p-4 border-b">
                <button
                  onClick={clearCart}
                  className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 text-sm"
                >
                  Clear Cart
                </button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="p-4 border-b">
                    <div className="flex items-start space-x-3">
                      <img
                        src={item.image && item.image.startsWith('http')
                          ? item.image
                          : new URL(`../assets/${item.image}`, import.meta.url).href}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm truncate">{item.name}</h4>
                        <p className="text-gray-600 text-sm">${item.price}</p>
                        
                        {/* Quantity Controls */}
                        <div className="flex items-center mt-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="bg-gray-200 px-2 py-1 rounded-l text-sm hover:bg-gray-300"
                          >
                            -
                          </button>
                          <span className="bg-gray-100 px-3 py-1 text-sm">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="bg-gray-200 px-2 py-1 rounded-r text-sm hover:bg-gray-300"
                          >
                            +
                          </button>
                        </div>
                        
                        <div className="flex items-center justify-between mt-2">
                          <span className="font-semibold text-sm">${(item.price * item.quantity).toFixed(2)}</span>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer with Total and Checkout */}
              <div className="border-t bg-gray-50 p-4">
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">Total:</span>
                    <span className="text-xl font-bold">${totalPrice.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <button
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                    className={`w-full py-3 rounded font-semibold transition-colors ${
                      isCheckingOut 
                        ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
                        : 'bg-yellow-400 text-black hover:bg-yellow-500'
                    }`}
                  >
                    {isCheckingOut ? 'Processing...' : 'Checkout'}
                  </button>
                  
                  <button
                    onClick={onClose}
                    className="w-full bg-gray-500 text-white py-2 rounded hover:bg-gray-600"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CartSidebar;