import { Header } from "@/components/shared";
import { ArrowRight, Check, Loader2,  } from "lucide-react";
import { useGetAllWithMySubscriptionsQuery, useStartTrialMutation, useCreatePaidSubscriptionMutation, useGetServiceAccessMutation } from "@/service/python/subscriptionApi";
import { showCustomToast } from "@/components/shared/toast";
import { ErrorHandler } from "@/service/httpClient/errorHandler";
import NiceModal from "@ebay/nice-modal-react";
import { ModalConstant } from "@/components/shared/modal/register";
import { motion } from "framer-motion";

const SubscriptionCards = () => {
  const finopsBaseUrl = import.meta.env.VITE_FINOPS_BASE_URL || "https://finops.qocent.com";
  const { data: plansData, isLoading } = useGetAllWithMySubscriptionsQuery();
  const [startTrial, { isLoading: isStartingTrialLoading }] = useStartTrialMutation();
  const [createPaidSubscription, { isLoading: isCreatePaidSubscriptionLoading }] = useCreatePaidSubscriptionMutation();
  const [triggerServiceAccess, { isLoading: isAccessLoading }] = useGetServiceAccessMutation();
  const upcomingPlans = [
    {
      name: "Site Reliability",
      description: "Proactive uptime monitoring, incident response automation, and reliability insights.",
      features: ["SLA/SLO tracking", "Incident timeline and postmortems", "Real-time service health dashboards"],
    },
    {
      name: "Operations",
      description: "Streamline cloud operations with runbooks, automation, and centralized visibility.",
      features: ["Operational runbook workflows", "Task automation and orchestration", "Cross-team operational reporting"],
    },
    {
      name: "Security",
      description: "Continuous cloud security posture management with threat detection and compliance checks.",
      features: ["Security risk insights", "Compliance baseline checks", "Threat and anomaly notifications"],
    },
  ];

  const handleStartTrial = async (planId: string) => {
    try {
      const res = await startTrial({ plan_id: planId }).unwrap();
      showCustomToast(res.message, { toastOptions: { type: "success", autoClose: 5000 } });
    } catch (error: any) {
      showCustomToast(error?.data?.message || "Failed to start trial", { toastOptions: { type: "error", autoClose: 5000 } });
    }
  };

  const handleSubscribe = async (planId: string) => {
    try {
      const result = await createPaidSubscription({ plan_id: planId, billing_cycle: "MONTHLY" }).unwrap();
      NiceModal.show(ModalConstant.PaymentSheet, { paymentData: result });
    } catch (error: any) {
      showCustomToast(ErrorHandler.extractMessage(error) || "Failed to create subscription", { toastOptions: { type: "error", autoClose: 5000 } });
    }
  };

  const handleAccessService = async (planName: string) => {
    try {
      const serviceName = planName.toLowerCase().replace(/\s+/g, "");
      const res = await triggerServiceAccess({ service_name: serviceName }).unwrap();
      const backendRedirectUrl = new URL(res.data.redirect_url);
      const token = backendRedirectUrl.searchParams.get("token");
      const redirectUrl = new URL("/", finopsBaseUrl);
      if (token) {
        redirectUrl.searchParams.set("token", token);
      }
      window.location.href = redirectUrl.toString();
    } catch (error: any) {
      showCustomToast(ErrorHandler.extractMessage(error) || "Failed to access service", { toastOptions: { type: "error", autoClose: 5000 } });
    }
  };

  if (isLoading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  return (
    <div className="min-h-screen">
      <Header title="Subscription Packages" description="Choose the plan that fits your needs" />

      <div className="relative max-w-6xl mx-auto px-6 pt-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {plansData?.data?.map((plan, idx) => {
            const isActive = plan.subscription_plan_is_active;
            const nairaToUsdRate = 1400;
            const usdEquivalentPrice = (Number(plan.subscription_plan_monthly_price) / nairaToUsdRate).toFixed(2);

            return (
              <motion.div
                key={plan.subscription_plan_id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 + idx * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="relative"
              >
                {/* Glow behind active card */}
                {isActive && (
                  <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-red-300/20 via-red-300/5 to-transparent blur-sm" />
                )}

                <div
                  className={`relative h-full rounded-2xl border p-7 flex flex-col transition-all duration-300 ${
                    isActive
                      ? "bg-[#0d0d12] border-red-300/25"
                      : "bg-white/[0.015] border-white/[0.06] hover:border-white/[0.12] hover:bg-white/[0.025]"
                  }`}
                >
                  {/* Active badge */}
                  {isActive && (
                    <div className="absolute -top-3 left-6">
                      <span className="inline-block px-3 py-[3px] bg-red-300 text-[#060609] text-[10px] font-bold uppercase tracking-[0.12em] rounded-full shadow-[0_0_12px_rgba(245,158,11,0.3)]">
                        Active Plan
                      </span>
                    </div>
                  )}

                  {/* Plan name & description */}
                  <div className="mb-6">
                    <h3 className="font-brfirma text-[17px] font-bold text-white mb-1.5 tracking-tight">
                      {plan.subscription_plan_name}
                    </h3>
                    <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">
                      {plan.subscription_plan_description}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="mb-6 pb-6 border-b border-white/[0.05]">
                    <div className="flex items-end gap-1.5">
                      <span className="font-strawford text-[2.5rem] font-bold text-white leading-none tracking-tight">
                        ${usdEquivalentPrice}
                        {/* {plan.subscription_plan_monthly_price} */}
                      </span>
                      <div className="flex flex-col mb-1">
                        <span className="text-gray-500 text-xs font-medium">
                          USD
                          {/* {plan.subscription_plan_currency} */}
                        </span>
                        <span className="text-gray-600 text-[10px]">per month</span>
                      </div>
                    </div>
                  </div>

                  {/* Features */}
                  {plan.subscription_plan_features && (
                    <ul className="space-y-3 mb-8 flex-1">
                      {Object.entries(plan.subscription_plan_features).map(([key, value]) => (
                        <li key={key} className="flex items-start gap-2.5">
                          <span
                            className={`mt-0.5 flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center ${
                              isActive
                                ? "bg-red-300/15 text-red-300"
                                : "bg-white/[0.06] text-gray-500"
                            }`}
                          >
                            <Check className="w-2.5 h-2.5" strokeWidth={3} />
                          </span>
                          <span className="text-gray-400 text-[13px] leading-relaxed">{value}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* CTAs */}
                  <div className="mt-auto flex flex-col gap-2.5">
                    {isActive ? (
                      <button
                        disabled={isAccessLoading}
                        onClick={() => handleAccessService(plan.subscription_plan_name)}
                        className="group w-full py-2.5 px-4 bg-red-300 hover:bg-red-300 active:bg-red-300 text-[#060609] text-sm font-bold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {isAccessLoading ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            Redirecting...
                          </>
                        ) : (
                          <>
                            Open {plan.subscription_plan_name}
                            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                          </>
                        )}
                      </button>
                    ) : (
                      <>
                        <button
                          disabled={isStartingTrialLoading}
                          onClick={() => handleStartTrial(plan.subscription_plan_id)}
                          className="w-full py-2.5 px-4 border border-white/10 hover:border-white/20 hover:bg-white/[0.04] text-white text-sm font-semibold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isStartingTrialLoading ? "Starting..." : "Start Free Trial"}
                        </button>
                        <button
                          disabled={isCreatePaidSubscriptionLoading}
                          onClick={() => handleSubscribe(plan.subscription_plan_id)}
                          className="w-full py-2.5 px-4 bg-white/[0.05] hover:bg-white/[0.08] text-gray-400 hover:text-gray-200 text-sm font-medium rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isCreatePaidSubscriptionLoading ? "Processing..." : "Subscribe Now"}
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}

          {upcomingPlans.map((plan, idx) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + (plansData?.data?.length || 0) * 0.1 + idx * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative"
            >
              <div className="relative h-full rounded-2xl border p-7 flex flex-col transition-all duration-300 bg-[#0d0d12] border-white/[0.08] hover:border-white/[0.15]">
                <div className="mb-6">
                  <h3 className="font-brfirma text-[17px] font-bold text-white mb-1.5 tracking-tight">
                    {plan.name}
                  </h3>
                  <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">
                    {plan.description}
                  </p>
                </div>

                <div className="mb-6 pb-6 border-b border-white/[0.05]">
                  <div className="flex items-end gap-1.5">
                    <span className="font-strawford text-[2.5rem] font-bold text-white leading-none tracking-tight">
                      --
                    </span>
                    <div className="flex flex-col mb-1">
                      <span className="text-gray-500 text-xs font-medium">Coming Soon</span>
                    </div>
                  </div>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <span className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center bg-white/[0.06] text-gray-500">
                        <Check className="w-2.5 h-2.5" strokeWidth={3} />
                      </span>
                      <span className="text-gray-400 text-[13px] leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto">
                  <button
                    disabled
                    className="w-full py-2.5 px-4 bg-white/[0.04] text-gray-500 text-sm font-medium rounded-xl cursor-not-allowed"
                  >
                    Coming Soon
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionCards;
