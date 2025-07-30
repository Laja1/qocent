import { Textfield } from "@/components/shared";

export const Profile = () => {
  return (
    <div>
      <Textfield name="firstName" label="First Name" />
      <Textfield name="lastName" label="Last Name" />
    </div>
  );
};
