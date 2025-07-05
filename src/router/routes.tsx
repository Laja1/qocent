export const navRoutes = [
  {
    id: "explore",
    path: "/explore",
    name: "Explore Services",
  },
  {
    id: "dashboard",
    path: "/dashboard",
    name: "Dashboard",
  },
  {
    id: "projects",
    path: "/projects",
    name: "Projects",
  },
  {
    id: "billing",
    path: "/billing",
    name: "Billing",
  },
  {
    id: "docs",
    path: "/docs",
    name: "Documentation",
  },
  {
    id: "support",
    path: "/support",
    name: "Support",
  },
  {
    id: "settings",
    path: "/settings",
    name: "Account Settings",
  },
  {
    id: "terms",
    path: "/terms",
    name: "Terms & Conditions",
  },
  {
    id: "help",
    path: "/help",
    name: "Help Center",
  },
];

export const RouteConstant = {
  public: {
    home: {
      path: "/home",
      name: "home",
    },
    landing: {
      path: "/landing",
      name: "Landing",
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
      path: "/otp",
      name: "otp",
    },
    invite: {
      path: "/invite",
      name: "invite",
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
    reset: {
      path: "reset",
      name: "reset",
    },
    resetPassword: {
      path: "reset-password",
      name: "reset-Password",
    },
    changePassword: {
      path: "change-password",
      name: "change-Password",
    },
  },
  dashboard: {
    dashboard: {
      path: "dashboard",
      name: "dashboard",
    },
    serverSite:{
      path: "server-sites",
      name: "ServerSite",
     
    },
    serverHouses:{
      path: "server-houses",
      name: "ServerHouses"
     
    },
    serverRooms:{
      path: "server-rooms",
      name: "ServerRooms",
     
    },
    resource:{
      path: "resource",
      name: "resource",
      
    },
    resources:{
      path: "resources",
      name: "Resource",
     
    },
    createResources:{
      path: "create-new-resource",  
      name: "create-new-resource",
    },
    createnewsite:{
      path:'create-new-site',
      name:"Create New Site" 
      },
    serverId:{
      path: "server:id",
      name: "Server",
     
    },
  },
};