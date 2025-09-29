
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export interface Product {
  _id: string;
  name: string;
  productname?: string; // Alternative name field from database
  category: string;
  price: number;
  productprice?: number; // Alternative price field from database
  oldPrice?: number;
  discount?: string;
  label?: string;
  banner?: boolean;
  image: string;
  description: string;
  productdescrib?: string; // Alternative description field from database
}


export function ProductCardsDisplay() {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const handleView = (id: string) => {
    navigate(`/singleView/${id}`);
  };

  const handleAddToCart = (item: Product) => {
    if (!isAuthenticated) {
      const confirmLogin = window.confirm('Please login to add items to cart. Would you like to go to the login page now?');
      if (confirmLogin) {
        navigate('/login');
      }
      return;
    }

    try {
      // Add item to cart using cart context
      addToCart({
        id: item._id,
        name: item.name || item.productname || 'Unknown Product',
        price: item.price || item.productprice || 0,
        image: item.image
      });

      alert(`✅ "${item.name || item.productname}" has been added to your cart!`);
      
    } catch (error) {
      alert('❌ Failed to add item to cart. Please try again.');
      console.error('Add to cart error:', error);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-8">
      {products.map((item) => (
        <div
          key={item._id}
          className="relative bg-white rounded-xl shadow-md p-4 flex flex-col items-center transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg"
        >
          {/* 🔹 Discount Badge */}
          {item.label && (
            <span className="absolute top-2 left-2 bg-yellow-400 text-black px-2 py-1 text-xs font-bold rounded">
              {item.label}
            </span>
          )}

          {/* 🔹 Product Image */}
          <img
            src={item.image && item.image.startsWith('http')
              ? item.image
              : new URL(`../assets/${item.image}`, import.meta.url).href}
            alt={item.name}
            className="w-32 h-32 object-cover hover:translate-y-2 duration-700 mb-4 rounded"
          />

          {/* 🔹 Product Info */}
          <div className="font-bold text-lg mb-1">{item.name || item.productname}</div>
          <div className="text-sm text-gray-500 mb-1">{item.category}</div>
          <div className="text-yellow-500 font-semibold mb-2">${item.price ?? item.productprice}</div>
          {item.oldPrice && (
            <div className="text-gray-400 line-through text-sm mb-2">
              ${item.oldPrice}
            </div>
          )}
          {item.discount && (
            <div className="text-yellow-600 text-xs mb-2">{item.discount}</div>
          )}
          {/* 🔹 Product Description */}
          <div className="text-xs text-gray-600 mb-2">{item.description || item.productdescrib}</div>

          {/* 🔹 Login Notice for Non-authenticated Users */}
          {!isAuthenticated && (
            <div className="text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded mb-2 text-center">
              🔒 Login required to purchase
            </div>
          )}

          {/* 🔹 View & Shop Buttons */}
          <div className="flex gap-2 mt-auto">
            <button
              onClick={() => handleView(item._id)}
              className="bg-white text-black px-4 py-2 rounded hover:bg-yellow-400 transition"
            >
              View
            </button>
            <button
              onClick={() => handleAddToCart(item)}
              className={`px-4 py-2 rounded transition ${
                isAuthenticated 
                  ? 'bg-yellow-400 text-black hover:bg-yellow-500' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed hover:bg-gray-300'
              }`}
              disabled={!isAuthenticated}
              title={!isAuthenticated ? 'Please login to add items to cart' : 'Add this item to your cart'}
            >
              {isAuthenticated ? 'Add to Cart' : 'Login to Shop'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
