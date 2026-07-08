import AuthLayout from "@/components/layouts/authLayout";
import { Button } from "@/components/shared";
import { RouteConstant } from "@/router/routes";
import { useNavigate } from "react-router-dom";

const CompleteBusiness = () => {
  const navigate = useNavigate();

  return (
    <AuthLayout
      title="Business setup complete"
      subtitle="Business accounts are fully registered during signup. Sign in to continue."
    >
      <Button
        label="Go to Sign In"
        className="w-full"
        onClick={() => navigate(RouteConstant.auth.signin.path)}
      />
    </AuthLayout>
  );
};

export default CompleteBusiness;
