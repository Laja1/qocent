import { Button } from "@/components/shared";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TermsAndConditionsContent } from "./terms-and-conditions-content";

type TermsAndConditionsModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const TermsAndConditionsModal = ({
  open,
  onOpenChange,
}: TermsAndConditionsModalProps) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="flex max-h-[90vh] flex-col gap-4 sm:max-w-2xl">
      <DialogHeader>
        <DialogTitle>Terms and Conditions</DialogTitle>
      </DialogHeader>

      <ScrollArea className="h-[60vh] rounded-md border border-black/10">
        <div className="p-4 pr-5">
          <TermsAndConditionsContent />
        </div>
      </ScrollArea>

      <DialogFooter>
        <Button
          type="button"
          label="Close"
          className="w-full sm:w-auto"
          onClick={() => onOpenChange(false)}
        />
      </DialogFooter>
    </DialogContent>
  </Dialog>
);
