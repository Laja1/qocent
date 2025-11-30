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
import { Check, ChevronDown, ChevronRight } from "lucide-react";
import { useFormik } from "formik";
import type { SiteData } from "@/models/response/siteResponse";
import { showCustomToast } from "../toast";
import { ErrorHandler } from "@/service/httpClient/errorHandler";
import {
  useGetIAMRolesQuery,
  useUpdateMemberMutation,
} from "@/service/python/authApi";
import type { updateMemberRequest } from "@/models/request/authRequest";
import { useEffect, useState } from "react";
import { RiseLoader } from "react-spinners";
import type { AccountMember } from "@/models/response/authResponse";
import { ModalConstant } from "./register";

type editAccessProps = {
  site: SiteData;
  member: AccountMember;
};
export const EditAccessModal = NiceModal.create<editAccessProps>(
  ({ site, member }) => {
    const { data: iamRoles, isLoading: rolesLoading } = useGetIAMRolesQuery();
    const [updateMember, { isLoading }] = useUpdateMemberMutation();
    const [selectedPrivileges, setSelectedPrivileges] = useState<string[]>(
      member.privileges
    );
    const [expandedModules, setExpandedModules] = useState<string[]>([]);
    const modal = useModal(ModalConstant.EditAccessModal);

    const handleSubmit = async (formValues: updateMemberRequest) => {
      try {
        const requestData = {
          ...formValues,
          userId: member.memberUserCode,
          privileges: selectedPrivileges,
          siteCode: site.siteCode,
        };

        const res = await updateMember(requestData).unwrap();

        showCustomToast(res.responseMessage, {
          toastOptions: { type: "success", autoClose: 5000 },
        });
        modal.hide();
        formik.resetForm();
      } catch (error: any) {
        console.error("Update Member Error:", error);
        const message = ErrorHandler.extractMessage(error);
        showCustomToast(message, {
          toastOptions: { type: "error", autoClose: 5000 },
        });
      }
    };

    const formik = useFormik({
      initialValues: {
        userId: member.memberUserCode,
        privileges: member.privileges || [],
        siteCode: site.siteCode,
      },
      onSubmit: handleSubmit,
      enableReinitialize: true,
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
      const modulePrivileges = actions.map(
        (action) => `${moduleName}|${action}`
      );
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

    return (
      <Dialog
        open={modal.visible}
        onOpenChange={() => {
          modal.hide();
          formik.resetForm();
          setSelectedPrivileges([]);
        }}
      >
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Access</DialogTitle>
            <DialogDescription>
              Edit privileges for {member.userFirstName} {member.userLastName}{" "}
              in {site.siteName}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={formik.handleSubmit}>
            <div className="grid gap-4 pb-4">
              <div className="space-y-1.5">
                <p className="text-xs font-medium">
                  Current Privileges ({selectedPrivileges.length} selected)
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
                label="Update Access"
                disabled={
                  !formik.isValid ||
                  isLoading ||
                  selectedPrivileges.length === 0
                }
              />
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    );
  }
);
