import { Button } from "@/components/shared";
import { ModalConstant } from "@/components/shared/modal/register";
import { CardDescription, CardTitle } from "@/components/ui/card";
import NiceModal from "@ebay/nice-modal-react";
import { useGetMySubscriptionQuery } from "@/service/python/subscriptionApi";
import { ArrowUpRight, Settings, Zap } from "lucide-react";

export const Subscription = () => {
  const { data: subscriptionData, isLoading } = useGetMySubscriptionQuery();
  const subscription = subscriptionData?.data?.[0];

  return (
    <div className="w-full mx-auto p-2">
      <div className="space-y-5">
        <div>
          <CardTitle className="text-base font-semibold mb-1">Subscription</CardTitle>
          <CardDescription className="text-xs text-muted-foreground">
            Manage your subscription and billing
          </CardDescription>
        </div>

        {isLoading ? (
          <div className="text-sm text-muted-foreground">Loading...</div>
        ) : subscription ? (
          <div className="border border-border rounded-xl overflow-hidden bg-background">
            <div className="px-4 py-3 border-b border-border">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Current Plan
              </p>
            </div>

            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <div className="flex items-center gap-3 min-w-0">
                <div className="h-8 w-8 bg-muted rounded-md flex items-center justify-center">
                  <Zap className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {subscription.subscription_is_trial
                      ? "Trial Subscription"
                      : "Active Subscription"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {subscription.subscription_billing_cycle} • Usage:{" "}
                    {subscription.subscription_usage_count}
                  </p>
                </div>
              </div>

              <button
                onClick={() => NiceModal.show(ModalConstant.ManageSubscriptionModal)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs text-foreground hover:bg-muted transition-colors"
              >
                <Settings className="h-3.5 w-3.5" />
                Manage
              </button>
            </div>

            <div className="flex items-center justify-between px-4 py-3">
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                  Status
                </p>
                <p className="text-sm text-foreground">{subscription.subscription_status}</p>
              </div>

              <button
                onClick={() => (window.location.href = "/subscription")}
                className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs text-foreground hover:bg-muted transition-colors"
              >
                View plans
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </div>

            {subscription.subscription_is_trial &&
              subscription.subscription_trial_ends_at && (
              <div className="px-4 py-3 border-t border-border bg-muted/30">
                <p className="text-sm text-foreground">
                  Your trial ends on {new Date(subscription.subscription_trial_ends_at).toLocaleDateString()}
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-8 border border-dashed border-border rounded-xl">
            <p className="text-sm text-muted-foreground mb-4">No active subscription</p>
            <Button label="View Plans" onClick={() => window.location.href = "/subscription"} />
          </div>
        )}
      </div>
    </div>
  );
};
