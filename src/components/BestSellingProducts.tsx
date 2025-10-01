import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../hooks/useWishlist';
import ProductViewModal from './ProductViewModal';

export interface BestSellingProduct {
  _id: string;
  productId: string;
  productname: string;
  productdescrib: string;
  productprice: number;
  category: string;
  image: string;
  salesCount: number;
  discount?: number;
  label?: string;
  featured: boolean;
}

const BestSellingProducts: React.FC = () => {
  const [products, setProducts] = useState<BestSellingProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<BestSellingProduct | null>(null);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    fetchBestSellingProducts();
  }, []);

  const fetchBestSellingProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/bestselling/featured?limit=8');
      console.log('BestSelling - API Response:', response.data);
      console.log('BestSelling - Product IDs check:', response.data.map((p: any) => ({
        name: p.productname,
        id: p._id,
        productId: p.productId
      })));
      setProducts(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch best selling products');
      console.error('Error fetching best selling products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleView = (product: BestSellingProduct) => {
    console.log('BestSelling - Opening modal for product:', product.productname);
    console.log('BestSelling - Product ID:', product.productId);
    console.log('BestSelling - Full product data:', product);
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleAddToCart = (product: BestSellingProduct) => {
    if (!isAuthenticated) {
      const confirmLogin = window.confirm('Please login to add items to cart. Would you like to go to the login page now?');
      if (confirmLogin) {
        navigate('/login');
      }
      return;
    }

    try {
      // Add item to cart using cart context with proper format
      addToCart({
        id: product.productId, // Use productId for consistency
        name: product.productname,
        price: product.discount 
          ? product.productprice * (1 - product.discount / 100) // Apply discount
          : product.productprice,
        image: product.image
      });

      alert(`✅ "${product.productname}" has been added to your cart!`);
      
    } catch (error) {
      alert('❌ Failed to add item to cart. Please try again.');
      console.error('Add to cart error:', error);
    }
  };

  const handleWishlistToggle = (product: BestSellingProduct, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering parent click events
    console.log('🌟 BestSelling - Wishlist toggle clicked for:', product);
    
    if (!isAuthenticated) {
      console.log('❌ User not authenticated');
      const confirmLogin = window.confirm('Please login to manage your wishlist. Would you like to go to the login page now?');
      if (confirmLogin) {
        navigate('/login');
      }
      return;
    }

    const wishlistItem = {
      _id: product._id,
      productId: product.productId,
      productname: product.productname,
      productdescrib: product.productdescrib,
      productprice: product.productprice,
      category: product.category,
      image: product.image,
      source: 'bestselling' as const,
      discount: product.discount,
      label: product.label,
      salesCount: product.salesCount
    };

    console.log('📋 BestSelling wishlist item prepared:', wishlistItem);

    if (isInWishlist(product._id)) {
      console.log('🗑️ Removing from wishlist');
      removeFromWishlist(product._id);
    } else {
      console.log('➕ Adding to wishlist');
      addToWishlist(wishlistItem);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8">Best Selling Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="border rounded-lg p-3 sm:p-4 shadow animate-pulse">
              <div className="w-full h-32 sm:h-36 md:h-40 bg-gray-300 rounded mb-3 sm:mb-4"></div>
              <div className="h-3 sm:h-4 bg-gray-300 rounded mb-2"></div>
              <div className="h-3 sm:h-4 bg-gray-300 rounded w-2/3 mb-2"></div>
              <div className="h-5 sm:h-6 bg-gray-300 rounded w-1/3"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8">Best Selling Products</h2>
        <div className="text-center text-red-500 text-base sm:text-lg">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 text-gray-800">Best Selling Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
        {products.map((product) => (
          <div key={product._id} className="border rounded-lg p-3 sm:p-4 shadow hover:shadow-lg transition-shadow duration-300 bg-white w-full max-w-sm mx-auto sm:max-w-none">
            <div className="relative">
              <img
                src={product.image}
                alt={product.productname}
                className="w-full h-32 sm:h-36 md:h-40 object-cover rounded mb-3 sm:mb-4 hover:scale-105 transition-transform duration-300"
              />
              {product.discount && (
                <div className="absolute top-1 sm:top-2 left-1 sm:left-2 bg-red-500 text-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-xs sm:text-sm font-bold">
                  -{product.discount}%
                </div>
              )}
              {product.label && (
                <div className="absolute top-1 sm:top-2 right-8 sm:right-12 md:right-2 bg-yellow-500 text-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-xs font-bold">
                  {product.label}
                </div>
              )}
              
              {/* 🔹 Wishlist Heart Button */}
              <button
                onClick={(e) => {
                  console.log('❤️ BestSelling Heart button clicked!', product);
                  handleWishlistToggle(product, e);
                }}
                className={`absolute top-1 sm:top-2 right-1 sm:right-2 p-1.5 sm:p-2 rounded-full transition-all duration-300 hover:scale-110 z-10 ${
                  isInWishlist(product._id)
                    ? 'bg-red-500 text-white shadow-lg'
                    : 'bg-white/90 text-gray-600 hover:bg-red-100 hover:text-red-500 shadow-md'
                }`}
                title={isInWishlist(product._id) ? 'Remove from wishlist' : 'Add to wishlist'}
                style={{ minWidth: '28px', minHeight: '28px' }}
              >
                <Heart
                  size={14}
                  className={`transition-all duration-300 sm:w-4 sm:h-4 ${
                    isInWishlist(product._id) ? 'fill-current' : ''
                  }`}
                />
              </button>
            </div>
            
            <h3 className="font-semibold text-sm sm:text-base md:text-lg mb-1 sm:mb-2 text-gray-800 truncate leading-tight">{product.productname}</h3>
            <p className="text-gray-600 text-xs sm:text-sm mb-2 sm:mb-3 line-clamp-2 leading-relaxed">{product.productdescrib}</p>
            
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <div className="flex items-center gap-1 sm:gap-2">
                {product.discount ? (
                  <>
                    <span className="text-sm sm:text-base md:text-lg font-bold text-green-600">
                      ${(product.productprice * (1 - product.discount / 100)).toFixed(2)}
                    </span>
                    <span className="text-xs sm:text-sm text-gray-500 line-through">
                      ${product.productprice.toFixed(2)}
                    </span>
                  </>
                ) : (
                  <span className="text-sm sm:text-base md:text-lg font-bold text-gray-800">
                    ${product.productprice.toFixed(2)}
                  </span>
                )}
              </div>
              <span className="text-xs text-gray-500 truncate max-w-16 sm:max-w-none">
                {product.salesCount} sold
              </span>
            </div>
            
            {!isAuthenticated && (
              <div className="text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded mb-2 sm:mb-3 text-center">
                🔒 Login required to purchase
              </div>
            )}
            
            <div className="flex flex-col sm:flex-row justify-center gap-2">
              <button 
                onClick={() => handleView(product)}
                className="text-blue-500 hover:text-blue-700 transition p-2 border rounded hover:bg-blue-50 text-sm sm:text-base"
                title="View Product Details"
              >
                👁️ View
              </button>
              <button 
                onClick={() => handleAddToCart(product)}
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
        ))}
      </div>
      
      {products.length === 0 && !loading && (
        <div className="text-center text-gray-500 text-base sm:text-lg">
          No best selling products available at the moment.
        </div>
      )}
      
      {/* Product View Modal */}
      <ProductViewModal
        key={selectedProduct?._id || 'modal'} // Force re-render when product changes
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedProduct(null);
        }}
        productId={selectedProduct?.productId}
        productData={selectedProduct ? {
          _id: selectedProduct.productId,
          productname: selectedProduct.productname,
          productdescrib: selectedProduct.productdescrib,
          productprice: selectedProduct.productprice,
          category: selectedProduct.category,
          image: selectedProduct.image,
          salesCount: selectedProduct.salesCount,
          discount: selectedProduct.discount,
          label: selectedProduct.label,
          featured: selectedProduct.featured
        } : undefined}
      />
    </div>
  );
};

export default BestSellingProducts;
