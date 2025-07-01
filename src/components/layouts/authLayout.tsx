
import { RouteConstant } from "@/router/routes";
import { Link, useLocation } from "react-router-dom";
type AuthLayoutProps = {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  mainContainerProps?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  >;
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

const AuthLayout = ({ children, title, subtitle }: AuthLayoutProps) => {
  const location = useLocation();
  const pathname = location.pathname;
console.log(pathname,'pathname')
  const renderFooterText = (pathname: string) => {
    switch (pathname) {
      case RouteConstant.auth.signin.path:
        return (
          <p className="text-center text-sm text-gray-700">
            Not registered yet?{" "}
            <Link to={RouteConstant.auth.signup.path} className="text-red-700">
              Sign up
            </Link>
          </p>
        );
      case RouteConstant.auth.signup.path:
        return (
          <p className="text-center text-sm text-gray-700">
            Already have an account?{" "}
            <Link to={RouteConstant.auth.signin.path} className="text-red-700">
              Sign in
            </Link>
          </p>
        );
      case RouteConstant.auth.otp.path:
        return (
          <p className="text-center text-sm text-gray-700">
            Didn't get a code?{" "}
            <Link to={RouteConstant.auth.otp.path} className="text-red-700">
              Resend OTP
            </Link>
          </p>
        );
    }
  };

  return (
    <div className="h-full w-full">
      
      <div
        className={
          "flex  flex-col items-center relative  justify-between min-h-screen  py-5"
        }
      >
        <div>
          <h1 className="text-4xl text-gray-700 font-alumni">
            QUCOON CLOUD SERVICES
          </h1>
        </div>
        <div className="flex   justify-center items-center w-[350px] lg:w-[450px]">
          <div className="bg-[#FFFFFF0D]     max-w-md mx-5 rounded-xl py-5 lg:px-6  px-3 w-full ">
            <div className="justify-center items-center flex-col mt-5 flex space-y-3">
              <p className="font-bold lg:text-3xl text-xl">{title}</p>
              <p className="font-light lg:text-sm text-center text-xs pb-3 ">
                {subtitle}
              </p>
            </div>
            <div>{children}</div>
            <div className={"pt-3"}>{renderFooterText(pathname)}</div>
          </div>
        </div>
        <div className="flex items-end  text-gray-500 bottom-0">
          <h1 className=" ">
            QCS. All rights reserved. © {new Date().getFullYear()}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
