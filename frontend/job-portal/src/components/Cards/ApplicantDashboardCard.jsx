import React from "react";
import { Clock } from "lucide-react";

const ApplicantDashboardCard = ({ applicant, position, time }) => {
  const applicantName = applicant?.name || "Unknown Applicant";

  const initials = applicantName
    .split(" ")
    .filter(Boolean)
    .map((name) => name[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="flex items-center justify-between gap-4 p-4 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors">
      {/* Applicant Info */}
      <div className="flex items-center space-x-4 min-w-0">
        <div className="h-10 w-10 flex-shrink-0 bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-xl flex items-center justify-center">
          <span className="text-white font-medium text-sm">{initials}</span>
        </div>

        <div className="min-w-0">
          <h4 className="text-[15px] font-medium text-gray-900 truncate">
            {applicantName}
          </h4>

          <p className="text-sm text-gray-500 truncate">
            {position || "No position"}
          </p>
        </div>
      </div>

      {/* Time */}
      <div className="flex items-center space-x-1 text-xs text-gray-500 flex-shrink-0">
        <Clock className="h-3 w-3" />
        <span>{time}</span>
      </div>
    </div>
  );
};

export default ApplicantDashboardCard;
