import { Header } from "@/components/shared";
import { Calendar, CheckCircle2 } from "lucide-react";
import { useState } from "react";

const serviceTypes = [
  {
    value: "MIGRATION",
    label: "Migration",
    description: "Move your infrastructure seamlessly",
  },
  {
    value: "OPTIMIZATION",
    label: "Optimization",
    description: "Improve performance and efficiency",
  },
  {
    value: "MODERNIZATION",
    label: "Modernization",
    description: "Update and transform your systems",
  },
  {
    value: "MANAGED_SERVICE",
    label: "Managed Service",
    description: "Ongoing support and management",
  },
];

export const ProfessionalServices = () => {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };
  return (
    <div>
      <Header title="Professional Services" description="kk" />
      {serviceTypes.map((service) => (
        <button
          key={service.value}
          type="button"
          onClick={() => toggleService(service.value)}
          className={`p-4 rounded-lg border-2 transition-all text-left ${
            selectedServices.includes(service.value)
              ? "border-blue-600 bg-blue-50"
              : "border-gray-200 hover:border-gray-300"
          }`}
        >
          <div className="flex items-start justify-between mb-2">
            <Calendar
              className={`w-5 h-5 ${
                selectedServices.includes(service.value)
                  ? "text-blue-600"
                  : "text-gray-400"
              }`}
            />
            {selectedServices.includes(service.value) && (
              <CheckCircle2 className="w-5 h-5 text-blue-600" />
            )}
          </div>
          <h4 className="font-semibold text-sm mb-1">{service.label}</h4>
          <p className="text-xs text-gray-600">{service.description}</p>
        </button>
      ))}
    </div>
  );
};
