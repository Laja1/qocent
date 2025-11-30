import { Button, Header } from "@/components/shared";
import { useUpdateProfessionalServiceMutation } from "@/service/python/authApi";
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

      <div className="flex flex-col mt-5 mx-2 sm:mx-5 lg:mx-10 bg-gray-100 dark:bg-black dark:border-gray-700 dark:border shadow-t-md rounded-t-md">
        <div className="bg-gradient-to-r from-black to-gray-800 dark:border-gray-700 dark:border-b rounded-t-md px-3 sm:px-5 py-5">
          <div className="text-base sm:text-lg text-white">Select Services</div>
        </div>

        <div className="p-6">
          {availableServices.length === 0 ? (
            <p className="text-gray-600 mb-6">
              You have already enrolled in all available services.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              {availableServices.map((s) => (
                <button
                  key={s.value}
                  type="button"
                  onClick={() => toggleService(s.value)}
                  className={`p-4 rounded-lg border-2 transition-all text-left ${
                    selectedServices.includes(s.value)
                      ? "border-red-400 bg-red-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div
                      className={
                        selectedServices.includes(s.value)
                          ? "text-red-600"
                          : "text-gray-400"
                      }
                    >
                      {s.triggerIcon}
                    </div>
                    {selectedServices.includes(s.value) && (
                      <CheckCircle2 className="w-5 h-5 text-red-600" />
                    )}
                  </div>
                  <h4 className="font-semibold text-sm mb-1">{s.label}</h4>
                  <p className="text-xs text-gray-600">{s.description}</p>
                </button>
              ))}
            </div>
          )}

          <div className="flex justify-end gap-4">
            <Button
              label="Clear Selection"
              intent="secondary"
              onClick={() => setSelectedServices([])}
              disabled={selectedServices.length === 0}
            />
            <Button
              label="Submit Application"
              intent="primary"
              onClick={handleSubmit}
              disabled={selectedServices.length === 0 || isLoading}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
