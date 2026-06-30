import { Button, Header, FormPageCard, PageContent } from "@/components/shared";
import { useUpdateProfessionalServiceMutation } from "@/service/authApi";
import { useState } from "react";
import { serviceTypes } from "../professional-services";
import { CheckCircle2 } from "lucide-react";
import { showCustomToast } from "@/components/shared/toast";
import { ErrorHandler } from "@/service/httpClient/errorHandler";
import { useNavigate } from "react-router-dom";
import { RouteConstant } from "@/router/routes";
import { useBusinessStore } from "@/store/businessStore";

export const CreateProfessionalService = () => {
  const [updateProfessionalService, { isLoading }] =
    useUpdateProfessionalServiceMutation();
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
    if (selectedServices.length === 0) return;

    try {
      const newServices = selectedServices.map((serviceType) => ({
        serviceBookingDate: new Date().toISOString(),
        serviceType,
      }));

      const existingServices =
        business?.services?.map((service) => ({
          serviceBookingDate: service.bookingDate,
          serviceType: service.serviceName,
        })) || [];

      // Combine existing and new services
      const finalPayload = [...existingServices, ...newServices];

      const response = await updateProfessionalService(finalPayload).unwrap();

      showCustomToast(response.responseMessage, {
        toastOptions: { type: "success", autoClose: 5000 },
      });

      setSelectedServices([]);
      navigate(RouteConstant.dashboard.professionalServices.path);
    } catch (error) {
      showCustomToast(ErrorHandler.extractMessage(error), {
        toastOptions: { type: "error", autoClose: 5000 },
      });
    }
  };

  // Filter out services that user already enrolled in
  const availableServices = serviceTypes.filter(
    (s) => !enrolledServices.includes(s.value)
  );

  return (
    <div>
      <Header
        title="Apply for Professional Service"
        description="Select services to add to your account"
      />

      <PageContent>
        <FormPageCard
          className="max-w-4xl"
          title="Select Services"
          subtitle="Choose the professional services you want to add to your account."
          footer={
            availableServices.length > 0 ? (
              <Button
                label="Submit"
                disabled={selectedServices.length === 0 || isLoading}
                onClick={handleSubmit}
                isLoading={isLoading}
              />
            ) : undefined
          }
        >
          {availableServices.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              You have already enrolled in all available services.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
              {availableServices.map((s) => (
                <button
                  key={s.value}
                  type="button"
                  onClick={() => toggleService(s.value)}
                  className={`rounded-lg border p-4 text-left transition-colors ${
                    selectedServices.includes(s.value)
                      ? "border-primary/30 bg-primary/5"
                      : "border-border hover:border-border hover:bg-muted/40"
                  }`}
                >
                  <div className="mb-2 flex items-start justify-between">
                    <div
                      className={
                        selectedServices.includes(s.value)
                          ? "text-primary"
                          : "text-muted-foreground"
                      }
                    >
                      {s.triggerIcon}
                    </div>
                    {selectedServices.includes(s.value) && (
                      <CheckCircle2 className="size-5 text-primary" />
                    )}
                  </div>
                  <h4 className="mb-1 text-sm font-semibold">{s.label}</h4>
                  <p className="text-xs text-muted-foreground">{s.description}</p>
                </button>
              ))}
            </div>
          )}
        </FormPageCard>
      </PageContent>
    </div>
  );
};
