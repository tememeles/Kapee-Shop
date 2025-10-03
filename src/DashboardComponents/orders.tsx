

import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { getApiUrl } from '../config/api';

type Order = {
  _id: string;
  product: string;
  quantity: number;
  price: number;
  status: string;
  createdAt: string;
  image?: string;
  userId?: string;
  userName?: string;
  userEmail?: string;
};

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    fetch(getApiUrl("api/orders"))
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch orders");
        return res.json();
      })
      .then((data) => {
        setOrders(data);
        setFilteredOrders(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Filter orders based on status and search term
  useEffect(() => {
    let filtered = orders;

    if (statusFilter !== 'all') {
      filtered = filtered.filter(order => order.status === statusFilter);
    }

    if (searchTerm) {
      filtered = filtered.filter(order => 
        order.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.userEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.product.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredOrders(filtered);
  }, [orders, statusFilter, searchTerm]);

  // Calculate statistics
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + (order.price * order.quantity), 0);
  const uniqueCustomers = new Set(orders.map(order => order.userId).filter(Boolean)).size;

  // Delete order function
  const handleDeleteOrder = async (orderId: string, productName: string) => {
    if (window.confirm(`Are you sure you want to delete the order for "${productName}"? This action cannot be undone.`)) {
      try {
        setLoading(true);
        const response = await fetch(getApiUrl(`api/orders/${orderId}`), {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete order');
        }

        // Remove the order from local state
        const updatedOrders = orders.filter(order => order._id !== orderId);
        setOrders(updatedOrders);
        setFilteredOrders(updatedOrders.filter(order => {
          let filtered = true;
          
          if (statusFilter !== 'all') {
            filtered = filtered && order.status === statusFilter;
          }
          
          if (searchTerm) {
            filtered = filtered && (
              order.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
              order.userEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
              order.product.toLowerCase().includes(searchTerm.toLowerCase())
            );
          }
          
          return filtered;
        }));
        
        setError(null);
        
        // Show success message
        alert('Order deleted successfully!');
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to delete order');
        console.error('Error deleting order:', err);
        alert('Failed to delete order. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };


  return (
    <div className="p-4 lg:p-8 ml-0 lg:ml-40 bg-slate-50 min-h-screen mt-16 lg:mt-0">
      <h2 className="text-xl lg:text-2xl font-bold mb-4 lg:mb-6">Orders Management</h2>
      
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-4 lg:mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900">{totalOrders}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">${totalRevenue.toFixed(2)}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Unique Customers</p>
              <p className="text-2xl font-bold text-gray-900">{uniqueCustomers}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <input
              type="text"
              placeholder="Search by customer name, email, or product..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">Loading orders...</div>
      ) : error ? (
        <div className="text-red-500 bg-red-50 p-4 rounded-md">{error}</div>
      ) : (
        <>
          <div className="mb-4 text-sm text-gray-600">
            Showing {filteredOrders.length} of {totalOrders} orders
          </div>
          <div className="overflow-x-auto bg-white rounded-xl shadow">
            <table className="min-w-full">
            <thead className="bg-slate-100 text-slate-700">
              <tr>
                <th className="text-left px-2 lg:px-6 py-3 text-xs lg:text-sm">Order ID</th>
                <th className="text-left px-2 lg:px-6 py-3 text-xs lg:text-sm">Customer</th>
                <th className="text-left px-2 lg:px-6 py-3 text-xs lg:text-sm hidden sm:table-cell">Email</th>
                <th className="text-left px-2 lg:px-6 py-3 text-xs lg:text-sm">Image</th>
                <th className="text-left px-2 lg:px-6 py-3 text-xs lg:text-sm">Product</th>
                <th className="text-left px-2 lg:px-6 py-3 text-xs lg:text-sm">Quantity</th>
                <th className="text-left px-2 lg:px-6 py-3 text-xs lg:text-sm">Price</th>
                <th className="text-left px-2 lg:px-6 py-3 text-xs lg:text-sm">Status</th>
                <th className="text-left px-2 lg:px-6 py-3 text-xs lg:text-sm hidden md:table-cell">Date</th>
                <th className="text-left px-2 lg:px-6 py-3 text-xs lg:text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={10} className="px-6 py-12 text-center text-gray-500">
                    {orders.length === 0 ? "No orders found." : "No orders match your filters."}
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => {
                  // Use the exact same image handling as productCards
                  const imgSrc = order.image && order.image.startsWith('http')
                    ? order.image
                    : new URL(`../assets/${order.image}`, import.meta.url).href;
                  
                  return (
                    <tr key={order._id} className="border-t hover:bg-gray-50">
                      <td className="px-2 lg:px-6 py-4 font-medium text-slate-800 text-xs lg:text-sm">{order._id.slice(-8)}</td>
                      <td className="px-2 lg:px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-medium text-slate-900 text-xs lg:text-sm">{order.userName || 'Guest'}</span>
                          <span className="text-xs text-slate-500">ID: {order.userId?.slice(-8) || 'N/A'}</span>
                        </div>
                      </td>
                      <td className="px-2 lg:px-6 py-4 text-xs lg:text-sm text-slate-600 hidden sm:table-cell">{order.userEmail || 'N/A'}</td>
                      <td className="px-2 lg:px-6 py-4">
                        <img 
                          src={imgSrc}
                          alt={order.product} 
                          className="w-8 h-8 lg:w-12 lg:h-12 object-cover rounded border"
                          onError={(e) => {
                            console.log('Image failed to load:', order.image);
                            e.currentTarget.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21,15 16,10 5,21"/></svg>';
                          }}
                        />
                      </td>
                      <td className="px-2 lg:px-6 py-4 text-xs lg:text-sm">{order.product}</td>
                      <td className="px-2 lg:px-6 py-4 text-xs lg:text-sm">{order.quantity}</td>
                      <td className="px-2 lg:px-6 py-4 font-semibold text-xs lg:text-sm">${order.price}</td>
                      <td className="px-2 lg:px-6 py-4">
                        <span
                          className={`text-xs font-medium px-2 py-1 rounded-full ${
                            order.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : order.status === "shipped"
                              ? "bg-blue-100 text-blue-800"
                              : order.status === "delivered"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-500">{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleDeleteOrder(order._id, order.product)}
                          disabled={loading}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Delete Order"
                        >
                          <MdDelete className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
