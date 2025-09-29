import React, { useState } from "react";

const RegistrationForm: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="flex rounded-lg overflow-hidden shadow-lg w-full max-w-2xl">
        {/* Left Panel */}
        <div className="bg-yellow-400 w-1/2 p-6 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-black mb-2">Register</h2>
          <p className="text-black text-sm">
            Create your account to track orders, save favorites, and get personalized recommendations.
          </p>
        </div>

        {/* Right Panel */}
        <div className="bg-white w-1/2 p-6 relative">
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full p-2 border border-gray-300 rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-2 border border-gray-300 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                className="w-full p-2 border border-gray-300 rounded"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-2 bg-yellow-400 p-1 rounded text-sm"
              >
                👁
              </button>
            </div>

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Confirm password"
              className="w-full p-2 border border-gray-300 rounded"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Remember me
              </label>
              <a href="/login" className="text-yellow-500 hover:underline">
                Already have an account?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded uppercase font-semibold"
            >
              Sign Up
            </button>
          </form>

          {/* Close Button */}
          <button className="absolute top-2 right-2 text-black text-xl">
            ✕
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
