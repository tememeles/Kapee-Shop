import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdDelete, MdEdit, MdSave, MdCancel, MdAdd } from 'react-icons/md';

interface BestSellingProduct {
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

interface Product {
  _id: string;
  productname: string;
  productdescrib: string;
  productprice: number;
  category: string;
  image: string;
}

interface ApiErrorResponse {
  error: string;
  details?: {
    productName: string;
    currentSalesCount: number;
    featured: boolean;
    suggestion: string;
  };
  existingProduct?: BestSellingProduct;
}

const BestSellingManagement: React.FC = () => {
  const [bestSellingProducts, setBestSellingProducts] = useState<BestSellingProduct[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [editingProduct, setEditingProduct] = useState<BestSellingProduct | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  // Image upload states
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [editForm, setEditForm] = useState({
    salesCount: 0,
    discount: 0,
    label: '',
    featured: true
  });

  const [addForm, setAddForm] = useState({
    productId: '',
    salesCount: 0,
    discount: 0,
    label: '',
    featured: true,
    customImage: '' // For custom image URL override
  });

  useEffect(() => {
    fetchBestSellingProducts();
    fetchAllProducts();
  }, []);

  const fetchBestSellingProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/bestselling');
      setBestSellingProducts(Array.isArray(response.data) ? response.data : []);
      setError(null);
    } catch (_err) {
      setError('Failed to fetch best selling products');
      console.error('Error fetching best selling products:', _err);
      setBestSellingProducts([]); // Ensure it's always an array
    } finally {
      setLoading(false);
    }
  };

  const fetchAllProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products');
      
