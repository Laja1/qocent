import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { showCustomToast } from "@/components/shared/toast";
import { useGetServiceAccessMutation } from "@/service/contextApi";
import { ErrorHandler } from "@/service/httpClient/errorHandler";
import { buildServiceRedirectUrl } from "@/utilities/serviceAccess";

const DashboardFinops = () => {
  const [getServiceAccess, { isLoading }] = useGetServiceAccessMutation();
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handleOpenFinops = async () => {
    setIsRedirecting(true);
    try {
      const res = await getServiceAccess({ service_name: "finops" }).unwrap();
      window.location.href = buildServiceRedirectUrl(res.data.redirect_url);
    } catch (error) {
      showCustomToast(ErrorHandler.extractMessage(error), {
        toastOptions: { type: "error", autoClose: 5000 },
      });
      setIsRedirecting(false);
    }
  };

  const busy = isLoading || isRedirecting;

  return (
    <div className="h-full w-full flex flex-col items-center justify-center gap-4">
      <p className="text-center text-lg max-w-md">
        Open FinOps using your active context and subscription access.
      </p>
      <Button onClick={handleOpenFinops} disabled={busy}>
        {busy ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Redirecting...
          </>
        ) : (
          "Open FinOps"
        )}
      </Button>
    </div>
  );
};

export default DashboardFinops;
