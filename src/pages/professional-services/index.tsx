/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Header } from "@/components/shared";
import { RouteConstant } from "@/router/routes";
import {
  Box,
  CheckCheck,
  Clock,
  Cloud,
  Plus,
  RefreshCcw,
  Settings,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const serviceTypes = [
  {
    value: "MIGRATION",
    label: "Migration",
    description: "Move your infrastructure seamlessly",
    triggerIcon: <Cloud className="w-5 h-5" />,
  },
  {
    value: "OPTIMIZATION",
    label: "Optimization",
    description: "Improve performance and efficiency",
    triggerIcon: <Settings className="w-5 h-5" />,
  },
  {
    value: "MODERNIZATION",
    label: "Modernization",
    triggerIcon: <RefreshCcw className="w-5 h-5" />,
    description: "Update and transform your systems",
  },
  {
    value: "MANAGED_SERVICE",
    label: "Managed Service",
    triggerIcon: <Box className="w-5 h-5" />,
    description: "Ongoing support and management",
  },
];

type ServiceStatus = "APPLIED" | "IN_PROGRESS" | "COMPLETED";

interface EnrolledService {
  type: string;
  status: ServiceStatus;
  appliedDate: string;
}

const statusConfig = {
  APPLIED: {
    label: "Applied",
    color: "bg-blue-100 text-blue-700 border-blue-200",
    icon: <Clock className="w-4 h-4" />,
  },
  IN_PROGRESS: {
    label: "In Progress",
    color: "bg-amber-100 text-amber-700 border-amber-200",
    icon: <RefreshCcw className="w-4 h-4" />,
  },
  COMPLETED: {
    label: "Completed",
    color: "bg-green-100 text-green-700 border-green-200",
    icon: <CheckCheck className="w-4 h-4" />,
  },
};

export const ProfessionalServices = () => {
  // TODO: Replace with actual API call when it is provided
  const navigate = useNavigate();
  const [enrolledServices, setEnrolledServices] = useState<EnrolledService[]>([
    { type: "MIGRATION", status: "IN_PROGRESS", appliedDate: "2025-10-15" },
    { type: "OPTIMIZATION", status: "COMPLETED", appliedDate: "2025-09-20" },
  ]);

  const [isApplyingForNewService, setIsApplyingForNewService] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  const handleApplyForNewService = () => {
    setIsApplyingForNewService(true);
  };

  const handleSubmitNew = () => {
    // TODO: Call update endpoint with selectedServices
    console.log("Applying for services:", selectedServices);
    // Reset state after submission
    setIsApplyingForNewService(false);
    setSelectedServices([]);
  };

  const hasEnrollments = enrolledServices.length > 0;

  return (
    <div className="px-9 py-6">
      <Header
        title="Professional Services"
        description="Manage your service enrollments and apply for new services"
      />

      {hasEnrollments && !isApplyingForNewService && (
        <div className="space-y-6 mt-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold mb-4">Your Services</h3>

            <Button
              label="Apply for Another Service"
              onClick={() => {
                navigate(
                  RouteConstant.dashboard.createProfessionalService.path
                );
              }}
              prefixIcon={<Plus className="w-5 h-5" />}
              className="w-fit py-2 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {enrolledServices.map((enrollment) => (
              <EnrolledService enrollment={enrollment} key={enrollment.type} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

function EnrolledService({ enrollment }: { enrollment: EnrolledService }) {
  const service = serviceTypes.find((s) => s.value === enrollment.type);
  const status = statusConfig[enrollment.status];

  return (
    <div
      key={enrollment.type}
      className="p-4 rounded-lg border-2 border-gray-200"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3 flex-1">
          <div className="text-red-400 mt-1">{service?.triggerIcon}</div>
          <div className="flex-1">
            <h4 className="font-semibold text-sm mb-1">{service?.label}</h4>
            <p className="text-xs text-gray-600 mb-2">{service?.description}</p>
            <p className="text-xs text-gray-500">
              Applied: {new Date(enrollment.appliedDate).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium ${status.color}`}
        >
          {status.icon}
          {status.label}
        </div>
      </div>

      {/* Progress Tracker */}
      <div className="mt-4 pt-4 border-t border-gray-600">
        <div className="flex items-center justify-between mb-2">
          {["APPLIED", "IN_PROGRESS", "COMPLETED"].map((step, idx) => (
            <div
              key={step}
              className={`flex items-center ${idx === 2 ? "" : "flex-1"}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                  enrollment.status === step ||
                  step === "APPLIED" ||
                  (step === "IN_PROGRESS" && enrollment.status === "COMPLETED")
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {idx + 1}
              </div>
              {idx < 2 && (
                <div
                  className={`flex-1 h-1 mx-2 ${
                    enrollment.status === "COMPLETED" ||
                    (enrollment.status === "IN_PROGRESS" && step === "APPLIED")
                      ? "bg-blue-600"
                      : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-xs text-gray-600 mt-1">
          <span>Applied</span>
          <span>In Progress</span>
          <span>Completed</span>
        </div>
      </div>
    </div>
  );
}
