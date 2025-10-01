import React from 'react';
import { FcLike, FcLikePlaceholder } from 'react-icons/fc';
import { MdClose, MdShoppingCart } from 'react-icons/md';
import { useWishlist } from '../hooks/useWishlist';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import type { WishlistItem } from '../context/WishlistContext';

interface WishlistPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const WishlistPopup: React.FC<WishlistPopupProps> = ({ isOpen, onClose }) => {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  const handleAddToCart = (item: WishlistItem) => {
    if (!isAuthenticated) {
      alert('Please login to add items to cart');
      return;
    }

    const cartItem = {
      id: item._id,
      name: item.productname,
      price: item.productprice,
      image: item.image
    };

    addToCart(cartItem);
    // Optionally remove from wishlist after adding to cart
    // removeFromWishlist(item._id);
  };

  const handleRemoveFromWishlist = (itemId: string) => {
    removeFromWishlist(itemId);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white rounded-lg w-full max-w-xs sm:max-w-2xl md:max-w-4xl lg:max-w-6xl max-h-[95vh] sm:max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-3 sm:p-4 md:p-6 border-b">
          <div className="flex items-center gap-2 sm:gap-3">
            <FcLike className="text-xl sm:text-2xl" />
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">My Wishlist</h2>
            {wishlistItems.length > 0 && (
              <span className="bg-red-500 text-white text-xs sm:text-sm px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
                {wishlistItems.length}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            {wishlistItems.length > 0 && (
              <button
                onClick={() => clearWishlist()}
                className="text-red-500 hover:text-red-700 transition text-xs sm:text-sm px-2 py-1 border border-red-300 rounded hover:bg-red-50"
                title="Clear all items"
              >
                <span className="hidden sm:inline">Clear All</span>
                <span className="sm:hidden">Clear</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition p-1 sm:p-2"
              title="Close"
            >
              <MdClose className="text-xl sm:text-2xl" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6">
          {wishlistItems.length === 0 ? (
            <div className="text-center py-8 sm:py-12">
              <FcLikePlaceholder className="text-4xl sm:text-6xl mb-4 opacity-50 mx-auto" />
              <h3 className="text-lg sm:text-xl font-semibold text-gray-600 mb-2">Your wishlist is empty</h3>
              <p className="text-sm sm:text-base text-gray-500 mb-4 sm:mb-6">Start adding items you love to your wishlist!</p>
              <button
                onClick={onClose}
                className="bg-yellow-500 text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-yellow-600 transition text-sm sm:text-base"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              {wishlistItems.map((item) => (
                <div key={item._id} className="border rounded-lg p-3 sm:p-4 shadow hover:shadow-lg transition-shadow bg-white relative">
                  {/* Remove button */}
                  <button
                    onClick={() => handleRemoveFromWishlist(item._id)}
                    className="absolute top-1 sm:top-2 right-1 sm:right-2 text-red-500 hover:text-red-700 transition bg-white rounded-full p-1 shadow z-10"
                    title="Remove from wishlist"
                  >
                    <MdClose className="text-sm sm:text-lg" />
                  </button>

                  {/* Product Image */}
                  <div className="relative mb-3 sm:mb-4">
                    <img
                      src={item.image}
                      alt={item.productname}
                      className="w-full h-32 sm:h-40 md:h-48 object-cover rounded hover:scale-105 transition-transform duration-300"
                    />
                    
                    {/* Badges */}
                    {item.discount && (
                      <div className="absolute top-1 sm:top-2 left-1 sm:left-2 bg-red-500 text-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-xs sm:text-sm font-bold">
                        -{item.discount}%
                      </div>
                    )}
                    {item.label && (
                      <div className="absolute bottom-1 sm:bottom-2 left-1 sm:left-2 bg-yellow-500 text-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-xs font-bold">
                        {item.label}
                      </div>
                    )}
                    
                    {/* Source badge */}
                    <div className="absolute bottom-1 sm:bottom-2 right-1 sm:right-2 bg-blue-500 text-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-xs">
                      {item.source === 'bestselling' ? 'Best Seller' : 'Product'}
                    </div>
                  </div>

                  {/* Product Info */}
                  <h3 className="font-semibold text-sm sm:text-base md:text-lg mb-1 sm:mb-2 text-gray-800 line-clamp-2 leading-tight">{item.productname}</h3>
                  <p className="text-gray-600 text-xs sm:text-sm mb-2 sm:mb-3 line-clamp-2 leading-relaxed">{item.productdescrib}</p>
                  
                  <div className="flex items-center justify-between mb-2 sm:mb-4">
                    <span className="text-sm sm:text-base md:text-lg font-bold text-green-600">
                      ${item.productprice.toFixed(2)}
                    </span>
                    <span className="text-xs text-gray-500 truncate max-w-16 sm:max-w-none">{item.category}</span>
                  </div>

                  {item.salesCount && (
                    <div className="text-xs text-blue-600 mb-2 sm:mb-3">
                      🔥 {item.salesCount} sold
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAddToCart(item)}
                      className={`flex-1 flex items-center justify-center gap-1 sm:gap-2 py-1.5 sm:py-2 px-2 sm:px-3 rounded transition text-xs sm:text-sm ${
                        isAuthenticated
                          ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                      disabled={!isAuthenticated}
                      title={!isAuthenticated ? 'Please login to add to cart' : 'Add to cart'}
                    >
                      <MdShoppingCart className="text-sm" />
                      <span className="hidden sm:inline">Add to Cart</span>
                      <span className="sm:hidden">Add</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {wishlistItems.length > 0 && (
          <div className="border-t p-3 sm:p-4 md:p-6 bg-gray-50">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0">
              <div className="text-xs sm:text-sm text-gray-600 text-center sm:text-left">
                {wishlistItems.length} item{wishlistItems.length !== 1 ? 's' : ''} in your wishlist
              </div>
              <button
                onClick={onClose}
                className="bg-gray-500 text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-gray-600 transition text-sm sm:text-base w-full sm:w-auto"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPopup;