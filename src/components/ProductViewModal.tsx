import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

interface Product {
  _id: string;
  productname?: string;
  name?: string;
  productdescrib?: string;
  description?: string;
  productprice?: number;
  price?: number;
  category: string;
  image: string;
  productquantity?: number;
  // BestSelling specific fields
  salesCount?: number;
  discount?: number;
  label?: string;
  featured?: boolean;
}

interface ProductViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  productId?: string;
  productData?: Product;
}

const ProductViewModal: React.FC<ProductViewModalProps> = ({ 
  isOpen, 
  onClose, 
  productId, 
  productData 
}) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();

  useEffect(() => {
    if (isOpen) {
      // Reset state when modal opens
      setError('');
      
      if (productData) {
        console.log('ProductViewModal - Using passed product data:', productData);
        setProduct(productData);
        setLoading(false);
      } else if (productId) {
        console.log('ProductViewModal - Fetching product with ID:', productId);
        setLoading(true);
        setProduct(null);
        
        fetch(`http://localhost:5000/api/products/${productId}`)
          .then((res) => {
            if (!res.ok) {
              throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json();
          })
          .then((data) => {
            console.log('ProductViewModal - Fetched product data:', data);
            setProduct(data);
          })
          .catch((err) => {
            console.error('Fetch error:', err);
            setError('Failed to fetch product details.');
          })
          .finally(() => setLoading(false));
      }
    } else {
      // Clear state when modal closes
      setProduct(null);
      setError('');
      setLoading(false);
    }
  }, [isOpen, productId, productData]);

  const handleAddToCart = () => {
    if (!product || !isAuthenticated) return;

    try {
      addToCart({
        id: product._id,
        name: product.productname || product.name || 'Unknown Product',
        price: product.discount 
          ? (product.productprice || product.price || 0) * (1 - product.discount / 100)
          : (product.productprice || product.price || 0),
        image: product.image
      });

      alert(`✅ "${product.productname || product.name}" has been added to your cart!`);
      onClose();
      
    } catch (error) {
      alert('❌ Failed to add item to cart. Please try again.');
      console.error('Add to cart error:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b bg-gray-50">
            <h2 className="text-2xl font-bold text-gray-800">Product Details</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-3xl font-light"
              aria-label="Close modal"
            >
              ×
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto"></div>
                <p className="mt-4 text-gray-500">Loading product details...</p>
              </div>
            ) : error ? (
              <div className="text-center py-8">
                <p className="text-red-500 font-semibold">{error}</p>
                <button
                  onClick={onClose}
                  className="mt-4 bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
                >
                  Close
                </button>
              </div>
            ) : product ? (
              <div className="space-y-6">
                {/* Product Image and Basic Info */}
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/2">
                    <div className="relative">
                      <img
                        src={product.image && product.image.startsWith('http')
                          ? product.image
                          : product.image 
                            ? new URL(`../assets/${product.image}`, import.meta.url).href
                            : new URL('../assets/kapee.png', import.meta.url).href}
                        alt={product.productname || product.name || 'Product image'}
                        className="w-full h-64 object-cover rounded-lg shadow-md"
                        onError={(e) => {
                          e.currentTarget.src = new URL('../assets/kapee.png', import.meta.url).href;
                        }}
                      />
                      {product.discount && (
                        <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-bold">
                          -{product.discount}%
                        </div>
                      )}
                      {product.label && (
                        <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded text-xs font-bold">
                          {product.label}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="md:w-1/2 space-y-4">
                    <h3 className="text-2xl font-bold text-gray-800">
                      {product.productname || product.name}
                    </h3>
                    
                    <div className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded inline-block">
                      {product.category}
                    </div>

                    <div className="space-y-2">
                      {product.discount ? (
                        <div className="flex items-center gap-3">
                          <span className="text-2xl font-bold text-green-600">
                            ${((product.productprice || product.price || 0) * (1 - product.discount / 100)).toFixed(2)}
                          </span>
                          <span className="text-lg text-gray-500 line-through">
                            ${(product.productprice || product.price || 0).toFixed(2)}
                          </span>
                          <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm">
                            Save {product.discount}%
                          </span>
                        </div>
                      ) : (
                        <span className="text-2xl font-bold text-gray-800">
                          ${(product.productprice || product.price || 0).toFixed(2)}
                        </span>
                      )}
                    </div>

                    {product.salesCount && (
                      <div className="text-sm text-gray-600">
                        🔥 {product.salesCount} sold
                      </div>
                    )}

                    {product.productquantity !== undefined && (
                      <div className={`text-sm ${product.productquantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {product.productquantity > 0 ? `✅ ${product.productquantity} in stock` : '❌ Out of stock'}
                      </div>
                    )}
                  </div>
                </div>

                {/* Description */}
                <div className="bg-gradient-to-r from-blue-50 via-white to-blue-50 rounded-lg p-6 border border-blue-200">
                  <h4 className="font-semibold text-blue-700 text-lg mb-3">Description</h4>
                  <p className="text-gray-700 leading-relaxed">
                    {product.description || product.productdescrib || 'No description available.'}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4 border-t">
                  {!isAuthenticated ? (
                    <div className="w-full text-center">
                      <div className="text-sm text-orange-600 bg-orange-50 px-4 py-2 rounded mb-3">
                        🔒 Please login to add items to cart
                      </div>
                      <button
                        onClick={onClose}
                        className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition"
                      >
                        Close
                      </button>
                    </div>
                  ) : (
                    <>
                      <button
                        onClick={handleAddToCart}
                        className="flex-1 bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600 transition font-semibold"
                        disabled={product.productquantity === 0}
                      >
                        {product.productquantity === 0 ? 'Out of Stock' : 'Add to Cart'}
                      </button>
                      <button
                        onClick={onClose}
                        className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition"
                      >
                        Close
                      </button>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">Product not found.</p>
                <button
                  onClick={onClose}
                  className="mt-4 bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductViewModal;