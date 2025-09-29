import CandlestickChart from "./candles"
import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { motion } from "framer-motion";

type SalesPoint = {
  month: string;
  sales: number;
  users: number;
};

const salesData: SalesPoint[] = [
  { month: "Jan", sales: 4000, users: 240 },
  { month: "Feb", sales: 3000, users: 139 },
  { month: "Mar", sales: 2000, users: 980 },
  { month: "Apr", sales: 2780, users: 390 },
  { month: "May", sales: 1890, users: 480 },
  { month: "Jun", sales: 2390, users: 380 },
  { month: "Jul", sales: 3490, users: 430 },
];

const productData = [
  { name: "Product A", value: 400 },
  { name: "Product B", value: 300 },
  { name: "Product C", value: 300 },
  { name: "Product D", value: 200 },
];

const topProducts = [
  { name: "Product A", category: "Electronics", sales: 400 },
  { name: "Product B", category: "Apparel", sales: 300 },
  { name: "Product C", category: "Home", sales: 300 },
  { name: "Product D", category: "Books", sales: 200 },
];

const COLORS = ["#60a5fa", "#34d399", "#f59e0b", "#f97316"];

interface DashboardStats {
  totalUsers: number;
  totalOrders: number;
  totalProducts: number;
  totalSales: number;
}

interface Order {
  _id: string;
  price: number;
  quantity: number;
  product: string;
  status: string;
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalSales: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch dashboard statistics
  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        setLoading(true);
        
        // Fetch data from all endpoints concurrently
        const [usersResponse, ordersResponse, productsResponse] = await Promise.all([
          axios.get('http://localhost:5000/api/users'),
          axios.get('http://localhost:5000/api/orders'),
          axios.get('http://localhost:5000/api/products')
        ]);

        // Calculate total sales from orders
        const orders: Order[] = ordersResponse.data;
        const totalSales = orders.reduce((sum: number, order: Order) => {
          return sum + (order.price * order.quantity);
        }, 0);

        setStats({
          totalUsers: usersResponse.data.length,
          totalOrders: ordersResponse.data.length,
          totalProducts: productsResponse.data.length,
          totalSales: totalSales
        });
        
        setError(null);
      } catch (err) {
        console.error('Error fetching dashboard stats:', err);
        setError('Failed to load dashboard statistics');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-br ml-[10rem] mt-[3rem] from-slate-50 to-slate-100 p-8">
      <main className="max-w-7xl mx-auto grid grid-cols-12 gap-6">
        {/* Error Display */}
        {error && (
          <div className="col-span-12 mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {/* Cards */}
        <div className="col-span-12 grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
          <PatternCard 
            title="Total Sales" 
            value={loading ? "Loading..." : `$${stats.totalSales.toLocaleString()}`} 
            patternId="p1"
          >
            <div className="text-xs text-white hover:translate-y-2 duration-700">
              {loading ? "Calculating..." : "From all orders"}
            </div>
          </PatternCard>

          <PatternCard 
            title="Total Users" 
            value={loading ? "Loading..." : stats.totalUsers.toLocaleString()} 
            patternId="p2"
          >
            <div className="text-xs text-white hover:translate-y-2 duration-700">
              {loading ? "Counting..." : "Registered users"}
            </div>
          </PatternCard>

          <PatternCard 
            title="Total Orders" 
            value={loading ? "Loading..." : stats.totalOrders.toLocaleString()} 
            patternId="p3"
          >
            <div className="text-xs text-white hover:translate-y-2 duration-700">
              {loading ? "Processing..." : "All time orders"}
            </div>
          </PatternCard>

          <PatternCard 
            title="Total Products" 
            value={loading ? "Loading..." : stats.totalProducts.toLocaleString()} 
            patternId="p4"
          >
            <div className="text-xs text-white hover:translate-y-2 duration-700">
              {loading ? "Loading..." : "In inventory"}
            </div>
          </PatternCard>
        </div>

        {/* Candlestick Chart Section */}
        <div className="col-span-12 bg-white p-4 rounded-2xl shadow-sm mt-6">
          <h3 className="text-md font-medium mb-4">Candlestick Chart</h3>
          <div className="w-full h-96 flex items-center justify-center">
            <CandlestickChart/>
          </div>
        </div>

        {/* Line & Pie Charts */}
        <div className="col-span-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="col-span-1 lg:col-span-2 bg-white p-4 rounded-2xl shadow-sm"
          >
            <h3 className="text-md font-medium mb-2">Sales & Users</h3>
            <div className="w-full h-56">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="sales" stroke="#6366f1" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="users" stroke="#10b981" strokeWidth={2} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="bg-white p-4 rounded-2xl shadow-sm"
          >
            <h3 className="text-md font-medium mb-2">Product Mix</h3>
            <div className="w-full h-56 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={productData} dataKey="value" nameKey="name" outerRadius={70} fill="#8884d8">
                    {productData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Bar Chart */}
        <div className="col-span-12 bg-white p-4 rounded-2xl shadow-sm mt-6">
          <h3 className="text-md font-medium mb-4">Sales by Category</h3>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" barSize={18} radius={[6, 6, 0, 0]} fill="#6366f1" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Products Table */}
        <div className="col-span-12 bg-white p-4 rounded-2xl shadow-sm mt-6">
          <h3 className="text-md font-medium mb-4">Top Products</h3>
          <table className="w-full text-sm text-left text-slate-600">
            <thead className="text-xs uppercase bg-slate-50">
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Category</th>
                <th className="px-4 py-2">Sales</th>
              </tr>
            </thead>
            <tbody>
              {topProducts.map((product, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2">{product.name}</td>
                  <td className="px-4 py-2">{product.category}</td>
                  <td className="px-4 py-2">${product.sales}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* Footer no need */}
      
    </div>
  );
}

// Reusable Card with Pattern Background
function PatternCard({
  title,
  value,
  children,
  patternId,
}: {
  title: string;
  value: string;
  children?: React.ReactNode;
  patternId: string;
}) {
  // Unique backgrounds and icons for each card
  const backgrounds: Record<string, string> = {
    p1: "bg-blue-500",
    p2: "bg-green-400",
    p3: "bg-orange-400",
    p4: "bg-purple-400",
  };
  const icons: Record<string, string> = {
    p1: "📈",
    p2: "👤",
    p3: "🔁",
    p4: "🎯",
  };
  const bgClass = backgrounds[patternId] || "bg-yellow-500";
  const icon = icons[patternId] || "📊";
  return (
    <div className="relative overflow-hidden rounded-2xl">
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 600 200">
        <defs>
          <pattern id={`${patternId}-dots`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="2" fill="rgba(99,102,241,0.08)" />
          </pattern>
          <linearGradient id={`${patternId}-grad`} x1="0%" x2="100%">
            <stop offset="0%" stopColor="#eef2ff" />
            <stop offset="100%" stopColor="#fff7ed" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId}-grad)`} />
        <rect width="100%" height="100%" fill={`url(#${patternId}-dots)`} />
      </svg>

      <div className={`relative ${bgClass} hover:translate-y-3 duration-700 backdrop-blur-sm p-5 rounded-2xl shadow-sm`}>
        <div className="flex items-start justify-between">
          <div>
            <div className="text-sm text-white">{title}</div>
            <div className="mt-2 text-2xl font-bold text-white">{value}</div>
            <div className="mt-2 text-xs text-white">{children}</div>
          </div>
          <div className="text-4xl opacity-10">{icon}</div>
        </div>
      </div>
    </div>
  );
}