      // Handle the API response structure: { success: true, count: number, products: Product[] }
      if (response.data && response.data.products && Array.isArray(response.data.products)) {
        setAllProducts(response.data.products);
      } else if (Array.isArray(response.data)) {
        // Fallback for direct array response
        setAllProducts(response.data);
      } else {
        console.error('Expected products array, got:', response.data);
        setAllProducts([]);
      }
      setLoading(false);
    } catch (_err) {
      setError('Failed to fetch products');
      console.error('Error fetching products:', _err);
      setAllProducts([]); // Ensure it's always an array
      setLoading(false);
    }
  };

  // Handle file selection for image upload
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Upload image to Cloudinary
  const uploadImageToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      setUploadingImage(true);
      const response = await axios.post('http://localhost:5000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      console.log('Upload response:', response.data); // Debug log
      
      // Check if the response has the expected structure
      if (response.data && response.data.url) {
        return response.data.url;
      } else {
        throw new Error('Invalid response format from upload service');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.error || error.message;
        throw new Error(`Failed to upload image: ${errorMessage}`);
      }
      throw new Error('Failed to upload image');
    } finally {
      setUploadingImage(false);
    }
  };

  // Clear image selection
  const clearImageSelection = () => {
    setSelectedFile(null);
    setImagePreview(null);
    setAddForm(prev => ({ ...prev, customImage: '' }));
  };

  // Validate image URL
  const validateImageUrl = (url: string): { isValid: boolean; warning?: string; error?: string } => {
    if (!url) return { isValid: true };
    
    // Check for localhost URLs
    if (url.includes('localhost') || url.includes('127.0.0.1')) {
      return { 
        isValid: false, 
        warning: 'Localhost URLs will not work in production' 
      };
    }
    
    // Check for relative paths
    if (url.startsWith('/src/assets/') || url.startsWith('./') || url.startsWith('../')) {
      return { 
        isValid: false, 
        error: 'Relative paths are not allowed. Please upload to Cloudinary.' 
      };
    }
    
    // Check if it's a Cloudinary URL (recommended)
    if (url.includes('cloudinary.com')) {
      return { isValid: true };
    }
    
    // Other valid URLs
    try {
      new URL(url);
      return { isValid: true };
    } catch {
      return { 
        isValid: false, 
        error: 'Invalid URL format' 
      };
    }
  };

  const handleEdit = (product: BestSellingProduct) => {
    setEditingProduct(product);
    setEditForm({
      salesCount: product.salesCount,
      discount: product.discount || 0,
      label: product.label || '',
      featured: product.featured
    });
    setError(null);
    setSuccess(null);
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
    setEditForm({ salesCount: 0, discount: 0, label: '', featured: true });
  };

  const handleUpdateProduct = async () => {
    if (!editingProduct) return;

    try {
      setLoading(true);
      const response = await axios.put(`http://localhost:5000/api/bestselling/${editingProduct._id}`, editForm);
      setBestSellingProducts(bestSellingProducts.map(product => 
        product._id === editingProduct._id ? response.data : product
      ));
      setSuccess('Best selling product updated successfully!');
      setEditingProduct(null);
      setEditForm({ salesCount: 0, discount: 0, label: '', featured: true });
      
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to update product');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to remove this product from best selling?')) {
      try {
        setLoading(true);
        await axios.delete(`http://localhost:5000/api/bestselling/${id}`);
        setBestSellingProducts(bestSellingProducts.filter(product => product._id !== id));
        setSuccess('Product removed from best selling successfully!');
        setTimeout(() => setSuccess(null), 3000);
      } catch (_err) {
        setError('Failed to remove product');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!addForm.productId) return;

    try {
      setLoading(true);
      
      if (!Array.isArray(allProducts)) {
        setError('Products data not loaded yet. Please wait.');
        return;
      }
      
      const selectedProduct = allProducts.find(p => p._id === addForm.productId);
      if (!selectedProduct) {
        setError('Selected product not found');
        return;
      }

      // Check if product is already in best selling (client-side validation)
      const isAlreadyInBestSelling = bestSellingProducts.some(bs => bs.productId === addForm.productId);
      if (isAlreadyInBestSelling) {
        setError('❌ This product is already in the best selling collection. Please choose a different product.');
        return;
      }

      // Handle image upload if a file is selected
      let finalImageUrl = addForm.customImage || selectedProduct.image;
      if (selectedFile) {
        try {
          setError(''); // Clear any previous errors
          finalImageUrl = await uploadImageToCloudinary(selectedFile);
          console.log('✅ Image uploaded successfully to Cloudinary:', finalImageUrl);
        } catch (uploadError) {
          const errorMessage = uploadError instanceof Error ? uploadError.message : 'Failed to upload image';
          setError(`Image upload failed: ${errorMessage}. Using product default image.`);
          finalImageUrl = selectedProduct.image;
        }
      } else if (addForm.customImage) {
        // Validate custom image URL
        if (addForm.customImage.includes('localhost') || addForm.customImage.includes('127.0.0.1')) {
          setError('Warning: Localhost URLs will not work in production. Consider uploading to Cloudinary instead.');
        }
        finalImageUrl = addForm.customImage;
      }

      const newBestSelling = {
        productId: addForm.productId,
        productname: selectedProduct.productname,
        productdescrib: selectedProduct.productdescrib,
        productprice: selectedProduct.productprice,
        category: selectedProduct.category,
        image: finalImageUrl, // Use custom image or uploaded image
        salesCount: Number(addForm.salesCount),
        discount: addForm.discount || undefined,
        label: addForm.label || undefined,
        featured: addForm.featured
      };

      console.log('📤 Sending POST request to /api/bestselling');
      console.log('📦 Request payload:', JSON.stringify(newBestSelling, null, 2));

      const response = await axios.post('http://localhost:5000/api/bestselling', newBestSelling);
      setBestSellingProducts([...bestSellingProducts, response.data]);
      setSuccess('✅ Product added to best selling successfully! Image hosted on Cloudinary.');
      setShowAddForm(false);
      
      // Reset form with all fields including customImage and image upload state
      setAddForm({ 
        productId: '', 
        salesCount: 0, 
        discount: 0, 
        label: '', 
        featured: true,
        customImage: ''
      });
      
      // Clear image upload state
      setSelectedFile(null);
      setImagePreview(null);
      clearImageSelection();
      
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      console.error('❌ Error adding product to best selling:', err);
      console.error('📊 Error details:', {
        status: err.response?.status,
        statusText: err.response?.statusText,
        data: err.response?.data,
        config: err.config
      });
      
      // Handle specific error for existing product with TypeScript typing
      if (err.response?.status === 400 && err.response?.data?.error?.includes('already exists')) {
        const errorData: ApiErrorResponse = err.response.data;
        if (errorData.details) {
          setError(
            `❌ ${errorData.error}\n` +
            `📦 Product: ${errorData.details.productName}\n` +
            `📊 Current Sales: ${errorData.details.currentSalesCount}\n` +
            `💡 ${errorData.details.suggestion}`
          );
        } else {
          setError('❌ This product is already in the best selling collection. Please refresh the page or choose a different product.');
        }
        
        // Refresh the best selling products to sync state
        fetchBestSellingProducts();
      } else {
        // Show the actual error message from the server if available
        const errorMessage = err.response?.data?.error || err.message || 'Failed to add product to best selling';
        setError(`❌ ${errorMessage}`);
        
        // If there's additional error info, log it
        if (err.response?.data?.received) {
          console.log('📋 Server received:', err.response.data.received);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  // Get available products (not already in best selling) with safety check
  const availableProducts = Array.isArray(allProducts) ? allProducts.filter(product => 
    !bestSellingProducts.some(bs => bs.productId === product._id)
  ) : [];

  const labelOptions = ['Best Seller', 'Featured', 'New Arrival', 'Limited Edition', 'Trending'];

  // Early return for loading state or if data is not properly loaded
  if (loading && bestSellingProducts.length === 0 && allProducts.length === 0) {
    return (
      <div className="bg-gray-50 ml-0 lg:ml-40 p-4 lg:p-6 min-h-screen rounded-xl mt-16 lg:mt-0">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading best selling products...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 ml-0 lg:ml-40 p-4 lg:p-6 min-h-screen rounded-xl mt-16 lg:mt-0">
      <div className="mb-4 lg:mb-6">
        <h1 className="text-xl lg:text-2xl font-bold text-gray-700 mb-2">Best Selling Products Management</h1>
        <p className="text-gray-600 text-sm lg:text-base">Manage featured and best selling products with full CRUD operations</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-4 lg:mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-sm font-medium">Total Best Selling</p>
              <p className="text-2xl font-bold text-gray-700">{bestSellingProducts.length}</p>
            </div>
            <MdAdd className="text-blue-500 text-3xl" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 text-sm font-medium">Featured Products</p>
              <p className="text-2xl font-bold text-gray-700">
                {bestSellingProducts.filter(p => p.featured).length}
              </p>
            </div>
            <MdAdd className="text-green-500 text-3xl" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-600 text-sm font-medium">Available Products</p>
              <p className="text-2xl font-bold text-gray-700">{Array.isArray(allProducts) ? availableProducts.length : 0}</p>
            </div>
            <MdAdd className="text-purple-500 text-3xl" />
          </div>
        </div>
      </div>

      {/* Add Product Button */}
      <div className="mb-6 flex items-center gap-4">
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition flex items-center gap-2"
          disabled={availableProducts.length === 0}
        >
          <MdAdd className="w-4 h-4" />
          Add Product to Best Selling
        </button>
        
        <button
          onClick={fetchBestSellingProducts}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition flex items-center gap-2"
          title="Refresh best selling products list"
        >
          🔄 Refresh
        </button>
        
        {availableProducts.length === 0 && (
          <p className="text-sm text-gray-600">
            ℹ️ All products are already in the best selling collection
          </p>
        )}
      </div>

      {/* Add Form */}
      {showAddForm && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-lg font-semibold mb-4">Add Product to Best Selling</h3>
          
          {availableProducts.length === 0 ? (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-yellow-800">
                <strong>ℹ️ No products available to add</strong>
                <br />
                All products in your inventory are already in the best selling collection.
                You can manage existing best selling products using the table below.
              </p>
            </div>
          ) : (
            <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product</label>
                <select
                  value={addForm.productId}
                  onChange={(e) => setAddForm({ ...addForm, productId: e.target.value })}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                  disabled={availableProducts.length === 0}
                >
                  <option value="">
                    {availableProducts.length === 0 
                      ? "No products available (all products are already in best selling)" 
                      : "Select a product"
                    }
                  </option>
                  {availableProducts.map(product => (
                    <option key={product._id} value={product._id}>
                      {product.productname} ({product.category})
                    </option>
                  ))}
                </select>
                {availableProducts.length === 0 && (
                  <p className="text-sm text-gray-500 mt-1">
                    💡 Tip: You can edit existing best selling products in the table below
                  </p>
                )}
              </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sales Count</label>
              <input
                type="number"
                value={addForm.salesCount}
                onChange={(e) => setAddForm({ ...addForm, salesCount: Number(e.target.value) })}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                min="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Discount (%)</label>
              <input
                type="number"
                value={addForm.discount}
                onChange={(e) => setAddForm({ ...addForm, discount: Number(e.target.value) })}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                min="0"
                max="100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Label</label>
              <select
                value={addForm.label}
                onChange={(e) => setAddForm({ ...addForm, label: e.target.value })}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">No Label</option>
                {labelOptions.map(label => (
                  <option key={label} value={label}>{label}</option>
                ))}
              </select>
            </div>
            
            {/* Custom Image Upload Section */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Custom Image (Optional)</label>
              <div className="space-y-3">
                {/* Information about image requirements */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-sm text-blue-700">
                    <strong>Recommended:</strong> Upload image files for automatic Cloudinary hosting.
                    <br />
                    <span className="text-blue-600">Supported formats: JPEG, PNG, GIF, WebP (max 5MB)</span>
                  </p>
                </div>
                
                {/* Custom Image URL Input */}
                <div className="space-y-2">
                  <input
                    type="url"
                    placeholder="Or enter Cloudinary image URL (not recommended for localhost URLs)"
                    value={addForm.customImage}
                    onChange={(e) => setAddForm({ ...addForm, customImage: e.target.value })}
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  
                  {/* URL Validation Feedback */}
                  {addForm.customImage && (() => {
                    const validation = validateImageUrl(addForm.customImage);
                    if (validation.error) {
                      return (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-2">
                          <p className="text-sm text-red-800">❌ {validation.error}</p>
                        </div>
                      );
                    }
                    if (validation.warning) {
                      return (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-2">
                          <p className="text-sm text-yellow-800">⚠️ {validation.warning}</p>
                        </div>
                      );
                    }
                    if (addForm.customImage.includes('cloudinary.com')) {
                      return (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-2">
                          <p className="text-sm text-green-800">✅ Cloudinary URL detected - Perfect!</p>
                        </div>
                      );
                    }
                    return null;
                  })()}
                </div>
                
                {/* File Upload Input */}
                <div className="flex items-center gap-3">
                  <input
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                    onChange={handleFileSelect}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className={`px-4 py-2 rounded transition cursor-pointer text-sm ${
                      uploadingImage 
                        ? 'bg-gray-400 text-gray-200 cursor-not-allowed' 
                        : 'bg-green-500 text-white hover:bg-green-600'
                    }`}
                  >
                    {uploadingImage ? 'Uploading...' : '📤 Upload to Cloudinary'}
                  </label>
                  {selectedFile && (
                    <span className="text-sm text-gray-600">
                      {selectedFile.name} ({Math.round(selectedFile.size / 1024)}KB)
                    </span>
                  )}
                  {(selectedFile || imagePreview) && !uploadingImage && (
                    <button
                      type="button"
                      onClick={clearImageSelection}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Clear
                    </button>
                  )}
                </div>
                
                {/* Image Preview */}
                {(imagePreview || addForm.customImage) && (
                  <div className="mt-3">
                    <p className="text-sm text-gray-600 mb-2">Image Preview:</p>
                    <img
                      src={imagePreview || addForm.customImage}
                      alt="Preview"
                      className="w-24 h-24 object-cover rounded border"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                  </div>
                )}
                
                {uploadingImage && (
                  <div className="text-sm text-blue-600">
                    Uploading image...
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={addForm.featured}
                onChange={(e) => setAddForm({ ...addForm, featured: e.target.checked })}
                className="mr-2"
              />
              <label className="text-sm font-medium text-gray-700">Featured on homepage</label>
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                disabled={loading}
              >
                Add Product
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowAddForm(false);
                  setAddForm({ 
                    productId: '', 
                    salesCount: 0, 
                    discount: 0, 
                    label: '', 
                    featured: true,
                    customImage: ''
                  });
                  clearImageSelection();
                  setError(null);
                  setSuccess(null);
                }}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
              >
                Cancel
              </button>
            </div>
            </form>
          )}
        </div>
      )}

      {/* Messages */}
      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          <div className="flex items-start">
            <span className="mr-2">❌</span>
            <div>
              {error.split('\n').map((line, index) => (
                <div key={index} className={index > 0 ? 'mt-1' : ''}>
                  {line}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {success && (
        <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
          {success}
        </div>
      )}

      {/* Products Table */}
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full border border-gray-200 rounded-lg">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-3 border text-left">Product</th>
              <th className="px-4 py-3 border text-left">Category</th>
              <th className="px-4 py-3 border text-left">Price</th>
              <th className="px-4 py-3 border text-left">Sales Count</th>
              <th className="px-4 py-3 border text-left">Discount</th>
              <th className="px-4 py-3 border text-left">Label</th>
              <th className="px-4 py-3 border text-center">Featured</th>
              <th className="px-4 py-3 border text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bestSellingProducts.map((product) => (
              <tr key={product._id} className="hover:bg-gray-50 transition">
                <td className="px-4 py-3 border">
                  <div className="flex items-center">
                    <img
                      src={product.image}
                      alt={product.productname}
                      className="w-12 h-12 object-cover rounded mr-3"
                    />
                    <div>
                      <div className="font-medium">{product.productname}</div>
                      <div className="text-sm text-gray-500 truncate max-w-xs">
                        {product.productdescrib}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 border">{product.category}</td>
                <td className="px-4 py-3 border">${product.productprice.toFixed(2)}</td>
                <td className="px-4 py-3 border">
                  {editingProduct?._id === product._id ? (
                    <input
                      type="number"
                      value={editForm.salesCount}
                      onChange={(e) => setEditForm({ ...editForm, salesCount: Number(e.target.value) })}
                      className="w-20 border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      min="0"
                    />
                  ) : (
                    product.salesCount
                  )}
                </td>
                <td className="px-4 py-3 border">
                  {editingProduct?._id === product._id ? (
                    <input
                      type="number"
                      value={editForm.discount}
                      onChange={(e) => setEditForm({ ...editForm, discount: Number(e.target.value) })}
                      className="w-16 border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      min="0"
                      max="100"
                    />
                  ) : (
                    `${product.discount || 0}%`
                  )}
                </td>
                <td className="px-4 py-3 border">
                  {editingProduct?._id === product._id ? (
                    <select
                      value={editForm.label}
                      onChange={(e) => setEditForm({ ...editForm, label: e.target.value })}
                      className="border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                      <option value="">No Label</option>
                      {labelOptions.map(label => (
                        <option key={label} value={label}>{label}</option>
                      ))}
                    </select>
                  ) : (
                    <span className={`px-2 py-1 rounded text-xs ${
                      product.label 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : 'bg-gray-100 text-gray-500'
                    }`}>
                      {product.label || 'None'}
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 border text-center">
                  {editingProduct?._id === product._id ? (
                    <input
                      type="checkbox"
                      checked={editForm.featured}
                      onChange={(e) => setEditForm({ ...editForm, featured: e.target.checked })}
                      className="form-checkbox h-4 w-4 text-blue-600"
                    />
                  ) : (
                    <span className={`px-2 py-1 rounded text-xs ${
                      product.featured 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-500'
                    }`}>
                      {product.featured ? 'Yes' : 'No'}
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 border">
                  <div className="flex justify-center gap-2">
                    {editingProduct?._id === product._id ? (
                      <>
                        <button
                          onClick={handleUpdateProduct}
                          className="p-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                          disabled={loading}
                          title="Save Changes"
                        >
                          <MdSave className="w-4 h-4" />
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="p-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
                          disabled={loading}
                          title="Cancel Edit"
                        >
                          <MdCancel className="w-4 h-4" />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEdit(product)}
                          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                          disabled={loading || editingProduct !== null}
                          title="Edit Product"
                        >
                          <MdEdit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="p-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                          disabled={loading || editingProduct !== null}
                          title="Remove from Best Selling"
                        >
                          <MdDelete className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {bestSellingProducts.length === 0 && !loading && (
        <div className="text-center py-8 text-gray-500">
          No best selling products found. Add some products to get started.
        </div>
      )}
    </div>
  );
};

export default BestSellingManagement;