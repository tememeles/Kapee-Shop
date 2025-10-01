import { useContext, useState } from "react";
import { DarkModeContext } from "../context/DarkModeContext";

const Settings = () => {
  const { darkMode, setDarkMode } = useContext(DarkModeContext);
  const [notifications, setNotifications] = useState(true);


  return (
    <div className="p-4 lg:p-6 ml-0 lg:ml-44 bg-white dark:bg-gray-900 rounded-2xl shadow-md mt-16 lg:mt-20 transition-colors duration-300 mx-4 lg:mx-0">
      <h2 className="text-xl lg:text-2xl font-bold mb-4 lg:mb-6 dark:text-white">Settings</h2>

      {/* Dark Mode Toggle */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-2 sm:gap-0">
        <span className="text-base lg:text-lg dark:text-white">Dark Mode</span>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`px-4 py-2 rounded-lg transition-colors duration-300 w-full sm:w-auto ${
            darkMode ? "bg-gray-800 text-white" : "bg-gray-200 dark:bg-gray-700 dark:text-white"
          }`}
        >
          {darkMode ? "On" : "Off"}
        </button>
      </div>

      {/* Notifications Toggle */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-2 sm:gap-0">
        <span className="text-base lg:text-lg dark:text-white">Notifications</span>
        <button
          onClick={() => setNotifications(!notifications)}
          className={`px-4 py-2 rounded-lg transition-colors duration-300 w-full sm:w-auto ${
            notifications ? "bg-green-500 text-white" : "bg-gray-200 dark:bg-gray-700 dark:text-white"
          }`}
        >
          {notifications ? "Enabled" : "Disabled"}
        </button>
      </div>

      {/* Save Button */}
      <button className="mt-4 lg:mt-6 bg-yellow-400 text-black px-6 py-2 rounded-xl shadow hover:bg-yellow-500 dark:bg-yellow-500 dark:text-black w-full sm:w-auto">
        Save Changes
      </button>
    </div>
  );
};

export default Settings;
