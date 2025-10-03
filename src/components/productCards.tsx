
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../hooks/useWishlist';
import ProductViewModal from './ProductViewModal';
import { getApiUrl } from '../config/api';

export interface Product {
  _id: string;
  name?: string;
  productname?: string; // Primary name field from database
  category: string;
  price?: number;
  productprice?: number; // Primary price field from database
  oldPrice?: number;
  discount?: string;
  label?: string;
  banner?: boolean;
  image: string;
  description?: string;
  productdescrib?: string; // Primary description field from database
  productquantity?: number;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}


export function ProductCardsDisplay() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    fetch(getApiUrl('api/products'))
      .then((res) => res.json())
      .then((data) => {
        console.log('API Response:', data);
        // Handle the API response structure: { success: true, count: number, products: Product[] }
        if (data && data.products && Array.isArray(data.products)) {
          setProducts(data.products);
        } else {
          console.error('Expected products array, got:', data);
          setProducts([]);
        }
      })
      .catch((error) => {
        console.error('Failed to fetch products:', error);
        setProducts([]);
      });
  }, []);

  const handleView = (id: string) => {
    console.log('ProductCards - Opening modal for product ID:', id);
    setSelectedProductId(id);
    setIsModalOpen(true);
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

  const handleWishlistToggle = (item: Product, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering parent click events
    console.log('🛒 ProductCards - Wishlist toggle clicked for:', item);
    
    if (!isAuthenticated) {
      console.log('❌ User not authenticated');
      const confirmLogin = window.confirm('Please login to manage your wishlist. Would you like to go to the login page now?');
      if (confirmLogin) {
        navigate('/login');
      }
      return;
    }

    const wishlistItem = {
      _id: item._id,
      productname: item.name || item.productname || 'Unknown Product',
      productdescrib: item.description || item.productdescrib || 'No description available',
      productprice: item.price || item.productprice || 0,
      category: item.category,
      image: item.image,
      source: 'product' as const,
      discount: item.discount ? parseInt(item.discount.replace('%', '')) : undefined,
      label: item.label
    };

    console.log('📋 Wishlist item prepared:', wishlistItem);

    if (isInWishlist(item._id)) {
      console.log('🗑️ Removing from wishlist');
      removeFromWishlist(item._id);
    } else {
      console.log('➕ Adding to wishlist');
      addToWishlist(wishlistItem);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6 p-4 sm:p-6 md:p-8">
      {Array.isArray(products) && products.length > 0 ? products.map((item) => (
        <div
          key={item._id}
          className="border rounded-lg p-3 sm:p-4 shadow hover:shadow-lg transition-shadow duration-300 bg-white w-full max-w-sm mx-auto sm:max-w-none"
        >
          <div className="relative">
            {/* 🔹 Product Image */}
            <img
              src={item.image && item.image.startsWith('http')
                ? item.image
                : new URL(`../assets/${item.image}`, import.meta.url).href}
              alt={item.name || item.productname || 'Product'}
              className="w-full h-32 sm:h-36 md:h-40 object-cover hover:scale-105 transition-transform duration-300 mb-3 sm:mb-4 rounded"
            />
            
            {/* 🔹 Discount Badge */}
            {item.discount && (
              <div className="absolute top-1 sm:top-2 left-1 sm:left-2 bg-red-500 text-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-xs sm:text-sm font-bold">
                {item.discount}
              </div>
            )}
            
            {/* 🔹 Label Badge */}
            {item.label && (
              <div className="absolute top-1 sm:top-2 right-8 sm:right-12 md:right-2 bg-yellow-500 text-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-xs font-bold">
                {item.label}
              </div>
            )}
            
            {/* 🔹 Wishlist Heart Button */}
            <button
              onClick={(e) => {
                console.log('❤️ Heart button clicked!', item);
                handleWishlistToggle(item, e);
              }}
              className={`absolute top-1 sm:top-2 right-1 sm:right-2 p-1.5 sm:p-2 rounded-full transition-all duration-300 hover:scale-110 z-10 ${
                isInWishlist(item._id)
                  ? 'bg-red-500 text-white shadow-lg'
                  : 'bg-white/90 text-gray-600 hover:bg-red-100 hover:text-red-500 shadow-md'
              }`}
              title={isInWishlist(item._id) ? 'Remove from wishlist' : 'Add to wishlist'}
              style={{ minWidth: '28px', minHeight: '28px' }}
            >
              <Heart
                size={14}
                className={`transition-all duration-300 sm:w-4 sm:h-4 ${
                  isInWishlist(item._id) ? 'fill-current' : ''
                }`}
              />
            </button>
          </div>

          {/* 🔹 Product Info */}
          <h3 className="font-semibold text-sm sm:text-base md:text-lg mb-1 sm:mb-2 text-gray-800 truncate leading-tight">{item.name || item.productname}</h3>
          <p className="text-gray-600 text-xs sm:text-sm mb-2 sm:mb-3 line-clamp-2 leading-relaxed">{item.description || item.productdescrib}</p>
          
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <div className="flex items-center gap-1 sm:gap-2">
              {item.oldPrice ? (
                <>
                  <span className="text-sm sm:text-base md:text-lg font-bold text-green-600">
                    ${(item.price ?? item.productprice ?? 0).toFixed(2)}
                  </span>
                  <span className="text-xs sm:text-sm text-gray-500 line-through">
                    ${item.oldPrice.toFixed(2)}
                  </span>
                </>
              ) : (
                <span className="text-sm sm:text-base md:text-lg font-bold text-gray-800">
                  ${(item.price ?? item.productprice ?? 0).toFixed(2)}
                </span>
              )}
            </div>
            <span className="text-xs text-gray-500 truncate max-w-20 sm:max-w-none">{item.category}</span>
          </div>

          {/* 🔹 Login Notice for Non-authenticated Users */}
          {!isAuthenticated && (
            <div className="text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded mb-2 sm:mb-3 text-center">
              🔒 Login required to purchase
            </div>
          )}

          {/* 🔹 Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-2">
            <button 
              onClick={() => handleView(item._id)}
              className="text-blue-500 hover:text-blue-700 transition p-2 border rounded hover:bg-blue-50 text-sm sm:text-base"
              title="View Product Details"
            >
              👁️ View
            </button>
            <button
              onClick={() => handleAddToCart(item)}
              className={`font-medium px-3 sm:px-4 py-2 rounded transition text-sm sm:text-base ${
                isAuthenticated 
                  ? 'text-white bg-yellow-500 hover:bg-yellow-600' 
                  : 'text-gray-500 bg-gray-300 cursor-not-allowed'
              }`}
              disabled={!isAuthenticated}
              title={!isAuthenticated ? 'Please login to add items to cart' : 'Add this item to your cart'}
            >
              {isAuthenticated ? 'Add to Cart' : 'Login to Shop'}
            </button>
          </div>
        </div>
      )) : (
        <div className="col-span-full text-center py-8">
          <p className="text-gray-500">No products available at the moment.</p>
        </div>
      )}
      
      {/* Product View Modal */}
      <ProductViewModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedProductId(null);
        }}
        productId={selectedProductId || undefined}
      />
    </div>
  );
}
