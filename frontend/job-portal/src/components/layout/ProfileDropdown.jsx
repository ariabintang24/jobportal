import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProfileDropdown = ({
  isOpen,
  onToggle,
  avatar,
  companyName,
  email,
  userRole,
  logout,
}) => {
  const navigate = useNavigate();
  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className="flex items-center space-x-3 p-2 rounded-xl hover:bg-gray-50 transition-colors duration-200"
      >
        {avatar ? (
          <img
            className="w-9 h-9 rounded-full object-cover"
            src={avatar}
            alt="avatar"
          />
        ) : (
          <div className="h-8 w-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-sm">
              {companyName.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
        <div className="hidden sm:block text-left">
          <p className="text-sm font-medium text-gray-900">{companyName}</p>
          <p className="text-xs text-gray-500">Employer</p>
        </div>
        <ChevronDown className="w-4 h-4 text-gray-400" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 py-2 w-56 bg-white rounded-xl shadow-md border border-gray-100 z-50">
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-xs font-medium text-gray-900">{companyName}</p>
            <p className="text-xs text-gray-500">{email}</p>
          </div>

          <a
            onClick={() =>
              navigate(
                userRole === "jobseeker" ? "/profile" : "/company-profile",
              )
            }
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            View Profile
          </a>

          <div className="border-t border-gray-100 mt-2 pt-2">
            <a
              href="#"
              onClick={logout}
              className="blcok px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
            >
              Sign Out
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
