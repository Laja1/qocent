import { svgLinks } from "@/assets/assetLink";
import { RouteConstant } from "@/router/routes";
import { Link, useLocation } from "react-router-dom";

type AuthLayoutProps = {
  children: React.ReactNode;
  title: string;
  cardbodyClass?: string;
  subtitle?: string;
  mainContainerProps?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  >;
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

const AuthLayout = ({
  children,
  title,
  subtitle,
  cardbodyClass,
  mainContainerProps,
  ...divProps
}: AuthLayoutProps) => {
  const location = useLocation();
  const pathname = location.pathname;
  
  const renderFooterText = (pathname: string) => {
    switch (pathname) {
      case RouteConstant.auth.signin.path:
        return (
          <p className="text-center text-xs text-gray-700">
            Not registered yet?{" "}
            <Link
              to={RouteConstant.auth.signup.path}
              className="text-red-700 hover:underline cursor-pointer"
            >
              Sign up
            </Link>
          </p>
        );
      case RouteConstant.auth.signup.path:
        return (
          <p className="text-center text-xs text-gray-700 flex gap-1 justify-center">
            Already have an account?{" "}
            <Link
              to={RouteConstant.auth.signin.path}
              className="text-red-700 flex justify-center items-center hover:underline cursor-pointer"
            >
              Sign in
            </Link>
          </p>
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-screen w-full flex flex-col" {...divProps}>
      <main
        className="flex flex-col items-center relative justify-center space-y-5 flex-1 py-5"
        {...mainContainerProps}
      >
        <div
          className={`flex rounded-sm justify-center items-center w-full ${cardbodyClass} lg:max-w-md`}
        >
          <div className="bg-[#FFFFFF0D] border  mx-5 rounded-md py-5 px-8 w-full">
            <div className="justify-center flex text-gray-700 font-alumni">
              <img
                src={svgLinks.logo}
                alt="QOCENT Logo"
                className="h-20 w-20"
              />
            </div>
            <div className="justify-center items-center flex-col flex space-y-3">
              <h1 className="font-bold lg:text-3xl text-xl">{title}</h1>
              {subtitle && (
                <p className="font-light lg:text-sm text-center text-xs pb-3">
                  {subtitle}
                </p>
              )}
            </div>
            <div>{children}</div>
            <div className="pt-3">{renderFooterText(pathname)}</div>
          </div>
        </div>
      </main>
      <footer className="flex justify-center text-gray-500 pb-4">
        <p className="text-xs">
          QOCENT. All rights reserved. © {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
};

export default AuthLayout;
