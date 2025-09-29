
import React from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, Settings, Shield, Users} from "lucide-react";

export default function Sidebar(): JSX.Element {
  return (
    <div className="bg-WHITE border pt-16 solid text-black w-40 fixed top-0 left-0 h-screen shadow-md p-4 flex flex-col gap-6">
      <img
        src="https://sdmntprnorthcentralus.oaiusercontent.com/files/00000000-0fec-622f-9c17-500eec4216ac/raw?se=2025-09-29T08%3A55%3A55Z&sp=r&sv=2024-08-04&sr=b&scid=fee51c2b-8ac4-5edd-b5e0-59b9da73af05&skoid=38550de5-1fab-49d1-9ebb-83af5557cc43&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-09-28T14%3A59%3A46Z&ske=2025-09-29T14%3A59%3A46Z&sks=b&skv=2024-08-04&sig=ysb/6YPUi4sBFtADT6qW0RrGa7w40xCaVcIDh43SSUE%3D"
        alt="Admin Logo"
        className="w-32 h-32 object-cover rounded-full mx-auto mt-[-4rem] mb-2"
      />
      <nav className="flex flex-col mt-12 gap-7 text-3xl ">
        <SidebarItem icon={<Settings size={18} />} label="Dashboard" to="dashboard" />
        <SidebarItem icon={<ShoppingBag size={18} />} label="Products" to="addproducts" />
        <SidebarItem icon={<Shield size={18} />} label="Orders" to="/orders" />
        <SidebarItem icon={<Users size={18} />} label="Users" to="/users" />
        <SidebarItem icon={<ShoppingBag size={18} />} label="Shope" to="/shope" />
        <SidebarItem icon={<Settings size={18} />} label="Settings" to="/settings" />
        {/* <SidebarItem icon={<LogOut size={18} color="red" />} label="Logout" to="/" /> */}
      </nav>
    </div>
  );
}

function SidebarItem({ icon, label, to, external }: { icon: React.ReactNode; label: string; to: string; external?: boolean }) {
  if (external) {
    return (
      <a
        href={to}
        target="_blank"
        rel="noopener noreferrer"
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
      className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-black hover:bg-gray-100 transition-colors"
    >
      {icon}
      {label}
    </Link>
  );
}
