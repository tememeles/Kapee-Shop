// src/pages/Products.tsx
import { useState, useEffect } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import axios from "axios";

interface Product {
  _id: string;
  productname: string;
  productdescrib: string;
  productprice: number;
  productquantity: number;
  category: string;
  image?: string;
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  
  // Image upload states
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [formProduct, setFormProduct] = useState<Omit<Product, '_id'>>({
    productname: "",
    productdescrib: "",
    productprice: 0,
    productquantity: 0,
    category: "",
    image: ""
  });

  // Fetch products from database
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/api/products");
      console.log('Products API Response:', response.data);
      
      // Handle the API response structure: { success: true, count: number, products: Product[] }
      if (response.data && response.data.products && Array.isArray(response.data.products)) {
        setProducts(response.data.products);
      } else if (Array.isArray(response.data)) {
        // Fallback for direct array response
        setProducts(response.data);
      } else {
        console.error('Expected products array, got:', response.data);
        setProducts([]);
      }
      setError(null);
    } catch (err) {
      setError("Failed to fetch products");
      console.error("Error fetching products:", err);
      setProducts([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear previous messages
    setError(null);
    setSuccess(null);
    
    // Valid categories as per backend model
    const validCategories = ["Electronics", "Clothing", "Books", "Home", "Sports", "Beauty", "Toys", "Other"];
    
    // Validate all required fields exactly as backend expects
    if (!formProduct.productname.trim()) {
      setError("Product name is required");
      return;
    }
    
    if (!formProduct.productdescrib.trim()) {
      setError("Product description is required");
      return;
    }
    
    if (!formProduct.category || !validCategories.includes(formProduct.category)) {
      setError("Please select a valid category");
      return;
    }
    
    if (formProduct.productprice == null || formProduct.productprice < 0) {
      setError("Product price must be 0 or greater");
      return;
    }
    
    if (formProduct.productquantity == null || formProduct.productquantity < 0 || !Number.isInteger(formProduct.productquantity)) {
      setError("Product quantity must be a non-negative integer");
      return;
    }
    
    if (formProduct.productquantity < 0) {
      setError("Product quantity cannot be negative");
      return;
    }

    try {
      setLoading(true);
      let imageUrl = formProduct.image;
      
      // Upload image if a file is selected
      if (selectedFile) {
        imageUrl = await uploadImageToCloudinary(selectedFile);
      }
      
      const productData = { 
        ...formProduct, 
        image: imageUrl,
        productprice: Number(formProduct.productprice),
        productquantity: Number(formProduct.productquantity)
      };
      console.log('Sending product data:', productData);
      console.log('Data types:', {
        productname: typeof productData.productname,
        productdescrib: typeof productData.productdescrib,
        productprice: typeof productData.productprice,
        productquantity: typeof productData.productquantity,
        values: {
          productname: productData.productname,
          productdescrib: productData.productdescrib,
          productprice: productData.productprice,
          productquantity: productData.productquantity
        }
      });
      const response = await axios.post("http://localhost:5000/api/products", productData);
      
      // Add the new product to the list immediately
      if (response.data.success && response.data.product) {
        setProducts([...products, response.data.product]);
        setError(null);
        setSuccess("Product added successfully!");
        
        // Clear success message after 3 seconds
        setTimeout(() => setSuccess(null), 3000);
      } else {
        // Fallback: refetch all products to ensure consistency
        await fetchProducts();
      }
      
      // Reset form and image states
      setFormProduct({
        productname: "",
        productdescrib: "",
        productprice: 0,
        productquantity: 0,
        category: "",
        image: ""
      });
      setSelectedFile(null);
      setImagePreview(null);
      setError(null);
      setSuccess("Product added successfully!");
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess(null);
      }, 3000);
    } catch (err: any) {
      console.error("Error adding product:", err);
      
      // Clear any success message when there's an error
      setSuccess(null);
      
      // Show specific error message from server
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError(selectedFile ? "Failed to upload image or add product" : "Failed to add product");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct || !formProduct.productname || !formProduct.category) return;

    try {
      setLoading(true);
      let imageUrl = formProduct.image;
      
      // Upload new image if a file is selected
      if (selectedFile) {
        imageUrl = await uploadImageToCloudinary(selectedFile);
      }
      
      const productData = { ...formProduct, image: imageUrl };
      const response = await axios.put(`http://localhost:5000/api/products/${editingProduct._id}`, productData);
      
      // Safely update products array
      if (Array.isArray(products)) {
        setProducts(products.map(p => p._id === editingProduct._id ? response.data : p));
      } else {
        // If products is not an array, refetch all products
        await fetchProducts();
      }
      
      cancelEdit();
      setError(null);
    } catch (err) {
      setError(selectedFile ? "Failed to upload image or update product" : "Failed to update product");
      console.error("Error updating product:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormProduct({
      productname: product.productname,
      productdescrib: product.productdescrib,
      productprice: product.productprice,
      productquantity: product.productquantity,
      category: product.category,
      image: product.image || ""
    });
    // Clear any file selection but keep the existing image URL for preview
    setSelectedFile(null);
    setImagePreview(null);
  };

  const cancelEdit = () => {
    setEditingProduct(null);
    setFormProduct({
      productname: "",
      productdescrib: "",
      productprice: 0,
      productquantity: 0,
      category: "",
      image: ""
    });
    // Clear image upload states
    setSelectedFile(null);
    setImagePreview(null);
  };

  // Handle file selection
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
      return response.data.url;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw new Error('Failed to upload image');
    } finally {
      setUploadingImage(false);
    }
  };

  // Clear image selection
  const clearImageSelection = () => {
    setSelectedFile(null);
    setImagePreview(null);
    setFormProduct({ ...formProduct, image: "" });
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        setLoading(true);
        await axios.delete(`http://localhost:5000/api/products/${id}`);
        setProducts(products.filter((p) => p._id !== id));
        setError(null);
      } catch (err) {
        setError("Failed to delete product");
        console.error("Error deleting product:", err);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="bg-gray-50 ml-0 lg:ml-40 p-4 lg:p-6 min-h-screen rounded-xl mt-16 lg:mt-0">
      {/* Header */}
      <h1 className="text-xl lg:text-2xl font-bold text-gray-700 mb-4 lg:mb-6">Product List</h1>

      {/* Add/Edit Product Form */}
      <form onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-2 lg:gap-2 mb-6 bg-white p-4 rounded shadow">
        <input
          type="text"
          placeholder="Product Name"
          value={formProduct.productname}
          onChange={(e) => setFormProduct({ ...formProduct, productname: e.target.value })}
          className="border rounded px-3 py-2 w-full"
          required
        />
        <textarea
          placeholder="Description"
          value={formProduct.productdescrib}
          onChange={(e) => setFormProduct({ ...formProduct, productdescrib: e.target.value })}
          className="border rounded px-3 py-2 w-full sm:col-span-2 lg:col-span-1"
          required
        />
        <select
          value={formProduct.category}
          onChange={(e) => setFormProduct({ ...formProduct, category: e.target.value })}
          className="border rounded px-3 py-2 w-full"
          required
        >
          <option value="">Select Category</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
          <option value="Books">Books</option>
          <option value="Home">Home</option>
          <option value="Sports">Sports</option>
          <option value="Beauty">Beauty</option>
          <option value="Toys">Toys</option>
          <option value="Other">Other</option>
        </select>
        <input
          type="number"
          placeholder="Price"
          value={formProduct.productprice || ""}
          onChange={(e) => setFormProduct({ 
            ...formProduct, 
            productprice: e.target.value === "" ? 0 : Number(e.target.value) 
          })}
          className="border rounded px-3 py-2"
          min="0"
          step="0.01"
          required
        />
        <input
          type="number"
          placeholder="Quantity"
          value={formProduct.productquantity || ""}
          onChange={(e) => setFormProduct({ 
            ...formProduct, 
            productquantity: e.target.value === "" ? 0 : Number(e.target.value) 
          })}
          className="border rounded px-3 py-2"
          min="0"
          required
        />
        {/* Image Upload Section */}
        <div className="col-span-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* File Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Product Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="border rounded px-3 py-2 w-full"
              />
              <p className="text-xs text-gray-500 mt-1">
                Or enter image URL below
              </p>
            </div>
            
            {/* Image URL Input (Alternative) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Or Image URL
              </label>
              <input
                type="text"
                placeholder="https://example.com/image.jpg"
                value={formProduct.image}
                onChange={(e) => setFormProduct({ ...formProduct, image: e.target.value })}
                className="border rounded px-3 py-2 w-full"
              />
            </div>
          </div>
          
          {/* Image Preview */}
          {(imagePreview || formProduct.image) && (
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image Preview
              </label>
              <div className="relative inline-block">
                <img
                  src={imagePreview || formProduct.image}
                  alt="Product preview"
                  className="w-32 h-32 object-cover rounded border"
                  onError={(e) => {
                    e.currentTarget.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21,15 16,10 5,21"/></svg>';
                  }}
                />
                <button
                  type="button"
                  onClick={clearImageSelection}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                >
                  ×
                </button>
              </div>
              {uploadingImage && (
                <div className="mt-2 text-sm text-blue-600">
                  Uploading image...
                </div>
              )}
            </div>
          )}
        </div>

        <div className="col-span-6 flex gap-2">
          <button 
            type="submit" 
            disabled={loading || uploadingImage}
            className="px-6 py-2 bg-yellow-400 text-black rounded hover:bg-yellow-500 disabled:opacity-50"
          >
            {uploadingImage ? "Uploading Image..." : loading ? "Processing..." : editingProduct ? "Update Product" : "Add Product"}
          </button>
          {editingProduct && (
            <button 
              type="button" 
              onClick={cancelEdit}
              className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Error Display */}
      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {/* Success Display */}
      {success && (
        <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
          {success}
        </div>
      )}

      {/* Loading Display */}
      {loading && (
        <div className="mb-4 p-4 bg-blue-100 border border-blue-400 text-blue-700 rounded">
          Loading...
        </div>
      )}

      {/* Product Table */}
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full border border-gray-200 rounded-lg">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2 border">Image</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Description</th>
              <th className="px-4 py-2 border">Category</th>
              <th className="px-4 py-2 border">Price ($)</th>
              <th className="px-4 py-2 border">Quantity</th>
              {/* SKU and Status removed */}
              <th className="px-4 py-2 border text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(products) && products.length > 0 ? products.map((product) => (
              <tr key={product._id} className="hover:bg-gray-50 transition">
                <td className="px-4 py-2 border">
                  {product.image && (
                    <img src={product.image} alt={product.productname} className="w-12 h-12 object-cover rounded" />
                  )}
                </td>
                <td className="px-4 py-2 border font-medium">{product.productname}</td>
                <td className="px-4 py-2 border max-w-xs truncate">{product.productdescrib}</td>
                <td className="px-4 py-2 border">{product.category}</td>
                <td className="px-4 py-2 border">${product.productprice}</td>
                <td className="px-4 py-2 border text-center">{product.productquantity}</td>
                {/* SKU and Status removed */}
                <td className="px-4 py-2 border flex justify-center gap-2">
                  <button 
                    onClick={() => handleEdit(product)}
                    className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    disabled={loading}
                  >
                    <MdEdit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
                    disabled={loading}
                  >
                    <MdDelete className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={7} className="text-center py-4 text-gray-500">
                  {loading ? 'Loading products...' : 'No products available.'}
                </td>
              </tr>
            )}
            {Array.isArray(products) && products.length === 0 && !loading && (
              <tr>
                <td colSpan={7} className="text-center py-4 text-gray-500">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
