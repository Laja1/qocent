import { Button, Header } from "@/components/shared";
import { useModal } from "@/components/shared/modal";
import { ArrowRight } from "lucide-react";
import { CreateNewSiteTable } from "./create-new-site-table";

export const CreateNewSite = () => {
  const { openModal, closeModal } = useModal();

  const handleProceed = () => {
    openModal({
      id: "deploy-confirm",
      content: (
        <div className="flex flex-col w-full gap-4">
          <div className="items-center flex flex-col w-full space-y-2">
            <h2 className="text-lg font-semibold border-b">Ready to Deploy?</h2>
          </div>
          <div className="text-sm text-gray-600 space-y-1">
            <p>
              {/* Add your deployment confirmation details here */}
            </p>
          </div>
          <Button
            label="Deploy"
            onClick={() => {
              closeModal();
            }}
          />
        </div>
      ),
    });
  };

  return (
    <div className="flex flex-col">
      <Header
        title="Create Server Site"
        description="A server can have one or more server houses. A server house is provided by a provider."
      />

      <div className="flex flex-col gap-5 mt-5 mx-2 sm:mx-5 lg:mx-10 bg-gray-100 shadow-t-md rounded-t-md">
        <div className="bg-gradient-to-r from-black to-green-800 rounded-t-md pl-3 sm:pl-5 py-6 sm:py-10">
          <p className="text-base sm:text-lg text-white">Create Server Site</p>
          <p className="text-xs text-gray-400 leading-tight">
            A server can have one or more server houses. A server house is
            provided by a provider.
          </p>
        </div>
        
        <div className="flex items-start justify-start w-full px-2 sm:px-4 lg:px-6">
  <div className="w-full max-w-4xl">
    <CreateNewSiteTable />
  </div>
</div>

        <div className="flex m-3 sm:m-5 justify-end">
          <Button
            label="Proceed"
            onClick={handleProceed}
            surfixIcon={<ArrowRight className="size-3" />}
          />
        </div>
      </div>
    </div>
  );
};