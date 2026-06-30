import { Header, PageContent } from "@/components/shared";
import {
  PageLoader,
  SubscriptionPlansSkeleton,
} from "@/components/shared/page-loader";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { useGetAllWithMySubscriptionsQuery } from "@/service/subscriptionApi";
import {
  useCreatePersonalPaidSubscriptionMutation,
  useStartPersonalTrialMutation,
} from "@/service/walletBillingApi";
import { useGetServiceAccessMutation } from "@/service/contextApi";
import { showCustomToast } from "@/components/shared/toast";
import { ErrorHandler } from "@/service/httpClient/errorHandler";
import { buildServiceRedirectUrl } from "@/utilities/serviceAccess";
import NiceModal from "@ebay/nice-modal-react";
import { ModalConstant } from "@/components/shared/modal/register";
import { cn } from "@/lib/utils";

const upcomingPlans = [
  {
    name: "Site Reliability",
    description:
      "Proactive uptime monitoring, incident response automation, and reliability insights.",
    features: [
      "SLA/SLO tracking",
      "Incident timeline and postmortems",
      "Real-time service health dashboards",
    ],
  },
  {
    name: "Operations",
    description:
      "Streamline cloud operations with runbooks, automation, and centralized visibility.",
    features: [
      "Operational runbook workflows",
      "Task automation and orchestration",
      "Cross-team operational reporting",
    ],
  },
  {
    name: "Security",
    description:
      "Continuous cloud security posture management with threat detection and compliance checks.",
    features: [
      "Security risk insights",
      "Compliance baseline checks",
      "Threat and anomaly notifications",
    ],
  },
];

