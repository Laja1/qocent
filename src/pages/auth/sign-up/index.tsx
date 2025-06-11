import AuthLayout from "@/components/layouts/authLayout";
import { Button } from "@/components/shared";
import { Textfield } from "@/components/shared/textfield";

const SignUp = () => {
  return (
    <AuthLayout title="Sign Up" subtitle="Sign up to your account">
      <Textfield label="Email" placeholder="Enter your email" />
      <Textfield label="Password" placeholder="Enter your password" />
      <Textfield label="Confirm Password" placeholder="Enter your password" />
      <Button label="Sign Up" className="w-full mt-3" />
    </AuthLayout>
  );
};
export default SignUp;
