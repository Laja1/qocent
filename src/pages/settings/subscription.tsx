import { Button } from "@/components/shared";
import { ModalConstant } from "@/components/shared/modal/register";
import { Badge } from "@/components/ui/badge";
import NiceModal from "@ebay/nice-modal-react";
import { useGetMySubscriptionQuery } from "@/service/python/subscriptionApi";
import {
  ArrowUpRight,
  Calendar,
  CreditCard,
  Loader2,
  Settings,
  Zap,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { RouteConstant } from "@/router/routes";

export const Subscription = () => {
  const navigate = useNavigate();
  const { data: subscriptionData, isLoading } = useGetMySubscriptionQuery();
  const subscription = subscriptionData?.data?.[0];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16 text-gray-500">
        <Loader2 className="size-5 animate-spin mr-2" />
        Loading subscription...
      </div>
    );
  }

  if (!subscription) {
    return (
      <div className="text-center py-12 rounded-xl border border-dashed border-gray-200 bg-gray-50/50">
        <div className="size-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
          <CreditCard className="size-5 text-gray-500" />
        </div>
        <h4 className="text-sm font-semibold text-gray-900">No active subscription</h4>
        <p className="text-xs text-gray-500 mt-1 mb-5 max-w-xs mx-auto">
          Subscribe to unlock FinOps and other platform services.
        </p>
        <Button
          label="View Plans"
          onClick={() => navigate(RouteConstant.dashboard.subscription.path)}
        />
      </div>
    );
  }

  const statusTone =
    subscription.subscription_status === "ACTIVE"
      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
      : subscription.subscription_status === "PAUSED"
        ? "bg-amber-50 text-amber-700 border-amber-200"
        : "bg-gray-50 text-gray-700 border-gray-200";

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-white/10 flex items-center justify-center">
              <Zap className="size-5 text-amber-400" />
            </div>
            <div>
              <p className="text-white font-semibold text-sm">
                {subscription.subscription_is_trial
                  ? "Trial Plan"
                  : "Paid Subscription"}
              </p>
              <p className="text-gray-400 text-xs">
                {subscription.subscription_billing_cycle} billing
              </p>
            </div>
          </div>
          <Badge variant="outline" className={`${statusTone} border`}>
            {subscription.subscription_status}
          </Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gray-100 bg-white">
          <div className="px-5 py-4">
            <p className="text-[11px] uppercase tracking-wider text-gray-400 font-medium">
              Usage
            </p>
            <p className="text-2xl font-bold text-gray-950 mt-1 font-strawford">
              {subscription.subscription_usage_count}
            </p>
          </div>
          <div className="px-5 py-4">
            <p className="text-[11px] uppercase tracking-wider text-gray-400 font-medium">
              Started
            </p>
            <p className="text-sm font-medium text-gray-900 mt-1 flex items-center gap-1">
              <Calendar className="size-3.5 text-gray-400" />
              {subscription.subscription_started_at
                ? new Date(subscription.subscription_started_at).toLocaleDateString()
                : "—"}
            </p>
          </div>
          <div className="px-5 py-4">
            <p className="text-[11px] uppercase tracking-wider text-gray-400 font-medium">
              {subscription.subscription_is_trial ? "Trial ends" : "Renews"}
            </p>
            <p className="text-sm font-medium text-gray-900 mt-1 flex items-center gap-1">
              <Calendar className="size-3.5 text-gray-400" />
              {subscription.subscription_is_trial &&
              subscription.subscription_trial_ends_at
                ? new Date(
                    subscription.subscription_trial_ends_at
                  ).toLocaleDateString()
                : subscription.subscription_ends_at
                  ? new Date(subscription.subscription_ends_at).toLocaleDateString()
                  : "—"}
            </p>
          </div>
        </div>

        {subscription.subscription_is_trial &&
          subscription.subscription_trial_ends_at && (
            <div className="px-5 py-3 bg-amber-50 border-t border-amber-100 text-sm text-amber-800">
              Your trial ends on{" "}
              <span className="font-semibold">
                {new Date(
                  subscription.subscription_trial_ends_at
                ).toLocaleDateString(undefined, {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
              . Convert to a paid plan to keep access.
            </div>
          )}
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => NiceModal.show(ModalConstant.ManageSubscriptionModal)}
          className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-50 transition-colors"
        >
          <Settings className="size-4" />
          Manage subscription
        </button>
        <button
          type="button"
          onClick={() => navigate(RouteConstant.dashboard.subscription.path)}
          className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-50 transition-colors"
        >
          View all plans
          <ArrowUpRight className="size-4" />
        </button>
      </div>
    </div>
  );
};
