import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  Eye,
  Upload,
  EyeOff,
  Loader,
  AlertCircle,
  CheckCircle,
  UserCheck,
  Building2,
} from "lucide-react";

import {
  validateAvatar,
  validateEmail,
  validatePassword,
} from "../../utils/helper.js";
import axiosInstance from "../../utils/axiosInstance.js";
import { API_PATHS } from "../../utils/apiPath.js";
import uploadImage from "../../utils/uploadImage.js";
import useAuth from "../../context/useAuth.js";

const SignUp = () => {
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "",
    avatar: null,
  });

  const [formState, setFormState] = useState({
    loading: false,
    errors: {},
    showPassword: false,
    avatarPreview: null,
    success: false,
  });

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

  const handleRoleChange = (role) => {
    setFormData((prev) => ({
      ...prev,
      role,
    }));
    if (formState.errors.role) {
      setFormState((prev) => ({
        ...prev,
        errors: {
          ...prev.errors,
          role: "",
        },
      }));
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const error = validateAvatar(file);

    if (error) {
      setFormState((prev) => ({
        ...prev,
        errors: {
          ...prev.errors,
          avatar: error,
        },
      }));

      return;
    }

    // Simpan file ke formData
    setFormData((prev) => ({
      ...prev,
      avatar: file,
    }));

    // Buat preview
    const reader = new FileReader();

    reader.onload = () => {
      setFormState((prev) => ({
        ...prev,
        avatarPreview: reader.result,
        errors: {
          ...prev.errors,
          avatar: "",
        },
      }));
    };

    reader.readAsDataURL(file);
  };

  const validateForm = () => {
    const errors = {
      fullName: !formData.fullName ? "Enter full name" : "",
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
      role: !formData.role ? "Please select a role" : "",
      avatar: "",
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

  const handleSubmitChange = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setFormState((prev) => ({
      ...prev,
      loading: true,
      errors: {},
    }));

    try {
      // Sign up API integration
      // Upload avatar jika user memilih gambar
      let avatarUrl = "";

      // Upload image if present
      if (formData.avatar) {
        const imgUploadRes = await uploadImage(formData.avatar);
        avatarUrl = imgUploadRes.imageUrl || "";
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        avatar: avatarUrl,
      });

      const { token, role } = response.data;

      // Pastikan token tersedia
      if (!token) {
        throw new Error("Registration token not received");
      }

      // Simpan user dan token
      login(response.data, token);

      // Tampilkan status berhasil
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
      }, 2500);
    } catch (error) {
      console.error("Registration error:", error);

      setFormState((prev) => ({
        ...prev,
        loading: false,
        errors: {
          submit:
            error.response?.data?.message ||
            error.message ||
            "Registration failed. Please try again.",
        },
      }));
    }
  };

  if (formState.success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center"
        >
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2 text-gray-900">
            Account created!
          </h2>
          <p className="text-gray-600 mb-4">
            Welcome to Carigawe! Your account has been successfully created.
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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full"
      >
        <div className="text-center mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Create Account
          </h2>
          <p className="text-sm text-gray-600">
            Join thousands of job seekers and employers.
          </p>
        </div>

        <form onSubmit={handleSubmitChange} className="space-y-6">
          {/* Full Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute w-5 h-5 transform -translate-y-1/2 text-gray-400 top-1/2 left-3" />
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                  formState.errors.fullName
                    ? "border-red-500"
                    : "border-gray-300"
                } focus:ring-blue-500 focus:ring-2 focus:border-transparent transition-colors`}
              />
            </div>

            {formState.errors.fullName && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {formState.errors.fullName}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute w-5 h-5 transform -translate-y-1/2 text-gray-400 top-1/2 left-3" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                  formState.errors.email ? "border-red-500" : "border-gray-300"
                } focus:ring-blue-500 focus:ring-2 focus:border-transparent transition-colors`}
              />
            </div>

            {formState.errors.email && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <AlertCircle className="w-4 h-4  mr-1" />
                {formState.errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute w-5 h-5 transform -translate-y-1/2 text-gray-400 top-1/2 left-3" />
              <input
                type={formState.showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                  formState.errors.password
                    ? "border-red-500"
                    : "border-gray-300"
                } focus:ring-blue-500 focus:ring-2 focus:border-transparent transition-colors`}
              />
              <button
                type="button"
                onClick={() =>
                  setFormState((prev) => ({
                    ...prev,
                    showPassword: !prev.showPassword,
                  }))
                }
                className="absolute w-5 h-5 transform -translate-y-1/2 text-gray-400 top-1/2 right-3 hover:text-gray-400"
              >
                {formState.showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>

            {formState.errors.password && (
              <p className="text-red-500 text-sm mt-1 items-center">
                <AlertCircle className="w-4 h-4  mr-1" />
                {formState.errors.password}
              </p>
            )}
          </div>

          {/* Avatar */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Profile Picture (Optional)
            </label>
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full bg-gray-100 overflow-hidden flex items-center justify-center">
                {formState.avatarPreview ? (
                  <img
                    src={formState.avatarPreview}
                    alt="Avatar Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-8 h-8  text-gray-400" />
                )}
              </div>
              <div className="flex-1">
                <input
                  type="file"
                  id="avatar"
                  accept=".jpg,.jpeg,.png"
                  // atau bisa image/*
                  onChange={handleAvatarChange}
                  className="hidden"
                />
                <label
                  htmlFor="avatar"
                  className="cursor-pointer bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                >
                  <Upload className="w-4 h-4" />
                  <span className="">Upload Photo</span>
                </label>
                <p className="text-xs text-gray-500 mt-1">
                  JPG, JPEG, PNG up to 5MB
                </p>
              </div>
            </div>

            {formState.errors.avatar && (
              <p className="text-red-500 text-sm mt-1 items-center">
                <AlertCircle className="w-4 h-4  mr-1" />
                {formState.errors.avatar}
              </p>
            )}
          </div>

          {/* Role selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              I am a *
            </label>
            <div className="grid grid-cols-2 gap-4">
              {/* Jobseeker */}
              <button
                type="button"
                onClick={() => handleRoleChange("jobseeker")}
                className={`p-4 rounded-lg border-2 transition-all ${formData.role === "jobseeker" ? "border-blue-500 bg-blue-50 text-blur-700" : "border-gray-200 hover:border-gray-300"}`}
              >
                <UserCheck className="w-8 h-8 mx-auto mb-2" />
                <div className="font-medium">Jobseeker</div>
                <div className="text-xs text-gray-500">
                  Looking for opportunities
                </div>
              </button>

              {/* Employer */}
              <button
                type="button"
                onClick={() => handleRoleChange("employer")}
                className={`p-4 rounded-lg border-2 transition-all ${formData.role === "employer" ? "border-blue-500 bg-blue-50 text-blur-700" : "border-gray-200 hover:border-gray-300"}`}
              >
                <Building2 className="w-8 h-8 mx-auto mb-2" />
                <div className="font-medium">Employer</div>
                <div className="text-xs text-gray-500">Hiring talent</div>
              </button>
            </div>

            {formState.errors.role && (
              <p className="text-red-500 text-sm mt-2 flex items-center">
                <AlertCircle className="w-4 h-4  mr-1" />
                {formState.errors.role}
              </p>
            )}
          </div>

          {/* Submit Error */}
          {formState.errors.submit && (
            <div className="bg-red-50 border border-red-200 p-3 rounded-lg">
              <p className="text-red-700 text-sm flex items-center">
                <AlertCircle className="w-4 h-4 mr-2" />
                {formState.errors.submit}
              </p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={formState.loading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 flex items-center justify-center space-x-2 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {formState.loading ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                <span>Creating Account...</span>
              </>
            ) : (
              <span>Create Account</span>
            )}
          </button>

          {/* Login link */}
          <div className="text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Login here
              </Link>
            </p>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default SignUp;
