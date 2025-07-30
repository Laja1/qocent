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

export const AddPaymentMethodSheet = NiceModal.create(() => {
  const modal = useModal();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
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
            <Textfield
              label="CVV"
              name="cvv"
              formik={formik}
              placeholder="123"
            />
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
