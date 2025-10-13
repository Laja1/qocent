/* eslint-disable @typescript-eslint/no-explicit-any */
// workspace-modal.tsx
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { Button } from "../button";
import { Textfield } from "../textfield";
import { Check, Mail, ChevronDown, ChevronRight } from "lucide-react";
import { useFormik } from "formik";
import type { SiteData } from "@/models/response/siteResponse";
import { InviteToWorkspaceSchema } from "@/utilities/schema/workspaceSchema";
import { showCustomToast } from "../toast";
import { ErrorHandler } from "@/service/httpClient/errorHandler";
import {
  useGetIAMRolesQuery,
  useInviteToWorkspaceMutation,
} from "@/service/kotlin/authApi";
import type { invitationRequest } from "@/models/request/authRequest";
import { useEffect, useState } from "react";
import type { RootState } from "@/store";
import { useSelector } from "react-redux";
import { RiseLoader } from "react-spinners";

export const InviteToWorkspace = NiceModal.create(() => {
  const [inviteToWorkspace, { isLoading }] = useInviteToWorkspaceMutation();
  const { data: iamRoles, isLoading: rolesLoading } = useGetIAMRolesQuery();
  const [selectedPrivileges, setSelectedPrivileges] = useState<string[]>([]);
  const [expandedModules, setExpandedModules] = useState<string[]>([]);
  const modal = useModal("InviteToWorkspace");
  const values = modal.args as unknown as SiteData;
  const account = useSelector((state: RootState) => state.account);
  const handleSubmit = async (formValues: invitationRequest) => {
    try {
      const requestData = {
        ...formValues,
        privileges: selectedPrivileges,
      };

      const res = await inviteToWorkspace(requestData).unwrap();
      console.log(res, "creating");

      showCustomToast(res.responseMessage, {
        toastOptions: { type: "success", autoClose: 5000 },
      });
      modal.hide();
      formik.resetForm();
      setSelectedPrivileges([]);
    } catch (error: any) {
      console.error("Create Resource Error:", error);
      const message = ErrorHandler.extractMessage(error);
      showCustomToast(message, {
        toastOptions: { type: "error", autoClose: 5000 },
      });
    }
  };

  const formik = useFormik<invitationRequest>({
    initialValues: {
      siteCode: values.siteCode,
      inviteeEmail: "",
      inviterUserCode: account.accountUserCode || "",
      privileges: [],
    },
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validationSchema: InviteToWorkspaceSchema,
  });

  useEffect(() => {
    formik.validateForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleModule = (moduleName: string) => {
    setExpandedModules((prev) =>
      prev.includes(moduleName)
        ? prev.filter((name) => name !== moduleName)
        : [...prev, moduleName]
    );
  };

  const toggleAction = (moduleName: string, action: string) => {
    const privilegeKey = `${moduleName}|${action}`;
    setSelectedPrivileges((prev) =>
      prev.includes(privilegeKey)
        ? prev.filter((p) => p !== privilegeKey)
        : [...prev, privilegeKey]
    );
  };

  const toggleAllModuleActions = (moduleName: string, actions: string[]) => {
    const modulePrivileges = actions.map((action) => `${moduleName}|${action}`);
    const allSelected = modulePrivileges.every((p) =>
      selectedPrivileges.includes(p)
    );

    if (allSelected) {
      // Deselect all actions in this module
      setSelectedPrivileges((prev) =>
        prev.filter((p) => !p.startsWith(`${moduleName}|`))
      );
    } else {
      // Select all actions in this module
      setSelectedPrivileges((prev) => {
        const filtered = prev.filter((p) => !p.startsWith(`${moduleName}|`));
        return [...filtered, ...modulePrivileges];
      });
    }
  };

  const isModuleFullySelected = (moduleName: string, actions: string[]) => {
    return actions.every((action) =>
      selectedPrivileges.includes(`${moduleName}|${action}`)
    );
  };

  const isModulePartiallySelected = (moduleName: string) => {
    return selectedPrivileges.some((p) => p.startsWith(`${moduleName}|`));
  };

  console.log(formik.errors);
  console.log("Selected privileges:", selectedPrivileges);

  return (
    <Dialog open={modal.visible} onOpenChange={() => modal.hide()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Invite to Workspace</DialogTitle>
          <DialogDescription>
            Invite team member to {values.siteName}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={formik.handleSubmit}>
          <div className="grid gap-4 pb-4">
            <div className="w-full items-center gap-4">
              <Textfield
                label="Email Address"
                name="inviteeEmail"
                formik={formik}
                prefixIcon={<Mail size={16} />}
                placeholder="Enter email address"
                error={
                  formik?.touched.inviteeEmail && formik?.errors.inviteeEmail
                    ? formik?.errors.inviteeEmail
                    : ""
                }
              />
            </div>

            <div className="space-y-1.5">
              <p className="text-xs font-medium">
                Privileges ({selectedPrivileges.length} selected)
              </p>
              <ScrollArea className="h-64 rounded-md border">
                {rolesLoading ? (
                  <div className="p-4 text-center justify-center items-center flex text-sm text-muted-foreground">
                    <RiseLoader color="#171717" loading={true} size={80} />
                  </div>
                ) : !iamRoles?.data || iamRoles.data.length === 0 ? (
                  <div className="p-4 text-center text-sm text-muted-foreground">
                    No privileges available
                  </div>
                ) : (
                  <div className="p-2 space-y-1">
                    {iamRoles.data.map((role) => {
                      const isExpanded = expandedModules.includes(
                        role.moduleName
                      );
                      const isFullySelected = isModuleFullySelected(
                        role.moduleName,
                        role.availableActions
                      );
                      const isPartiallySelected = isModulePartiallySelected(
                        role.moduleName
                      );

                      return (
                        <div key={role.moduleName} className="space-y-1">
                          {/* Module Header */}
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => toggleModule(role.moduleName)}
                              className="flex items-center gap-1 px-2 py-1.5 hover:bg-muted rounded-sm transition-colors"
                            >
                              {isExpanded ? (
                                <ChevronDown className="h-3 w-3" />
                              ) : (
                                <ChevronRight className="h-3 w-3" />
                              )}
                              <span className="text-xs font-medium">
                                {role.moduleName}
                              </span>
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                toggleAllModuleActions(
                                  role.moduleName,
                                  role.availableActions
                                )
                              }
                              className={`ml-auto px-2 py-1 text-xs rounded-sm transition-colors ${
                                isFullySelected
                                  ? "bg-primary text-primary-foreground"
                                  : isPartiallySelected
                                  ? "bg-primary/50 text-primary-foreground"
                                  : "hover:bg-muted"
                              }`}
                            >
                              {isFullySelected ? (
                                <Check className="h-3 w-3" />
                              ) : (
                                "Select All"
                              )}
                            </button>
                          </div>

                          {/* Module Actions */}
                          {isExpanded && (
                            <div className="ml-6 space-y-1">
                              {role.availableActions.map((action) => {
                                const privilegeKey = `${role.moduleName}|${action}`;
                                const isSelected =
                                  selectedPrivileges.includes(privilegeKey);

                                return (
                                  <button
                                    key={privilegeKey}
                                    type="button"
                                    onClick={() =>
                                      toggleAction(role.moduleName, action)
                                    }
                                    className={`w-full flex items-center justify-between px-3 py-1.5 text-xs rounded-sm transition-colors ${
                                      isSelected
                                        ? "bg-primary text-primary-foreground"
                                        : "hover:bg-muted"
                                    }`}
                                  >
                                    <span>{action}</span>
                                    {isSelected && (
                                      <Check className="h-3 w-3" />
                                    )}
                                  </button>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </ScrollArea>
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button
                type="button"
                label="Cancel"
                onClick={() => modal.hide()}
              />
            </DialogClose>
            <Button
              type="submit"
              label="Invite To Workspace"
              disabled={
                !formik.isValid || isLoading || selectedPrivileges.length === 0
              }
            />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
});
