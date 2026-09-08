import {
  MapPin,
  DollarSignIcon,
  ArrowLeft,
  Briefcase,
  CheckCircle2,
  Building2,
  Clock,
  Users,
  DollarSign,
} from "lucide-react";
import { CATEGORIES, JOB_TYPES } from "../../utils/data.js";
import useAuth from "../../context/useAuth.js";

const JobPostingPreview = ({ formData, setIsPreview }) => {
  const { user } = useAuth();

  const categoryLabel =
    CATEGORIES.find((cat) => cat.value === formData.category)?.label ||
    formData.category;

  const jobTypeLabel =
    JOB_TYPES.find((job) => job.value === formData.jobType)?.label ||
    formData.jobType;

  return (
    <div className="min-h-screen bg-slate-50 py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* ================= HEADER ================= */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
              Review
            </p>

            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
              Job Preview
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Review your job posting before publishing.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsPreview(false)}
            className="group inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 transition-all duration-200"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span className="hidden sm:inline">Back to Edit</span>
          </button>
        </div>

        {/* ================= MAIN CARD ================= */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {/* ================= HERO ================= */}
          <div className="relative overflow-hidden px-5 sm:px-8 lg:px-10 pt-8 pb-8 border-b border-slate-100">
            {/* Decorative dot pattern */}
            <div
              className="absolute top-0 right-0 w-72 h-72 opacity-70 pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(circle, rgba(59,130,246,0.12) 1.5px, transparent 1.5px)",
                backgroundSize: "18px 18px",
                maskImage:
                  "linear-gradient(to bottom left, black 10%, transparent 75%)",
                WebkitMaskImage:
                  "linear-gradient(to bottom left, black 10%, transparent 75%)",
              }}
            />

            {/* Soft decorative glow */}
            <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-blue-100/50 blur-3xl pointer-events-none" />

            <div className="relative z-10">
              {/* Company + Logo */}
              <div className="flex items-start justify-between gap-6">
                <div className="flex-1 min-w-0">
                  {/* Company name */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-7 h-7 rounded-md bg-blue-600 flex items-center justify-center">
                      <Building2 className="w-4 h-4 text-white" />
                    </div>

                    <span className="text-sm font-medium text-slate-500">
                      {user?.name || "Company"}
                    </span>
                  </div>

                  {/* Job title */}
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 leading-tight">
                    {formData.jobTitle || "Job Title"}
                  </h1>

                  {/* Location */}
                  <div className="flex items-center gap-2 mt-4 text-slate-500">
                    <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0" />

                    <span className="text-sm font-medium">
                      {formData.location || "Location not specified"}
                    </span>
                  </div>
                </div>

                {/* Company Logo */}
                {user?.companyLogo ? (
                  <img
                    src={user.companyLogo}
                    alt="Company Logo"
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover border border-slate-200 shadow-sm flex-shrink-0"
                  />
                ) : (
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Building2 className="h-7 w-7 text-slate-400" />
                  </div>
                )}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-50 text-blue-700 border border-blue-100">
                  <Briefcase className="w-3.5 h-3.5" />
                  {categoryLabel}
                </span>

                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-violet-50 text-violet-700 border border-violet-100">
                  {jobTypeLabel}
                </span>

                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-50 text-slate-600 border border-slate-200">
                  <Clock className="w-3.5 h-3.5" />
                  Posted today
                </span>
              </div>
            </div>
          </div>

          {/* ================= CONTENT ================= */}
          <div className="px-5 sm:px-8 lg:px-10 py-8">
            {/* Salary */}
            <div className="relative overflow-hidden rounded-xl border border-emerald-100 bg-emerald-50/60 p-5 sm:p-6 mb-8">
              {/* Modern dot pattern */}
              <div
                className="absolute right-0 top-0 w-48 h-48 opacity-50 pointer-events-none"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, rgba(16,185,129,0.20) 1.5px, transparent 1.5px)",
                  backgroundSize: "16px 16px",
                  maskImage:
                    "radial-gradient(circle at top right, black 10%, transparent 70%)",
                  WebkitMaskImage:
                    "radial-gradient(circle at top right, black 10%, transparent 70%)",
                }}
              />

              <div className="relative z-10 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-emerald-600 flex items-center justify-center shadow-sm">
                    <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
                      Compensation
                    </p>

                    <p className="text-lg sm:text-xl font-bold text-slate-900 mt-1">
                      ${Number(formData.salaryMin).toLocaleString()}{" "}
                      <span className="text-slate-400 font-normal">–</span> $
                      {Number(formData.salaryMax).toLocaleString()}
                      <span className="text-sm font-normal text-slate-500 ml-2">
                        / year
                      </span>
                    </p>
                  </div>
                </div>

                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/70 border border-emerald-100 text-xs font-medium text-emerald-700">
                  <Users className="w-3.5 h-3.5" />
                  Competitive
                </div>
              </div>
            </div>

            {/* ================= DESCRIPTION ================= */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main content */}
              <div className="lg:col-span-2 space-y-8">
                <section>
                  <h3 className="text-lg font-bold text-slate-900 mb-3">
                    Job Description
                  </h3>

                  <div className="text-sm sm:text-base leading-7 text-slate-600 whitespace-pre-line">
                    {formData.description || "No job description provided."}
                  </div>
                </section>

                <section>
                  <h3 className="text-lg font-bold text-slate-900 mb-3">
                    Requirements
                  </h3>

                  <div className="text-sm sm:text-base leading-7 text-slate-600 whitespace-pre-line">
                    {formData.requirements || "No requirements provided."}
                  </div>
                </section>
              </div>

              {/* Sidebar */}
              <aside className="lg:border-l lg:border-slate-100 lg:pl-8">
                <h3 className="text-sm font-bold text-slate-900 mb-4">
                  Job Overview
                </h3>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                      <Briefcase className="w-4 h-4 text-blue-600" />
                    </div>

                    <div>
                      <p className="text-xs text-slate-400">Job Type</p>
                      <p className="text-sm font-medium text-slate-800 mt-0.5">
                        {jobTypeLabel}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-violet-50 flex items-center justify-center flex-shrink-0">
                      <Building2 className="w-4 h-4 text-violet-600" />
                    </div>

                    <div>
                      <p className="text-xs text-slate-400">Category</p>
                      <p className="text-sm font-medium text-slate-800 mt-0.5">
                        {categoryLabel}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-4 h-4 text-emerald-600" />
                    </div>

                    <div>
                      <p className="text-xs text-slate-400">Location</p>
                      <p className="text-sm font-medium text-slate-800 mt-0.5">
                        {formData.location || "Not specified"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Status */}
                <div className="mt-8 pt-6 border-t border-slate-100">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    Ready to publish
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>

        {/* Bottom note */}
        <p className="text-center text-xs text-slate-400 mt-5">
          This is how your job posting will appear to job seekers.
        </p>
      </div>
    </div>
  );
};

export default JobPostingPreview;
