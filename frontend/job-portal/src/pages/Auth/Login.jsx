import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Loader,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

import axiosInstance from "../../utils/axiosInstance.js";
import { API_PATHS } from "../../utils/apiPath.js";

import { validateEmail, validatePassword } from "../../utils/helper.js";

import useAuth from "../../context/useAuth.js";

const Login = () => {
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [formState, setFormState] = useState({
    loading: false,
    errors: {},
    showPassword: false,
    success: false,
  });

  //Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (formState.errors[name]) {
      setFormState((prev) => ({
        ...prev,
        errors: {
          ...prev.errors,
          [name]: "",
        },
      }));
    }
  };

  const validateForm = () => {
    const errors = {
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
    };

    //Remove empty errors
    Object.keys(errors).forEach((key) => {
      if (!errors[key]) delete errors[key];
    });

    setFormState((prev) => ({
      ...prev,
      errors,
    }));

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setFormState((prev) => ({
      ...prev,
      loading: true,
    }));

    try {
      // Login API integration
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email: formData.email,
        password: formData.password,
        rememberMe: formData.rememberMe,
      });

      const { token, role } = response.data;

      // Pastikan token tersedia
      if (!token) {
        throw new Error("Login token not received");
      }

      // Simpan user dan token melalui AuthContext
      login(response.data, token);

      setFormState((prev) => ({
        ...prev,
        loading: false,
        success: true,
        errors: {},
      }));

      // Redirect berdasarkan role
      const redirectPath =
        role === "employer" ? "/employer-dashboard" : "/find-jobs";

      setTimeout(() => {
        window.location.href = redirectPath;
      }, 1500);
    } catch (error) {
      setFormState((prev) => ({
        ...prev,
        loading: false,
        errors: {
          submit:
            error.response?.data?.message ||
            error.message ||
            "Login failed. Please try again.",
        },
      }));
    }
  };

  if (formState.success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 0 }}
          className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center"
        >
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2 text-shadow-gray-900">
            Welcome back!
          </h2>
          <p className="text-gray-600 mb-4">
            You have been successfully logged in.
          </p>
          <div className="animate-spin w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full mx-auto" />
          <p className="text-sm text-gray-500 mt-2">
            Redirecting to your dashboard...
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md bg-white rounded-xl shadow-lg p-8"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Welcome back</h2>

          <p className="mt-2 text-gray-500">Sign in to your Carigawe account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-semibold mb-2"
            >
              Email Address
            </label>

            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />

              <input
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                  formState.errors.email
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-600"
                } focus:outline-none focus:ring-2 focus:border-transparent transition-colors`}
              />
            </div>

            {formState.errors.email && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {formState.errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 font-semibold mb-2"
            >
              Password
            </label>

            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />

              <input
                id="password"
                type={formState.showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-12 py-3 rounded-lg border ${
                  formState.errors.password
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-600"
                } focus:outline-none focus:ring-2 focus:border-transparent transition-colors`}
              />

              <button
                type="button"
                onClick={() =>
                  setFormState((prev) => ({
                    ...prev,
                    showPassword: !prev.showPassword,
                  }))
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {formState.showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>

            {formState.errors.password && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {formState.errors.password}
              </p>
            )}
          </div>

          {/* Remember Me */}
          {/* <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleInputChange}
                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />

              <span className="text-sm text-gray-600">Remember me</span>
            </label>

            <button
              type="button"
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Forgot password?
            </button>
          </div> */}

          {/* Submit Error */}
          {formState.errors.submit && (
            <div className="bg-red-50 border border-red-200 p-3 rounded-lg">
              <p className="text-red-700 text-sm flex items-center">
                <AlertCircle className="w-4 h-4 mr-2 shrink-0" />
                {formState.errors.submit}
              </p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={formState.loading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 flex items-center justify-center gap-2 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {formState.loading ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                <span>Signing in...</span>
              </>
            ) : (
              <span>Sign In</span>
            )}
          </button>

          {/* Signup Link */}
          <div className="text-center pt-2">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Create here
              </Link>
            </p>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
