import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { create, useModal } from "@ebay/nice-modal-react";
import { AlertTriangle, Cloud, ShieldAlert } from "lucide-react";

import { ModalConstant } from "./register";
import { showCustomToast } from "../toast";
import { ErrorHandler } from "@/service/httpClient/errorHandler";
import { useCloseAccountMutation } from "@/service/python/accountsApi";
import type { Account } from "@/models/response/organizationResponse";

const ACKNOWLEDGMENTS = [
  "I understand closing this Qocent account will also close access to the linked cloud account.",
  "I understand cloud accounts on Qocent only exist through Qocent provisioning or invitation.",
  "I understand all team members will lose access to this site on both Qocent and the cloud provider.",
  "I understand this action cannot be easily undone and may affect deployed resources.",
] as const;

export const CloseAccountModal = create<Account>(() => {
  const modal = useModal(ModalConstant.CloseAccountModal);
  const account = modal.args as Account;

  const [step, setStep] = useState(0);
  const [checked, setChecked] = useState<boolean[]>(
    ACKNOWLEDGMENTS.map(() => false)
  );
  const [confirmName, setConfirmName] = useState("");

  const [closeAccount, { isLoading }] = useCloseAccountMutation();

  const isAdmin =
    account?.member_type === "Admin" || account?.member_type === "Owner";

  const allAcknowledged = checked.every(Boolean);
  const nameMatches =
    confirmName.trim().toLowerCase() ===
    (account?.account_name ?? "").trim().toLowerCase();

  const resetAndClose = () => {
    if (isLoading) return;
    setStep(0);
    setChecked(ACKNOWLEDGMENTS.map(() => false));
    setConfirmName("");
    modal.hide();
  };

  const handleCloseAccount = async () => {
    if (!account?.account_id || !nameMatches || isLoading) return;

    try {
      const res = await closeAccount(account.account_id).unwrap();
      showCustomToast(res.message || "Account closed successfully", {
        toastOptions: { type: "success", autoClose: 5000 },
      });
      resetAndClose();
    } catch (error) {
      showCustomToast(ErrorHandler.extractMessage(error), {
        toastOptions: { type: "error", autoClose: 5000 },
      });
    }
  };

  const toggleAck = (index: number, value: boolean) => {
    setChecked((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  if (!isAdmin) {
    return (
      <Dialog open={modal.visible} onOpenChange={(open) => !open && resetAndClose()}>
        <DialogContent className="sm:max-w-[440px]">
          <DialogHeader>
            <DialogTitle className="text-base flex items-center gap-2">
              <ShieldAlert className="size-4 text-amber-600" />
              Permission required
            </DialogTitle>
            <p className="text-sm text-muted-foreground mt-2">
              Only account admins can close a server site. Your role on{" "}
              <span className="font-medium text-foreground">
                {account?.account_name}
              </span>{" "}
              is {account?.member_type || "Member"}.
            </p>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={resetAndClose}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog
      open={modal.visible}
      onOpenChange={(open) => !isLoading && !open && resetAndClose()}
    >
      <DialogContent className="sm:max-w-[520px]">
        <DialogHeader>
          <DialogTitle className="text-base flex items-center gap-2 text-red-700">
            <AlertTriangle className="size-4" />
            Close server site account
          </DialogTitle>
          <p className="text-xs text-muted-foreground mt-1">
            Step {step + 1} of 3
          </p>
        </DialogHeader>

        {step === 0 && (
          <div className="space-y-4">
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950">
              <p className="font-medium mb-2">What happens when you close this account?</p>
              <ul className="space-y-2 text-xs leading-relaxed list-disc pl-4">
                <li>
                  <strong>Qocent account</strong> — access to this site is removed on
                  Qocent for you and all members.
                </li>
                <li>
                  <strong>Cloud account</strong> — the linked provider account ({account?.account_provider}) is
                  closed as well. Cloud access only exists through Qocent.
                </li>
                <li>
                  Closing is always initiated from the Qocent side and affects both
                  platforms together.
                </li>
              </ul>
            </div>

            <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-sm">
              <p className="text-gray-500 text-xs uppercase tracking-wide mb-1">
                Account to close
              </p>
              <p className="font-semibold text-gray-900">{account?.account_name}</p>
              <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                <Cloud className="size-3" />
                {account?.account_provider} • {account?.account_status}
              </p>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Please confirm you understand the consequences before continuing.
            </p>
            {ACKNOWLEDGMENTS.map((text, index) => (
              <label
                key={text}
                className="flex items-start gap-3 rounded-lg border border-gray-200 p-3 cursor-pointer hover:bg-gray-50"
              >
                <Checkbox
                  checked={checked[index]}
                  onCheckedChange={(value) => toggleAck(index, value === true)}
                  className="mt-0.5"
                />
                <span className="text-xs text-gray-700 leading-relaxed">{text}</span>
              </label>
            ))}
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-900">
              <p className="font-semibold">Final confirmation</p>
              <p className="text-xs mt-1 leading-relaxed">
                This will permanently close{" "}
                <span className="font-medium">{account?.account_name}</span> on
                Qocent and revoke cloud console access. Type the account name below
                to confirm.
              </p>
            </div>

            <div>
              <label
                htmlFor="confirm-account-name"
                className="text-xs font-medium text-gray-600"
              >
                Type <span className="font-mono text-gray-900">{account?.account_name}</span> to confirm
              </label>
              <Input
                id="confirm-account-name"
                value={confirmName}
                onChange={(e) => setConfirmName(e.target.value)}
                placeholder={account?.account_name}
                className="mt-2"
                autoComplete="off"
              />
            </div>
          </div>
        )}

        <DialogFooter className="gap-2 sm:gap-0">
          {step === 0 && (
            <>
              <Button variant="outline" onClick={resetAndClose}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={() => setStep(1)}>
                I understand, continue
              </Button>
            </>
          )}

          {step === 1 && (
            <>
              <Button variant="outline" onClick={() => setStep(0)}>
                Back
              </Button>
              <Button
                variant="destructive"
                disabled={!allAcknowledged}
                onClick={() => setStep(2)}
              >
                Continue
              </Button>
            </>
          )}

          {step === 2 && (
            <>
              <Button variant="outline" onClick={() => setStep(1)} disabled={isLoading}>
                Back
              </Button>
              <Button
                variant="destructive"
                disabled={!nameMatches || isLoading}
                onClick={handleCloseAccount}
              >
                {isLoading ? "Closing account..." : "Close account permanently"}
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
});
