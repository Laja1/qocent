"use client";

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "@/components/ui/animated-modal";
import { GridItem } from "./glowing-cards";
import { imgLinks } from "@/assets/assetLink";

interface ReusableModalProps {
  triggerText: string;
  triggerIcon?: React.ReactNode;
  content: React.ReactNode;
  description: string;
  footer?: React.ReactNode;
  triggerClassName?: string;
}

export function ReusableModal({
  triggerText,
  triggerIcon,
  description,
  content,
  footer,
}: ReusableModalProps) {
  return (
    <Modal>
      <ModalTrigger>
        <div className="text-left">
          <GridItem
            icon={triggerIcon}
            title={triggerText}
            description={description}
          />
        </div>
      </ModalTrigger>

      <ModalBody>
        <ModalContent>
          <div className="flex flex-row">
            <div className="w-1/2 justify-center flex items-center">
              <img src={imgLinks.canva} />
            </div>
            <div className="w-1/2">
              <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8">
                Book a session
              </h4>

              <div className="py-10 flex flex-wrap gap-x-4 gap-y-6 items-start justify-start max-w-sm mx-auto">
                {content}
              </div>
            </div>
          </div>
        </ModalContent>

        {footer && <ModalFooter className="gap-4">{footer}</ModalFooter>}
      </ModalBody>
    </Modal>
  );
}
