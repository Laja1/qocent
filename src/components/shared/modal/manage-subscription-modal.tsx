import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/shared";
import { create, useModal } from "@ebay/nice-modal-react";
import { ModalConstant } from "./register";
import { useGetMySubscriptionQuery, usePauseSubscriptionMutation, useResumeSubscriptionMutation, useCancelSubscriptionMutation, useConvertTrialToPaidMutation } from "@/service/python/subscriptionApi";
import { showCustomToast } from "@/components/shared/toast";
import { ErrorHandler } from "@/service/httpClient/errorHandler";
import { useState } from "react";
import { X, Zap, Pause, Play, XCircle, CreditCard, Clock, Activity } from "lucide-react";

export const ManageSubscriptionModal = create(() => {
  const modal = useModal(ModalConstant.ManageSubscriptionModal);
  const { data: subscriptionData, isLoading } = useGetMySubscriptionQuery();
  const [pauseSubscription] = usePauseSubscriptionMutation();
  const [resumeSubscription] = useResumeSubscriptionMutation();
  const [cancelSubscription] = useCancelSubscriptionMutation();
  const [convertTrial] = useConvertTrialToPaidMutation();
  const [paymentModal, setPaymentModal] = useState<{ open: boolean; data: any }>({ open: false, data: null });

  const subscription = subscriptionData?.data?.[0];

  const handlePause = async () => {
    if (!subscription) return;
    try {
      await pauseSubscription(subscription.subscription_id).unwrap();
      showCustomToast("Subscription paused", { toastOptions: { type: "success" } });
    } catch (error) {
      showCustomToast(ErrorHandler.extractMessage(error), { toastOptions: { type: "error" } });
    }
  };

  const handleResume = async () => {
    if (!subscription) return;
    try {
      await resumeSubscription(subscription.subscription_id).unwrap();
      showCustomToast("Subscription resumed", { toastOptions: { type: "success" } });
    } catch (error) {
      showCustomToast(ErrorHandler.extractMessage(error), { toastOptions: { type: "error" } });
    }
  };

  const handleCancel = async () => {
    if (!subscription) return;
    try {
      await cancelSubscription(subscription.subscription_id).unwrap();
      showCustomToast("Subscription cancelled", { toastOptions: { type: "success" } });
      modal.hide();
    } catch (error) {
      showCustomToast(ErrorHandler.extractMessage(error), { toastOptions: { type: "error" } });
    }
  };

  const handleConvertTrial = async () => {
    if (!subscription) return;
    try {
      const result = await convertTrial({ subscription_id: subscription.subscription_id }).unwrap();
      setPaymentModal({ open: true, data: result });
    } catch (error) {
      showCustomToast(ErrorHandler.extractMessage(error), { toastOptions: { type: "error" } });
    }
  };

  if (isLoading) return null;

  return (
    <>
      <Dialog open={modal.visible} onOpenChange={(open) => !open && modal.hide()}>
        <DialogContent className="max-w-2xl bg-gradient-to-br from-amber-50 via-white to-orange-50 border-amber-200/60 shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-brfirma-bold text-gray-900 tracking-tight">Subscription Control</DialogTitle>
          </DialogHeader>

          {subscription ? (
            <div className="space-y-5">
              <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-6 shadow-xl border border-amber-500/20">
                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl" />
                <div className="relative space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-white/10">
                    <span className="text-amber-200/70 text-sm font-strawford tracking-wide uppercase">Status</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide ${
                      subscription.subscription_status === "ACTIVE" 
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30" 
                        : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                    }`}>
                      {subscription.subscription_status}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-amber-400/70" />
                      <span className="text-gray-400 text-sm">Billing Cycle</span>
                    </div>
                    <span className="text-white font-medium">{subscription.subscription_billing_cycle}</span>
                  </div>
                  {subscription.subscription_is_trial && (
                    <div className="flex justify-between items-center bg-amber-500/10 -mx-6 px-6 py-3 border-y border-amber-500/20">
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-amber-400" />
                        <span className="text-amber-200 text-sm font-medium">Trial Ends</span>
                      </div>
                      <span className="text-amber-100 font-semibold">{subscription.subscription_trial_ends_at ? new Date(subscription.subscription_trial_ends_at).toLocaleDateString() : "N/A"}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-amber-400/70" />
                      <span className="text-gray-400 text-sm">Usage Count</span>
                    </div>
                    <span className="text-white font-mono text-lg font-bold">{subscription.subscription_usage_count}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2.5 flex-wrap pt-2">
                {subscription.subscription_is_trial && (
                  <Button 
                    label="Convert to Paid" 
                    onClick={handleConvertTrial} 
                    prefixIcon={<Zap className="w-4 h-4" />} 
                    className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white shadow-lg shadow-amber-500/25 border-none"
                  />
                )}
                {subscription.subscription_status === "ACTIVE" && (
                  <Button 
                    label="Pause" 
                    onClick={handlePause} 
                    intent="secondary" 
                    prefixIcon={<Pause className="w-4 h-4" />}
                    className="shadow-md"
                  />
                )}
                {subscription.subscription_status === "PAUSED" && (
                  <Button 
                    label="Resume" 
                    onClick={handleResume} 
                    prefixIcon={<Play className="w-4 h-4" />}
                    className="bg-emerald-700 hover:bg-emerald-800 text-white shadow-md"
                  />
                )}
                <Button 
                  label="Cancel" 
                  onClick={handleCancel} 
                  intent="tertiary" 
                  prefixIcon={<XCircle className="w-4 h-4" />}
                  className="text-red-600 hover:bg-red-50 border border-red-200 shadow-sm"
                />
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-100 mb-4">
                <CreditCard className="w-8 h-8 text-amber-600" />
              </div>
              <p className="text-gray-600 font-strawford">No active subscription found</p>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {paymentModal.open && (
        <div className="fixed inset-0 bg-gradient-to-br from-black/90 via-gray-900/95 to-black/90 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
          <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black border border-amber-500/30 rounded-3xl max-w-2xl w-full p-8 relative shadow-2xl shadow-amber-500/10 animate-in zoom-in-95 duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-orange-500/5 rounded-3xl" />
            <button 
              onClick={() => setPaymentModal({ open: false, data: null })} 
              className="absolute top-5 right-5 text-gray-400 hover:text-white transition-colors duration-200 hover:rotate-90 "
            >
              <X className="w-6 h-6" />
            </button>
            <div className="relative">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-amber-500/20 rounded-xl border border-amber-500/30">
                  <CreditCard className="w-6 h-6 text-amber-400" />
                </div>
                <h2 className="text-3xl font-brfirma-bold text-white tracking-tight">Payment Details</h2>
              </div>
              <p className="text-gray-400 mb-8 ml-14 font-strawford">Complete payment to activate your subscription</p>
              {paymentModal.data && (
                <div className="space-y-5">
                  <div className="bg-black/40 border border-white/10 rounded-2xl p-6 space-y-4 backdrop-blur-sm">
                    <div className="flex justify-between items-center pb-3 border-b border-white/10">
                      <span className="text-gray-400 text-sm font-strawford">Bank Name</span>
                      <span className="text-white font-semibold text-lg">{paymentModal.data.bank_name}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Account Number</span>
                      <span className="text-amber-200 font-mono text-lg tracking-wider">{paymentModal.data.account_number}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Account Name</span>
                      <span className="text-white font-medium">{paymentModal.data.account_name}</span>
                    </div>
                    <div className="flex justify-between items-center pt-4 border-t border-amber-500/20 bg-gradient-to-r from-amber-500/10 to-orange-500/10 -mx-6 px-6 py-4 mt-4">
                      <span className="text-amber-200 font-medium">Amount Due</span>
                      <span className="text-3xl font-bold text-amber-400 font-mono tracking-tight">{paymentModal.data.currency} {paymentModal.data.amount}</span>
                    </div>
                    <div className="flex justify-between items-center pt-3">
                      <span className="text-gray-400 text-sm">Reference</span>
                      <span className="text-gray-200 font-mono text-sm bg-white/5 px-3 py-1 rounded-lg">{paymentModal.data.payment_reference}</span>
                    </div>
                    <div className="flex justify-between items-center bg-red-500/10 -mx-6 px-6 py-3 border-y border-red-500/20">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-red-400" />
                        <span className="text-red-300 font-medium text-sm">Valid Until</span>
                      </div>
                      <span className="text-red-200 font-semibold">{new Date(paymentModal.data.valid_until).toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-4">
                    <p className="text-gray-300 text-sm leading-relaxed font-strawford">{paymentModal.data.payment_instructions}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
});
