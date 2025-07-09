import { createContext, useContext, useState, type ReactNode } from "react";
import {
  Dialog,
  DialogPanel,
} from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";

type ModalData = {
  id: string;
  content: ReactNode;
};

type ModalContextType = {
  openModal: (modal: ModalData) => void;
  closeModal: () => void;
  currentModalId: string | null;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = () => {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModal must be used within a ModalProvider");
  return ctx;
};

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modal, setModal] = useState<ModalData | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = (modalData: ModalData) => {
    setModal(modalData);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setTimeout(() => setModal(null), 300); 
  };

  return (
    <ModalContext.Provider
      value={{ openModal, closeModal, currentModalId: modal?.id || null }}
    >
      {children}

      <AnimatePresence>
        {isOpen && modal && (
          <Dialog
            static
            open={isOpen}
            onClose={closeModal}
            className="relative z-50"
          >
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50"
            />
            {/* Modal content */}
            <div className="fixed inset-0 flex items-center justify-center p-4">
            <DialogPanel
                as={motion.div}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="min-w-xs  rounded-sm bg-white p-3"
              >
  {modal.content}
</DialogPanel>

            </div>
          </Dialog>
        )}
      </AnimatePresence>
    </ModalContext.Provider>
  );
};
