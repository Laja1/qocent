import { Button } from "@/components/shared";
import { ModalConstant } from "@/components/shared/modal/register";
import { CardDescription, CardTitle } from "@/components/ui/card";
import NiceModal from "@ebay/nice-modal-react";
import { useGetMySubscriptionQuery } from "@/service/python/subscriptionApi";
import { Settings, Zap } from "lucide-react";

export const Subscription = () => {
  const { data: subscriptionData, isLoading } = useGetMySubscriptionQuery();
  const subscription = subscriptionData?.data?.[0];

  return (
    <div className="w-full mx-auto p-6">
      <div className="space-y-6">
        <div>
          <CardTitle className="text-sm font-semibold mb-2">Subscription</CardTitle>
          <CardDescription className="text-xs text-gray-600">
            Manage your subscription and billing
          </CardDescription>
        </div>

        {isLoading ? (
          <div className="text-sm text-gray-500">Loading...</div>
        ) : subscription ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xs bg-white shadow-xs">
              <div className="flex items-center space-x-4">
                <div className="h-10 w-10 bg-gray-50 rounded-lg flex items-center justify-center">
                  <Zap className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-gray-900">
                      {subscription.subscription_is_trial ? "Trial Subscription" : "Active Subscription"}
                    </p>
                    <span className={`text-xs px-2 py-0.5 rounded ${subscription.subscription_status === "ACTIVE" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                      {subscription.subscription_status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">
                    {subscription.subscription_billing_cycle} • Usage: {subscription.subscription_usage_count}
                  </p>
                </div>
              </div>
              <Button
                label="Manage"
                prefixIcon={<Settings className="h-4 w-4" />}
                onClick={() => NiceModal.show(ModalConstant.ManageSubscriptionModal)}
                className="text-xs"
              />
            </div>

            {subscription.subscription_is_trial && subscription.subscription_trial_ends_at && (
              <div className="bg-blue-50 border border-blue-200 rounded-xs p-4">
                <p className="text-sm text-blue-900">
                  Your trial ends on {new Date(subscription.subscription_trial_ends_at).toLocaleDateString()}
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-8 border border-dashed border-gray-300 rounded-xs">
            <p className="text-sm text-gray-500 mb-4">No active subscription</p>
            <Button label="View Plans" onClick={() => window.location.href = "/subscription"} />
          </div>
        )}
      </div>
    </div>
  );
};
