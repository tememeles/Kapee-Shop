import { Link } from "react-router-dom";
import React from "react";

interface SidebarItemProps {
  icon?: React.ReactNode;
  label: string;
  to: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, to }) => {
  return (
    <Link
      to={to}
      className="flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-100 transition cursor-pointer"
    >
      {icon && <span>{icon}</span>}
      <span className="font-medium">{label}</span>
    </Link>
  );
};

export default SidebarItem;
