import { Button, Header, FormPageCard, PageContent } from "@/components/shared";
import { showCustomToast } from "@/components/shared/toast";
import { useState } from "react";
import { serviceTypes } from "../professional-services";
import { CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { RouteConstant } from "@/router/routes";
import { useBusinessStore } from "@/store/businessStore";

export const CreateProfessionalService = () => {
  const { business } = useBusinessStore();
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const navigate = useNavigate();

  const enrolledServices =
    business?.services?.map((service) => service.serviceName) || [];

  const toggleService = (serviceValue: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceValue)
        ? prev.filter((s) => s !== serviceValue)
        : [...prev, serviceValue]
    );
  };

  const handleSubmit = async () => {
    if (selectedServices.length === 0) {
      showCustomToast("Select at least one service", {
        toastOptions: { type: "error", autoClose: 4000 },
      });
      return;
    }

    showCustomToast(
      "Professional services enrollment is not available via the platform API yet.",
      { toastOptions: { type: "info", autoClose: 5000 } }
    );
    navigate(RouteConstant.dashboard.professionalServices.path);
  };

  return (
    <div className="min-h-screen">
      <Header
        title="Apply for Professional Services"
        description="Select the services you'd like to enroll in."
      />

      <PageContent>
        <FormPageCard
          title="Available services"
          subtitle="Choose one or more services to apply for."
          footer={
            <Button
              label="Submit application"
              onClick={handleSubmit}
              disabled={selectedServices.length === 0}
            />
          }
        >
          <div className="grid gap-3 md:grid-cols-2">
            {serviceTypes.map((service) => {
              const isSelected = selectedServices.includes(service.value);
              const isEnrolled = enrolledServices.includes(service.value);

              return (
                <button
                  key={service.value}
                  type="button"
                  disabled={isEnrolled}
                  onClick={() => toggleService(service.value)}
                  className={`rounded-md border p-4 text-left transition ${
                    isSelected
                      ? "border-green-600 bg-green-50"
                      : "border-border bg-card hover:border-green-300"
                  } ${isEnrolled ? "opacity-60" : ""}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold">{service.label}</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {service.description}
                      </p>
                    </div>
                    {isEnrolled ? (
                      <CheckCircle2 className="size-4 text-green-600" />
                    ) : null}
                  </div>
                </button>
              );
            })}
          </div>
        </FormPageCard>
      </PageContent>
    </div>
  );
};
