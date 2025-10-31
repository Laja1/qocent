/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { Button } from "@/components/shared";

import { imgLinks } from "@/assets/assetLink";

import { RouteConstant } from "@/router/routes";

type ServiceModalProps = {
  content: React.ReactNode; // should be JSX or text
  title: string;
};

export const ServiceModal = NiceModal.create<ServiceModalProps>(
  ({ content, title }) => {
    const modal = useModal("ServiceModal");

    const handleSubmit = async () => {
      window.location.href = RouteConstant.auth.signup.path;
      modal.hide();
    };

    return (
      <Dialog
        open={modal.visible}
        onOpenChange={(open) => {
          if (!open) modal.hide();
        }}
      >
        <DialogContent className="sm:max-w-[800px] border border-black flex bg-black text-white">
          <div className="flex flex-row w-full">
            {/* Left image section */}
            <div className="w-1/2 flex items-center justify-center">
              <img
                src={imgLinks.canva}
                alt="Canva"
                className="max-w-full h-auto"
              />
            </div>

            {/* Right content section */}
            <div className="w-1/2 p-4 flex flex-col">
              <h4 className="text-lg md:text-2xl font-bold text-center mb-8">
                {title}
              </h4>

              <ScrollArea className="h-64 rounded-md">
                <div className="py-10 mx-5 flex flex-wrap gap-x-4 gap-y-6 items-start justify-start max-w-sm">
                  {content}
                </div>
              </ScrollArea>

              <DialogFooter className="mt-5">
                <Button
                  type="button"
                  label="Next"
                  onClick={() => handleSubmit()}
                />
              </DialogFooter>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }
);
