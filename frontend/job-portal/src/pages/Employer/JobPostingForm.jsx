import React from "react";
import DashboardLayout from "../../components/layout/DashboardLayout.jsx";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { API_PATHS } from "../../utils/apiPath.js";
import { CATEGORIES, JOB_TYPES } from "../../utils/data.js";
import axiosInstance from "../../utils/axiosInstance.js";
import toast from "react-hot-toast";
import {
  AlertCircle,
  MapPin,
  DollarSign,
  Briefcase,
  Users,
  Eye,
  Send,
  DollarSignIcon,
} from "lucide-react";
import InputField from "../../components/Input/InputField.jsx";
import SelectField from "../../components/Input/SelectField.jsx";
import TextareaField from "../../components/Input/TextareaField.jsx";
import JobPostingPreview from "../../components/Cards/JobPostingPreview.jsx";

const JobPostingForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const jobId = location.state?.jobId || null;

  const [formData, setFormData] = useState({
    jobTitle: "",
    location: "",
    category: "",
    jobType: "",
    salaryMin: "",
    salaryMax: "",
    description: "",
    requirements: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPreview, setIsPreview] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("=== SUBMIT START ===");

    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    const jobPayload = {
      title: formData.jobTitle,
      location: formData.location,
      category: formData.category,
      type: formData.jobType,
      salaryMin: formData.salaryMin,
      salaryMax: formData.salaryMax,
      description: formData.description,
      requirements: formData.requirements,
    };

    console.log("=== BEFORE API REQUEST ===");
    console.log("JOB PAYLOAD:", jobPayload);

    try {
      const response = jobId
        ? await axiosInstance.put(API_PATHS.JOBS.UPDATE_JOB(jobId), jobPayload)
        : await axiosInstance.post(API_PATHS.JOBS.POST_JOB, jobPayload);

      console.log("=== API RESPONSE ===");
      console.log(response);

      if (response.status === 200 || response.status === 201) {
        toast.success(
          jobId ? "Job updated successfully" : "Job posted successfully",
        );

        console.log("BEFORE NAVIGATE TO DASHBOARD");

        navigate("/employer-dashboard");

        console.log("AFTER NAVIGATE TO DASHBOARD");

        return;
      }

      console.error("Unexpected response:", response);
      toast.error("Something went wrong. Please try again.");
    } catch (error) {
      console.error("=== API ERROR ===");
      console.error("FULL ERROR:", error);
      console.error("STATUS:", error.response?.status);
      console.error("DATA:", error.response?.data);
      console.error("MESSAGE:", error.message);

      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to post or update job. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Form validation helper
  const validateForm = (formData) => {
    const errors = {};

    if (!formData.jobTitle.trim()) {
      errors.jobTitle = "Job title is required";
    }

    if (!formData.description.trim()) {
      errors.description = "Job description is required";
    }

    if (!formData.location.trim()) {
      errors.location = "Location is required";
    }

    if (!formData.requirements.trim()) {
      errors.requirements = "Job requirements are required";
    }

    if (!formData.category) {
      errors.category = "Please select a category";
    }

    if (!formData.jobType) {
      errors.jobType = "Please select a job type";
    }

    if (!formData.salaryMin || !formData.salaryMax) {
      errors.salary = "Please enter both min and max salary";
    } else if (parseInt(formData.salaryMin) >= parseInt(formData.salaryMax)) {
      errors.salary = "Maximum salary must be greater than minimum salary";
    }
    return errors;
  };

  const isFormValid = () => {
    const validationErrors = validateForm(formData);
    return Object.keys(validationErrors).length === 0;
  };

  // Preview
  if (isPreview) {
    return (
      <DashboardLayout activeMenu="post-job">
        <JobPostingPreview formData={formData} setIsPreview={setIsPreview} />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout activeMenu="post-job">
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50/20 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white shadow-md rounded-2xl p-6">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-xl bg-gradient-to-r from-gray-600 to-gray-600 bg-clip-text text-transparent font-bold">
                  Post a New Job
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Fill out the form below to create a new job posting.
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  type="button" // dalam <form> dan agar tidak menjalan handleSubmit()
                  onClick={() => setIsPreview(true)}
                  disabled={!isFormValid()}
                  className="group flex items-center space-x-2 px-6 py-3 text-sm font-medium text-gray-600 hover:text-white bg-white/50 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 border border-gray-300 hover:border-transparent rounded-xl transition-all duration-300  hover:shadow-gray-100 hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <Eye className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                  <span>Preview</span>
                </button>
              </div>
            </div>

            <div className="space-y-6">
              {/* Job Title */}
              <InputField
                label="Job Title"
                id="jobTitle"
                placeholder="Enter job title"
                value={formData.jobTitle}
                onChange={(e) => handleInputChange("jobTitle", e.target.value)}
                error={errors.jobTitle}
                required
                icon={Briefcase}
              />

              {/* Location */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-end sm:space-x-4 space-y-4 sm:space-y-0">
                  <div className="flex-1">
                    <InputField
                      label="Location"
                      id="location"
                      placeholder="Enter location"
                      value={formData.location}
                      onChange={(e) =>
                        handleInputChange("location", e.target.value)
                      }
                      error={errors.location}
                      icon={MapPin}
                    />
                  </div>
                </div>
              </div>

              {/* Category and Job Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <SelectField
                  label="Category"
                  id="category"
                  placeholder="Enter Category"
                  value={formData.category}
                  onChange={(e) =>
                    handleInputChange("category", e.target.value)
                  }
                  options={CATEGORIES}
                  error={errors.category}
                  required
                  icon={Users}
                />

                <SelectField
                  label="Job Type"
                  id="jobType"
                  placeholder="Enter Job Type"
                  value={formData.jobType}
                  onChange={(e) => handleInputChange("jobType", e.target.value)}
                  options={JOB_TYPES}
                  error={errors.jobType}
                  required
                  icon={Briefcase}
                />
              </div>

              {/* Description */}
              <TextareaField
                label="Job Description"
                id="description"
                placeholder="Enter job description"
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                error={errors.description}
                required
                helperText="Include key responsilibites, day to day tasks, and any other relevant details."
              />

              {/* Requirements */}
              <TextareaField
                label="Requirements"
                id="requirements"
                placeholder="Enter job requirements"
                value={formData.requirements}
                onChange={(e) =>
                  handleInputChange("requirements", e.target.value)
                }
                error={errors.requirements}
                required
                helperText="Include job requirements, responsibilities, and any other relevant details."
              />

              {/* Salary Range */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Salary Range <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none z-10">
                      <DollarSignIcon className="h-5 w-5 text-gray-400" />
                    </div>

                    <input
                      type="number"
                      value={formData.salaryMin}
                      onChange={(e) =>
                        handleInputChange("salaryMin", e.target.value)
                      }
                      placeholder="Min"
                      className="w-full pr-3 pl-10 py-2.5 border text-base transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 
                      focus:ring-opacity-20 focus:border-blue-500  border-gray-300 rounded-md "
                    />
                  </div>

                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none z-10">
                      <DollarSignIcon className="h-5 w-5 text-gray-400" />
                    </div>

                    <input
                      type="number"
                      value={formData.salaryMax}
                      onChange={(e) =>
                        handleInputChange("salaryMax", e.target.value)
                      }
                      placeholder="Max"
                      className="w-full pr-3 pl-10 py-2.5 border text-base transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 
                      focus:ring-opacity-20 focus:border-blue-500  border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                {errors.salary && (
                  <div className="flex items-center space-x-1 text-sm text-red-600">
                    <AlertCircle className="h-4 w-4" />
                    <span>{errors.salary}</span>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="button" // dalam <form> dan agar tidak menjalan handleSubmit()
                  onClick={handleSubmit}
                  disabled={isSubmitting || !isFormValid()}
                  className="w-full flex items-center justify-center px-4 py-3 border border-transparent font-medium text-base text-white  bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none  focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed outline-none transition-colors duration-200"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Publishing Job...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5 mr-2" />
                      Publish Job
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default JobPostingForm;
