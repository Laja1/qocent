import { Button } from "@/components/shared";
import { ModalConstant } from "@/components/shared/modal/register";
import { Badge } from "@/components/ui/badge";
import {
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import NiceModal from "@ebay/nice-modal-react";
import { CreditCard, Edit, PlusIcon, Trash2 } from "lucide-react";

export const Payment = () => {
  const paymentMethods = [
    {
      id: "pm-001",
      type: "card",
      last4: "4242",
      brand: "Visa",
      expiryMonth: 12,
      expiryYear: 2026,
      isDefault: true,
    },
    {
      id: "pm-002",
      type: "card",
      last4: "5555",
      brand: "Mastercard",
      expiryMonth: 8,
      expiryYear: 2025,
      isDefault: false,
    },
  ];

  const handleDeletePaymentMethod = (methodId:string) => {
    console.log(methodId)
    // Implementation here
  };

  const handleSetDefaultPaymentMethod = (methodId:string) => {
    // Implementation here
    console.log(methodId)

  };

  return (
    <div className="w-full  mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Payment Methods Section */}
        <div className="space-y-6">
          <div>
            <CardTitle className="text-sm font-semibold mb-2">
              Payment Methods
            </CardTitle>
            <CardDescription className="text-xs text-gray-600">
              Manage your payment methods and billing preferences
            </CardDescription>
          </div>

          <div className="space-y-4">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-xs  bg-white shadow-xs hover:shadow-xs transition-shadow"
              >
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CreditCard className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <p className="text-sm font-medium text-gray-900">
                        {method.brand} ••••{method.last4}
                      </p>
                      {method.isDefault && (
                        <Badge
                          variant="outline"
                          className="bg-blue-50 text-blue-700 border-blue-200 text-xs px-2 py-0.5"
                        >
                          Default
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-gray-500">
                      Expires {method.expiryMonth.toString().padStart(2, '0')}/{method.expiryYear}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {!method.isDefault && (
                    <Button
                      intent="tertiary"
                      onClick={() => handleSetDefaultPaymentMethod(method.id)}
                      className="text-xs px-3 py-1.5 rounded-md"
                      surfixIcon={<Edit className="h-3 w-3" />}
                      label="Set Default"
                    />
                  )}
                  <Button
                    intent="tertiary"
                    onClick={() => handleDeletePaymentMethod(method.id)}
                    surfixIcon={<Trash2 className="h-3 w-3" />}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 text-xs px-3 py-1.5 rounded-md"
                    label="Delete"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              label="Add Payment Method"
              prefixIcon={<PlusIcon className="h-4 w-4" />}
              onClick={() => NiceModal.show(ModalConstant.PaymentSheet)}
              className="flex-1 sm:flex-none"
            />
            <Button
              label="Update Billing Address"
              intent="secondary"
              className="bg-transparent text-sm flex-1 sm:flex-none"
            />
          </div>
        </div>

        {/* Billing Address Section */}
        <div className="space-y-6">
          <div>
            <CardTitle className="text-sm font-semibold mb-2">
              Billing Address
            </CardTitle>
            <CardDescription className="text-xs text-gray-600">
              Update your billing address information
            </CardDescription>
          </div>

          <div className="bg-gray-50 rounded-xs p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-medium text-gray-900 mb-1">
                  Company Name
                </p>
                <p className="text-sm text-gray-600">Acme Corporation</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-900 mb-1">
                  Tax ID
                </p>
                <p className="text-sm text-gray-600">12-3456789</p>
              </div>
              
              <div className="sm:col-span-2">
                <p className="text-sm font-medium text-gray-900 mb-1">
                  Address
                </p>
                <p className="text-xs text-gray-600 leading-relaxed">
                  123 Business St<br />
                  Suite 100<br />
                  San Francisco, CA 94105<br />
                  United States
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};