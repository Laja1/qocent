/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/shared";
import type { FormikProps } from "formik";

interface DeployModalProps {
  isOpen: boolean;
  onClose: () => void;
  formik: FormikProps<any>;
  isLoading: boolean;
  progress: number;
  onDeploy: () => void;
  json: any;
}

export const SiteDeployModal: React.FC<DeployModalProps> = ({
  isOpen,
  onClose,
  formik,
  isLoading,
  json,
  progress,
  onDeploy,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog
          static
          open={isOpen}
          onClose={onClose}
          className="relative z-50"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50"
          />

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <DialogPanel
              as={motion.div}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-xs rounded-lg bg-white p-6 shadow-xl"
            >
              <div className="flex flex-col gap-4">
                <div className="items-center flex flex-col w-full space-y-2">
                  <DialogTitle className="text-lg font-semibold border-b pb-2">
                    Ready to Deploy?
                  </DialogTitle>
                </div>

                <div className="text-right">
                  {json.map((item: any, index: any) => (
                    <div key={index} className="  my-2">
                      {" "}
                      <p className="text-sm font-brfirma-bold">
                        {item?.ParameterLabel}
                      </p>
                      <p className="text-xs ">
                        {formik.values[item?.ParameterName]}
                      </p>
                    </div>
                  ))}
                </div>

                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mb-4 p-4 bg-blue-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="animate-spin w-4 h-4 border-2 border-gray-800 border-t-transparent rounded-full"></div>
                      <span className="font-medium text-xs">
                        Deploying your application...
                      </span>
                    </div>
                    <Progress value={progress} className="w-full" />
                    <p className="text-[10px] text-gray-500 mt-1">
                      {progress}% complete
                    </p>
                  </motion.div>
                )}

                <div className="flex justify-end space-x-2">
                  <Button
                    label="Cancel"
                    intent="secondary"
                    onClick={onClose}
                    disabled={isLoading}
                    size="small"
                  />
                  <Button
                    label={isLoading ? "Deploying..." : "Deploy Now"}
                    isLoading={isLoading}
                    disabled={isLoading}
                    onClick={onDeploy}
                    size="small"
                  />
                </div>
              </div>
            </DialogPanel>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
};
