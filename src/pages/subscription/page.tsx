import { Header } from "@/components/shared";
import { Sparkles, Zap } from "lucide-react";
import { useGetAllWithMySubscriptionsQuery, useStartTrialMutation, useCreatePaidSubscriptionMutation } from "@/service/python/subscriptionApi";
import { showCustomToast } from "@/components/shared/toast";
import { ErrorHandler } from "@/service/httpClient/errorHandler";
import NiceModal from "@ebay/nice-modal-react";
import { ModalConstant } from "@/components/shared/modal/register";
import { Button } from "@/components/ui/button";

const SubscriptionCards = () => {
  const { data: plansData, isLoading } = useGetAllWithMySubscriptionsQuery();
  const [startTrial, { isLoading: isStartingTrialLoading }] = useStartTrialMutation();
  const [createPaidSubscription, { isLoading: isCreatePaidSubscriptionLoading }] = useCreatePaidSubscriptionMutation();

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

  if (isLoading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
console.log(plansData, "plans data")
  return (
    <div className="min-h-screen">
      <Header title="Subscription Packages" description="Choose the plan that fits your needs" />

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plansData?.data?.map((plan, idx) => (
            <div key={plan.subscription_plan_id} className="relative group" style={{ animationDelay: `${idx * 100}ms` }}>
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-blue-500/20 to-purple-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100" />

              <div className="relative bg-black backdrop-blur-xl border border-slate-800 rounded-2xl p-8 h-full flex flex-col hover:border-cyan-500/50 transition-all duration-300">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">{plan.subscription_plan_name}</h3>
                    <p className="text-slate-400 text-xs leading-relaxed">{plan.subscription_plan_description}</p>
                  </div>
                  <Sparkles className="w-6 h-6 text-cyan-400" />
                </div>

                <div className="mb-8">
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold text-white">{plan.subscription_plan_monthly_price}</span>
                    <span className="text-slate-400 text-lg">{plan.subscription_plan_currency}</span>
                  </div>
                  <span className="text-slate-500 text-sm">per month</span>
                </div>

                {plan.subscription_plan_features && (
                  <ul className="space-y-3 mb-8 flex-1">
                    {Object.entries(plan.subscription_plan_features).map(([key, value]) => (
                      <li key={key} className="flex items-start gap-3 text-slate-300">
                        <Zap className="w-4 h-4 text-cyan-400 shrink-0 mt-1" />
                        <span className="text-sm leading-relaxed">{value}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="space-y-3 flex justify-between">
                  {plan.subscription_plan_is_active ? (
                    <>
                    <Button disabled className="w-full">Subscribed</Button>

                     </>
                  ) : (
                    <>
                    <Button disabled={isStartingTrialLoading} onClick={() => handleStartTrial(plan.subscription_plan_id)}>Start Free Trial</Button>
                    <Button variant="secondary" disabled={isCreatePaidSubscriptionLoading} onClick={() => handleSubscribe(plan.subscription_plan_id)}>Subscribe Now</Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionCards;
