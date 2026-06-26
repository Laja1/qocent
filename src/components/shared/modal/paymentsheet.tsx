import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "../button";
import { useFormik } from "formik";
import { Textfield } from "../textfield";
import { DatePickerWithFormik } from "../date-picker";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { X } from "lucide-react";
import {
  subscriptionApi,
  useLazyCheckPaymentStatusQuery,
} from "@/service/subscriptionApi";
import { useDispatch } from "react-redux";
import { ApiEnums } from "@/utilities/enums";
import { showCustomToast } from "../toast";

export const AddPaymentMethodSheet = NiceModal.create(({ paymentData }: any) => {
  const modal = useModal();
  const dispatch = useDispatch();
  const [checkPaymentStatus, { isFetching }] = useLazyCheckPaymentStatusQuery();

  const invalidateSubscriptionState = () => {
    dispatch(
      subscriptionApi.util.invalidateTags([
        { type: ApiEnums.Subscription, id: "PLANS" },
        { type: ApiEnums.Subscription, id: "LIST" },
        { type: ApiEnums.Subscription, id: "TRIAL" },
        { type: ApiEnums.Subscription, id: "PAYMENT" },
      ])
    );
  };

  const handleConfirmPayment = async () => {
    if (!paymentData?.payment_id) return;

    try {
      const result = await checkPaymentStatus(paymentData.payment_id).unwrap();

      if (result.active) {
        invalidateSubscriptionState();
        showCustomToast(result.message || "Payment confirmed. Your subscription is now active.", {
          toastOptions: { type: "success", autoClose: 5000 },
        });
        modal.hide();
        return;
      }

      showCustomToast(
        result.message || "Payment not confirmed yet. Please try again shortly.",
        { toastOptions: { type: "warning", autoClose: 5000 } }
      );
    } catch {
      showCustomToast("Unable to verify payment right now. Please try again.", {
        toastOptions: { type: "error", autoClose: 5000 },
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };
  const formik = useFormik({
    initialValues: {
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      cardholderName: "",
    },
    onSubmit: () => {},
  });

  if (paymentData) {
    return (
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={() => modal.remove()}
      >
        <div
          className="bg-black border border-slate-800 rounded-2xl max-w-2xl w-full p-8 relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => modal.remove()}
            className="absolute top-4 right-4 text-slate-400 hover:text-white z-50 p-1 bg-transparent border-none cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
          <h2 className="text-2xl font-bold text-white mb-2">Payment Details</h2>
          <p className="text-slate-400 mb-8">
            Complete your payment to activate subscription
          </p>
          <div className="space-y-6 text-sm">
            <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-6 space-y-4">
              <div className="flex justify-between">
                <span className="text-slate-400">Bank Name</span>
                <span className="text-white font-semibold">
                  {paymentData.bank_name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Account Number</span>
                <span className="text-white font-mono">
                  {paymentData.account_number}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Account Name</span>
                <span className="text-white">{paymentData.account_name}</span>
              </div>
              <div className="flex justify-between pt-4 border-t border-slate-800">
                <span className="text-slate-400">Amount</span>
                <span className="text-2xl font-bold text-cyan-400">
                  {paymentData.currency} {paymentData.amount}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Reference</span>
                <span className="text-white font-mono text-sm">
                  {paymentData.payment_reference}
                </span>
              </div>
              <div className="flex justify-between text-red-400">
                <span>Valid Until</span>
                <span>
                  {new Date(paymentData.valid_until).toLocaleString()}
                </span>
              </div>
            </div>
            <p className="text-slate-400 text-xs">
              {paymentData.payment_instructions}
            </p>
            <Button
              onClick={handleConfirmPayment}
              intent={"secondary"}
              disabled={isFetching}
              className="w-full text-white font-semibold py-3 rounded-lg transition-colors"
              label={isFetching ? "Verifying..." : "I've Made the Payment"}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <Sheet
      open={modal.visible}
      onOpenChange={(open) => {
        if (!open) modal.hide();
      }}
    >
      <SheetContent className="w-[400px] sm:w-[540px] p-4">
        <SheetHeader>
          <SheetTitle>Add Payment Method</SheetTitle>
          <SheetDescription>
            Add a new credit or debit card to your account for billing purposes.
          </SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit} className="space-y-6 ">
          <div className="space-y-2">
            <Textfield
              label="Cardholder Name"
              name="cardholderName"
              formik={formik}
              placeholder="John Doe"
            />
            <Textfield
              label="Card Number"
              name="cardNumber"
              formik={formik}
              placeholder="1234 5678 9012 3456"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <DatePickerWithFormik
              label="Expiry Date"
              name="expiryDate"
              formik={formik}
            />
            <Textfield label="CVV" name="cvv" formik={formik} placeholder="123" />
          </div>

          <div className="flex items-center space-x-2">
            <input type="checkbox" id="setDefault" className="rounded" />
            <p className="text-sm">Set as default payment method</p>
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <Button label="Cancel" type="button" intent="secondary" />

            <Button
              type="submit"
              label=" Add Payment Method"
              className="bg-black hover:bg-gray-800 text-white rounded-xs"
            />
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
});
