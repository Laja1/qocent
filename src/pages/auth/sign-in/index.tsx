import AuthLayout from "@/components/layouts/authLayout";
import { Button, Textfield } from "@/components/shared";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();
  return (
    <AuthLayout title="Sign In" subtitle="Enter your credentials to access your cloud resources">
      <div className="flex flex-col gap-3">
        <Textfield label="Email" placeholder="Enter your email" />
        <Textfield label="Password" placeholder="Enter your password" />
        <Button
          label="Sign In"
          className="w-full mt-3"
          onClick={() => navigate("/dashboard")}
        />
      </div>
    </AuthLayout>
  );
};

export default SignIn;
