import { useParams, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function ViewTableData() {
  const { id } = useParams();
  const location = useLocation();
  const [product, setProduct] = useState<any>(location.state?.product || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!product && id) {
      setLoading(true);
      console.log('ViewTableData - Fetching product ID:', id);
      
      // Use the specific product endpoint for better performance
      fetch(`http://localhost:5000/api/products/${id}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          return res.json();
        })
        .then((data) => {
          console.log('Single product API Response:', data);
          console.log('Product image URL:', data.image);
          setProduct(data);
        })
        .catch((err) => {
          console.error('Fetch error:', err);
          setError('Failed to fetch product.');
        })
        .finally(() => setLoading(false));
    }
  }, [id, product]);

  if (loading) {
    return <div className="p-8 text-center text-gray-500 font-semibold">Loading...</div>;
  }
  if (error || !product) {
    return <div className="p-8 text-center text-red-500 font-semibold">{error || 'Product not found.'}</div>;
  }

  return (
    <div className="p-8 max-w-xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-center">Product Details</h2>
      <div className="flex flex-col items-center gap-4">
        <img
          src={product.image && product.image.startsWith('http')
            ? product.image
            : product.image 
              ? new URL(`../assets/${product.image}`, import.meta.url).href
              : new URL('../assets/kapee.png', import.meta.url).href}
          alt={product.productname || product.name || 'Product image'}
          className="w-48 h-48 object-cover rounded shadow"
          onError={(e) => {
            console.log('Image failed to load:', product.image);
            e.currentTarget.src = new URL('../assets/kapee.png', import.meta.url).href;
          }}
        />
        <div className="text-lg font-semibold">{product.productname || product.name}</div>
        <div className="text-sm text-gray-600">{product.category}</div>
        <div className="text-blue-600 font-bold">
          {product.priceRange || `$${product.productprice || product.price}`}
        </div>
        {product.label && (
          <span className="bg-yellow-400 text-black px-3 py-1 rounded text-xs font-bold">
            {product.label}
          </span>
        )}
        {product.discount && (
          <span className="bg-yellow-400 text-black px-3 py-1 rounded text-xs font-bold">
            {product.discount}
          </span>
        )}
        <div className="mt-4 px-6 py-4 bg-gradient-to-r from-blue-50 via-white to-blue-50 rounded-lg shadow text-gray-900 text-center text-base border border-blue-200">
          <span className="font-semibold text-blue-700 text-lg block mb-2">Description</span>
          <span className="leading-relaxed tracking-wide">{product.description || product.productdescrib || 'No description available.'}</span>
        </div>
      </div>
    </div>
  );
}
