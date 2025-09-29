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
      fetch(`http://localhost:5000/api/products`)
        .then((res) => res.json())
        .then((data) => {
          const found = data.find((item: any) => item._id === id);
          if (found) {
            setProduct(found);
          } else {
            setError('Product not found.');
          }
        })
        .catch(() => setError('Failed to fetch product.'))
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
          src={product.image ? new URL(`../assets/${product.image}`, import.meta.url).href : product.img}
          alt={product.name}
          className="w-48 h-48 object-cover rounded shadow"
        />
  <div className="text-lg font-semibold">{product.name || product.productname}</div>
  <div className="text-sm text-gray-600">{product.category}</div>
  <div className="text-blue-600 font-bold">{product.priceRange || `$${product.price ?? product.productprice}`}</div>
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
