import { useEffect, useState } from "react"
import axios from "axios"
import { getApiUrl } from '../config/api';

interface ProductData {
    _id: string;
    productname: string;
    productdescrib: string;
    productprice: number;
    productquantity: number;
    category?: string;
    image?: string;
    createdAt?: string;
}

export default function ProductTable(){
    const [products, setProducts] = useState<ProductData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await axios.get(getApiUrl('api/products'));
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
                setError('Failed to fetch products from server. Please check your internet connection or try again later.');
            } finally {
                setLoading(false);
            }
        };
        
        fetchProducts();
    }, []);

    const handleEdit = (id: string) => {
        console.log('Edit product:', id);
        // TODO: Implement edit functionality
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await axios.delete(getApiUrl(`api/products/${id}`));
                setProducts(products.filter(product => product._id !== id));
            } catch (error) {
                console.error('Error deleting product:', error);
                alert('Failed to delete product');
            }
        }
    };

    const handleView = (id: string) => {
        console.log('View product:', id);
        // TODO: Implement view functionality
    };
    if (loading) {
        return <div className="p-8 text-center">Loading products...</div>;
    }

    if (error) {
        return <div className="p-8 text-center text-red-500">Error: {error}</div>;
    }

    return(
        <div className="p-8">
            <h2 className="text-2xl font-bold mb-6">Product Table</h2>
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border border-gray-300 p-2 text-left">Product ID</th>
                        <th className="border border-gray-300 p-2 text-left">Product Name</th>
                        <th className="border border-gray-300 p-2 text-left">Product Description</th>
                        <th className="border border-gray-300 p-2 text-left">Product Price</th>
                        <th className="border border-gray-300 p-2 text-left">Product Quantity</th>
                        <th className="border border-gray-300 p-2 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((item) => (
                        <tr key={item._id} className="hover:bg-gray-50">
                            <td className="border border-gray-300 p-2">{item._id}</td>
                            <td className="border border-gray-300 p-2">{item.productname}</td>
                            <td className="border border-gray-300 p-2">{item.productdescrib}</td>
                            <td className="border border-gray-300 p-2">${item.productprice}</td>
                            <td className="border border-gray-300 p-2">{item.productquantity}</td>
                            <td className="border border-gray-300 p-2">
                                <button 
                                    className="bg-blue-500 text-white px-2 py-1 rounded mr-1 hover:bg-blue-600"
                                    onClick={() => handleEdit(item._id)}
                                >
                                    Edit
                                </button>
                                <button 
                                    className="bg-red-500 text-white px-2 py-1 rounded mr-1 hover:bg-red-600"
                                    onClick={() => handleDelete(item._id)}
                                >
                                    Delete
                                </button>
                                <button 
                                    className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                                    onClick={() => handleView(item._id)}
                                >
                                    View
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}