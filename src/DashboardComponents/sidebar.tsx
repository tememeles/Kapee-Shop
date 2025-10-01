
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, Settings, Shield, Users, Star, Menu, X } from "lucide-react";

export default function Sidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Mobile Menu Button - Only visible on mobile */}
      <button
        onClick={toggleMobileMenu}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md hover:bg-gray-100 transition-colors"
      >
        {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleMobileMenu}
        />
      )}

      {/* Sidebar - Hidden on mobile unless menu is open, always visible on desktop */}
      <div className={`
        bg-white border pt-16 solid text-black fixed top-0 left-0 h-screen shadow-md p-4 flex flex-col gap-6 z-40
        w-64 lg:w-40
        transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <img
          src="/src/assets/Kapee.png"
          alt="Admin Logo"
          className="mx-auto mt-[-2.7rem] mb-2 w-20 lg:w-auto"
        />
        <nav className="flex flex-col mt-12 gap-7">
          <SidebarItem icon={<Settings size={18} />} label="Dashboard" to="dashboard" onClick={toggleMobileMenu} />
          <SidebarItem icon={<ShoppingBag size={18} />} label="Products" to="addproducts" onClick={toggleMobileMenu} />
          <SidebarItem icon={<Star size={18} />} label="Best Selling" to="/bestselling" onClick={toggleMobileMenu} />
          <SidebarItem icon={<Shield size={18} />} label="Orders" to="/orders" onClick={toggleMobileMenu} />
          <SidebarItem icon={<Users size={18} />} label="Users" to="/users" onClick={toggleMobileMenu} />
          <SidebarItem icon={<ShoppingBag size={18} />} label="Shope" to="/shope" onClick={toggleMobileMenu} />
          <SidebarItem icon={<Settings size={18} />} label="Settings" to="/settings" onClick={toggleMobileMenu} />
        </nav>
      </div>
    </>
  );
}

function SidebarItem({ 
  icon, 
  label, 
  to, 
  external, 
  onClick 
}: { 
  icon: React.ReactNode; 
  label: string; 
  to: string; 
  external?: boolean;
  onClick?: () => void;
}) {
  if (external) {
    return (
      <a
        href={to}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
        className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-black hover:bg-gray-100 transition-colors"
      >
        {icon}
        {label}
      </a>
    );
  }
  return (
    <Link
      to={to}
      onClick={onClick}
      className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-black hover:bg-gray-100 transition-colors"
    >
      {icon}
      {label}
    </Link>
  );
}
