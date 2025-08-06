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
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { Button } from "../button";
import { Textfield } from "../textfield";
import { useFormik } from "formik";

export const WorkspaceModal = NiceModal.create(() => {
  // Pass the modal ID to useModal
  const modal = useModal("WorkspaceModal");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted");
    modal.hide();
  };

  const formik = useFormik({
    initialValues: {
      workspaceName: "",
    },
    onSubmit: () => {
     
      modal.hide();
    },
    // validationSchema: loginFormValidationSchema,
  });
  return (
    <Dialog open={modal.visible} onOpenChange={() => modal.hide()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Workspace</DialogTitle>
          <DialogDescription>
            Add a new workspace to manage your cloud resources. Fill in the
            details below.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 pb-4">
            <Textfield
              label="Workspace Name"
              name="workspaceName"
              formik={formik}
              placeholder="Enter your workspace name"
              error={
                formik?.touched.workspaceName && formik?.errors.workspaceName
                  ? formik?.errors.workspaceName
                  : ""
              }
            />
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button
                type="button"
                label="Cancel"
                onClick={() => modal.hide()}
              />
            </DialogClose>
            <Button type="submit" label="Create Workspace" />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
});
