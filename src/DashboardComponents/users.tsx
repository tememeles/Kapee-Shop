import { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { FaUser, FaUserShield, FaUsers } from "react-icons/fa";
import axios from "axios";

interface User {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  createdAt: string;
}

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<"all" | "user" | "admin">("all");

  // Fetch users from database
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/api/users");
      setUsers(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch users");
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        setLoading(true);
        await axios.delete(`http://localhost:5000/api/users/${id}`);
        setUsers(users.filter((user) => user._id !== id));
        setError(null);
      } catch (err) {
        setError("Failed to delete user");
        console.error("Error deleting user:", err);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleRoleUpdate = async (id: string, newRole: 'user' | 'admin') => {
    try {
      setLoading(true);
      const response = await axios.put(`http://localhost:5000/api/users/${id}`, { role: newRole });
      setUsers(users.map(user => user._id === id ? response.data : user));
      setError(null);
    } catch (err) {
      setError("Failed to update user role");
      console.error("Error updating user role:", err);
    } finally {
      setLoading(false);
    }
  };

  // Filter users based on search term and role
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  // Calculate statistics
  const totalUsers = users.length;
  const adminUsers = users.filter(user => user.role === 'admin').length;
  const regularUsers = users.filter(user => user.role === 'user').length;

  return (
    <div className="bg-gray-50 ml-40 p-6 min-h-screen rounded-xl">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-700 mb-2">User Management</h1>
        <p className="text-gray-600">Manage system users and their roles</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-sm font-medium">Total Users</p>
              <p className="text-2xl font-bold text-gray-700">{totalUsers}</p>
            </div>
            <FaUsers className="text-blue-500 text-3xl" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 text-sm font-medium">Regular Users</p>
              <p className="text-2xl font-bold text-gray-700">{regularUsers}</p>
            </div>
            <FaUser className="text-green-500 text-3xl" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-600 text-sm font-medium">Admin Users</p>
              <p className="text-2xl font-bold text-gray-700">{adminUsers}</p>
            </div>
            <FaUserShield className="text-purple-500 text-3xl" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search users by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <div>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value as "all" | "user" | "admin")}
              className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              <option value="all">All Roles</option>
              <option value="user">Users</option>
              <option value="admin">Admins</option>
            </select>
          </div>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {/* Loading Display */}
      {loading && (
        <div className="mb-4 p-4 bg-blue-100 border border-blue-400 text-blue-700 rounded">
          Loading users...
        </div>
      )}

      {/* Users Table */}
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full border border-gray-200 rounded-lg">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-3 border text-left">Name</th>
              <th className="px-4 py-3 border text-left">Email</th>
              <th className="px-4 py-3 border text-left">Role</th>
              <th className="px-4 py-3 border text-left">Created Date</th>
              <th className="px-4 py-3 border text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 && !loading ? (
              <tr>
                <td colSpan={5} className="text-center py-8 text-gray-500">
                  {users.length === 0 ? "No users found." : "No users match your filters."}
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3 border">
                    <div className="flex items-center">
                      {user.role === 'admin' ? (
                        <FaUserShield className="text-purple-500 mr-2" />
                      ) : (
                        <FaUser className="text-gray-500 mr-2" />
                      )}
                      <span className="font-medium">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 border text-gray-600">{user.email}</td>
                  <td className="px-4 py-3 border">
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleUpdate(user._id, e.target.value as 'user' | 'admin')}
                      className={`px-2 py-1 rounded text-xs font-medium border ${
                        user.role === 'admin' 
                          ? 'bg-purple-100 text-purple-800 border-purple-300' 
                          : 'bg-green-100 text-green-800 border-green-300'
                      }`}
                      disabled={loading}
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td className="px-4 py-3 border text-gray-500">
                    {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                  </td>
                  <td className="px-4 py-3 border">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="p-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                        disabled={loading}
                        title="Delete User"
                      >
                        <MdDelete className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Summary */}
      {filteredUsers.length > 0 && (
        <div className="mt-4 text-center text-gray-600">
          Showing {filteredUsers.length} of {totalUsers} users
        </div>
      )}
    </div>
  );
};

export default Users;