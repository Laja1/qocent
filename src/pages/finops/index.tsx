import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const DashboardFinops = () => {
  const navigate = useNavigate();

  return (
    <div className="h-full w-full flex flex-col items-center justify-center gap-4">
      <p className="text-center text-lg">
        Access FinOps from your active subscription.
      </p>
      <Button onClick={() => navigate("/subscription")}>
        Go to Subscriptions
      </Button>
    </div>
  );
};

export default DashboardFinops;
