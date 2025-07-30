export const navRoutes = [
  {
    link: "/explore",
    name: "Explore Services",
  },

  // {
  //   id: "projects",
  //   link: "/projects",
  //   name: "Projects",
  // },

  {
    id: "docs",
    link: "/docs",
    name: "Documentation",
  },
  {
    id: "about-us",
    link: "/about-us",
    name: "About Us",
  },
];

export const RouteConstant = {
  public: {
    home: {
      path: "/",
      name: "home",
    },
    explore: {
      path: "/explore",
      name: "explore",
    },
    documentation: {
      path: "/docs",
      name: "documentation",
    },
    aboutUs: {
      path: "/about-us",
      name: "About Us",
    },
    partners: {
      path: "/our-partners",
      name: "Our Partners",
    },
  },
  auth: {
    signin: {
      path: "/signin",
      name: "Sign In",
    },
    signup: {
      path: "/signup",
      name: "Sign Up",
    },
    otp: {
      path: "/confirm-account",
      name: "confirm-account",
    },
    confirmPasswordReset: {
      path: "/confirm-password-reset",
      name: "confirm-password-reset",
    },
    error: {
      path: "/error",
      name: "error",
    },
    projects: {
      path: "/projects",
      name: "projects",
    },
    success: {
      path: "success",
      name: "success",
    },
    successSignup: {
      path: "success-signup",
      name: "success-signup",
    },
    successReset: {
      path: "success-reset",
      name: "success-reset",
    },
    created: {
      path: "created",
      name: "created",
    },
    changed: {
      path: "changed",
      name: "changed",
    },
    forgotPassword: {
      path: "/forgot-password",
      name: "forgot-password",
    },
    resetPassword: {
      path: "/reset-password",
      name: "reset-Password",
    },
    changePassword: {
      path: "/change-password",
      name: "change-Password",
    },
  },
  dashboard: {
    dashboard: {
      path: "/dashboard",
      name: "dashboard",
    },
    serverSite: {
      path: "/server-sites",
      name: "ServerSite",
    },
    serverHouses: {
      path: "/server-houses",
      name: "ServerHouses",
    },
    serverRooms: {
      path: "/server-rooms",
      name: "ServerRooms",
    },
    resource: {
      path: "/resource",
      name: "resource",
    },
    resources: {
      path: "/resources",
      name: "Resource",
    },
    settings: {
      path: "/settings",
      name: "settings",
    },
    organizations: {
      path: "/organizations",
      name: "organizations",
    },
    access: {
      path: "/access",
      name: "access",
    },
    billings: {
      path: "/billings",
      name: "billings",
    },
    createResources: {
      path: "/create-new-resource",
      name: "create-new-resource",
    },
    createnewsite: {
      path: "/create-new-site",
      name: "Create New Site",
    },
    createnewhouse: {
      path: "/create-new-house",
      name: "Create New house",
    },
    createnewroom: {
      path: "/create-new-room",
      name: "Create New Room",
    },
    console: {
      path: "/console",
      name: "console",
    },
  },
};
