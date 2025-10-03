import { useState, useEffect } from "react";
import { MdDelete, MdEdit, MdSave, MdCancel } from "react-icons/md";
import { FaUser, FaUserShield, FaUsers } from "react-icons/fa";
import axios from "axios";
import { getApiUrl } from '../config/api';

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
  const [success, setSuccess] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<"all" | "user" | "admin">("all");
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editForm, setEditForm] = useState({ name: "", email: "", role: "user" as 'user' | 'admin' });

  // Fetch users from database
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(getApiUrl("api/users"));
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
        await axios.delete(getApiUrl(`api/users/${id}`));
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

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setEditForm({
      name: user.name,
      email: user.email,
      role: user.role
    });
    setError(null);
    setSuccess(null);
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
    setEditForm({ name: "", email: "", role: "user" });
    setError(null);
    setSuccess(null);
  };

  const handleUpdateUser = async () => {
    if (!editingUser) return;
    
    try {
      setLoading(true);
      const response = await axios.put(getApiUrl(`api/users/${editingUser._id}`), editForm);
      setUsers(users.map(user => user._id === editingUser._id ? response.data : user));
      setSuccess("User updated successfully!");
      setError(null);
      setEditingUser(null);
      setEditForm({ name: "", email: "", role: "user" });
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess(null);
      }, 3000);
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to update user");
      setSuccess(null);
      console.error("Error updating user:", err);
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
    <div className="bg-gray-50 ml-0 lg:ml-40 p-4 lg:p-6 min-h-screen rounded-xl mt-16 lg:mt-0">
      {/* Header */}
      <div className="mb-4 lg:mb-6">
        <h1 className="text-xl lg:text-2xl font-bold text-gray-700 mb-2">User Management</h1>
        <p className="text-gray-600 text-sm lg:text-base">Manage system users and their roles</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-4 lg:mb-6">
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
      <div className="bg-white p-4 rounded-lg shadow-md mb-4 lg:mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search users by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border rounded px-3 py-2 text-sm lg:text-base focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <div className="w-full sm:w-auto">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value as "all" | "user" | "admin")}
              className="w-full border rounded px-3 py-2 text-sm lg:text-base focus:outline-none focus:ring-2 focus:ring-yellow-400"
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

      {/* Success Display */}
      {success && (
        <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
          {success}
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
                    {editingUser?._id === user._id ? (
                      <input
                        type="text"
                        value={editForm.name}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        className="w-full border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Enter name"
                      />
                    ) : (
                      <div className="flex items-center">
                        {user.role === 'admin' ? (
                          <FaUserShield className="text-purple-500 mr-2" />
                        ) : (
                          <FaUser className="text-gray-500 mr-2" />
                        )}
                        <span className="font-medium">{user.name}</span>
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 border">
                    {editingUser?._id === user._id ? (
                      <input
                        type="email"
                        value={editForm.email}
                        onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                        className="w-full border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Enter email"
                      />
                    ) : (
                      <span className="text-gray-600">{user.email}</span>
                    )}
                  </td>
                  <td className="px-4 py-3 border">
                    {editingUser?._id === user._id ? (
                      <select
                        value={editForm.role}
                        onChange={(e) => setEditForm({ ...editForm, role: e.target.value as 'user' | 'admin' })}
                        className="border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    ) : (
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium border ${
                          user.role === 'admin'
                            ? 'bg-purple-100 text-purple-800 border-purple-300'
                            : 'bg-green-100 text-green-800 border-green-300'
                        }`}
                      >
                        {user.role === 'admin' ? 'Admin' : 'User'}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 border text-gray-500">
                    {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                  </td>
                  <td className="px-4 py-3 border">
                    <div className="flex justify-center gap-2">
                      {editingUser?._id === user._id ? (
                        <>
                          <button
                            onClick={handleUpdateUser}
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
                            onClick={() => handleEdit(user)}
                            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                            disabled={loading || editingUser !== null}
                            title="Edit User"
                          >
                            <MdEdit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(user._id)}
                            className="p-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                            disabled={loading || editingUser !== null}
                            title="Delete User"
                          >
                            <MdDelete className="w-4 h-4" />
                          </button>
                        </>
                      )}
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