const SubscriptionCards = () => {
  const { data: plansData, isLoading } = useGetAllWithMySubscriptionsQuery();
  const [startTrial, { isLoading: isStartingTrialLoading }] =
    useStartPersonalTrialMutation();
  const [createPaidSubscription, { isLoading: isCreatePaidSubscriptionLoading }] =
    useCreatePersonalPaidSubscriptionMutation();
  const [triggerServiceAccess, { isLoading: isAccessLoading }] =
    useGetServiceAccessMutation();

  const handleStartTrial = async (planId: string) => {
    try {
      await startTrial({ plan_id: planId }).unwrap();
      showCustomToast("Trial started successfully", {
        toastOptions: { type: "success", autoClose: 5000 },
      });
    } catch (error: unknown) {
      showCustomToast(ErrorHandler.extractMessage(error), {
        toastOptions: { type: "error", autoClose: 5000 },
      });
    }
  };

  const handleSubscribe = async (planId: string) => {
    try {
      const result = await createPaidSubscription({
        plan_id: planId,
        billing_cycle: "MONTHLY",
      }).unwrap();
      NiceModal.show(ModalConstant.PaymentSheet, { paymentData: result });
    } catch (error: unknown) {
      showCustomToast(
        ErrorHandler.extractMessage(error) || "Failed to create subscription",
        { toastOptions: { type: "error", autoClose: 5000 } }
      );
    }
  };

  const handleAccessService = async (planName: string) => {
    try {
      const serviceName = planName.toLowerCase().replace(/\s+/g, "");
      const res = await triggerServiceAccess({
        service_name: serviceName,
      }).unwrap();
      window.location.href = buildServiceRedirectUrl(res.data.redirect_url);
    } catch (error: unknown) {
      showCustomToast(
        ErrorHandler.extractMessage(error) || "Failed to access service",
        { toastOptions: { type: "error", autoClose: 5000 } }
      );
    }
  };

  return (
    <div className="min-h-screen">
      <Header
        title="Subscription Packages"
        description="Choose the plan that fits your needs"
      />

      <PageContent>
        {isLoading ? (
          <SubscriptionPlansSkeleton />
        ) : !plansData?.data?.length ? (
          <PageLoader label="No subscription plans available" />
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {plansData.data.map((plan) => {
              const isActive = plan.subscription_plan_is_active;

              return (
                <div
                  key={plan.subscription_plan_id}
                  className={cn(
                    "flex h-full flex-col rounded-lg border bg-card p-6",
                    isActive
                      ? "border-primary/25 bg-primary/[0.03]"
                      : "border-border"
                  )}
                >
                  {isActive && (
                    <span className="mb-4 inline-flex w-fit rounded-sm bg-primary/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary">
                      Active plan
                    </span>
                  )}

                  <div className="mb-5">
                    <h3 className="text-base font-semibold text-foreground">
                      {plan.subscription_plan_name}
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                      {plan.subscription_plan_description}
                    </p>
                  </div>

                  <div className="mb-5 border-b border-border pb-5">
                    <div className="flex items-end gap-1.5">
                      <span className="text-4xl font-semibold leading-none text-foreground">
                        $104
                      </span>
                      <div className="mb-1 text-xs text-muted-foreground">
                        <div>USD</div>
                        <div>per month</div>
                      </div>
                    </div>
                  </div>

                  {plan.subscription_plan_features && (
                    <ul className="mb-6 flex-1 space-y-2.5">
                      {Object.entries(plan.subscription_plan_features).map(
                        ([key, value]) => (
                          <li key={key} className="flex items-start gap-2.5">
                            <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
                              <Check className="size-2.5" strokeWidth={3} />
                            </span>
                            <span className="text-xs leading-relaxed text-foreground/80">
                              {value}
                            </span>
                          </li>
                        )
                      )}
                    </ul>
                  )}

                  <div className="mt-auto flex flex-col gap-2">
                    {isActive ? (
                      <button
                        type="button"
                        disabled={isAccessLoading}
                        onClick={() =>
                          handleAccessService(plan.subscription_plan_name)
                        }
                        className="flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {isAccessLoading ? (
                          <>
                            <Loader2 className="size-3.5 animate-spin" />
                            Redirecting...
                          </>
                        ) : (
                          <>
                            Open {plan.subscription_plan_name}
                            <ArrowRight className="size-3.5" />
                          </>
                        )}
                      </button>
                    ) : (
                      <>
                        <button
                          type="button"
                          disabled={isStartingTrialLoading}
                          onClick={() =>
                            handleStartTrial(plan.subscription_plan_id)
                          }
                          className="w-full rounded-md border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {isStartingTrialLoading
                            ? "Starting..."
                            : "Start free trial"}
                        </button>
                        <button
                          type="button"
                          disabled={isCreatePaidSubscriptionLoading}
                          onClick={() =>
                            handleSubscribe(plan.subscription_plan_id)
                          }
                          className="w-full rounded-md bg-foreground px-4 py-2.5 text-sm font-medium text-background transition-colors hover:bg-foreground/90 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {isCreatePaidSubscriptionLoading
                            ? "Processing..."
                            : "Subscribe now"}
                        </button>
                      </>
                    )}
                  </div>
                </div>
              );
            })}

            {upcomingPlans.map((plan) => (
              <div
                key={plan.name}
                className="flex h-full flex-col rounded-lg border border-border bg-muted/20 p-6"
              >
                <div className="mb-5">
                  <h3 className="text-base font-semibold text-foreground">
                    {plan.name}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {plan.description}
                  </p>
                </div>

                <div className="mb-5 border-b border-border pb-5">
                  <span className="text-sm font-medium text-muted-foreground">
                    Coming soon
                  </span>
                </div>

                <ul className="mb-6 flex-1 space-y-2.5">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
                        <Check className="size-2.5" strokeWidth={3} />
                      </span>
                      <span className="text-xs leading-relaxed text-foreground/80">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  disabled
                  className="mt-auto w-full cursor-not-allowed rounded-md border border-border bg-muted px-4 py-2.5 text-sm font-medium text-muted-foreground"
                >
                  Coming soon
                </button>
              </div>
            ))}
          </div>
        )}
      </PageContent>
    </div>
  );
};

export default SubscriptionCards;
