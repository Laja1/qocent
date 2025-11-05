export const navRoutes = [
  {
    link: "/explore",
    name: "Professional Services",
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
    bookDemo: {
      path: "/book-demo",
      name: "Book A Demo",
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
    acceptInvite: {
      path: "/accept-invitation/:siteCode/:email",
      name: "Accept Invite",
    },
    monitoring: {
      path: "/monitoring",
      name: "Monitoring",
    },
    createProfessionalService: {
      path: "/create-professional-service",
      name: "Create Professional Service",
    },
    starterPacks: {
      path: "/starter-packs",
      name: "Starter Packs",
    },
    serverSite: {
      path: "/server-sites",
      name: "ServerSite",
    },
    professionalServices: {
      path: "/professional-services",
      name: "professionalServices",
    },
    serverHouses: {
      path: "/server-houses",
      name: "ServerHouses",
    },
    certificateManager: {
      path: "/security/certificate-manager",
      name: "CertificateManager",
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
    updateResources: {
      path: "/update-resources",
      name: "Update Resources",
    },
    createResources: {
      path: "/create-new-resource",
      name: "create-new-resource",
    },
    createnewsite: {
      path: "/create-new-site",
      name: "Create New Site",
    },
    security: {
      path: "/security",
      name: "Cloud Certificate Manager",
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
    obs: {
      path: "/obs",
      name: "obs",
    },
  },
};
