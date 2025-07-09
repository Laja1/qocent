export const navRoutes = [
  {
   
    link: "/explore",
    name: "Explore Services",
  },
  {
    id: "dashboard",
    link: "/dashboard",
    name: "Dashboard",
  },
  {
    id: "projects",
    link: "/projects",
    name: "Projects",
  },
  
  {
    id: "docs",
    link: "/docs",
    name: "Documentation",
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
    serverSite:{
      path: "/server-sites",
      name: "ServerSite",
     
    },
    serverHouses:{
      path: "/server-houses",
      name: "ServerHouses"
     
    },
    serverRooms:{
      path: "/server-rooms",
      name: "ServerRooms",
     
    },
    resource:{
      path: "/resource",
      name: "resource",
      
    },
    resources:{
      path: "/resources",
      name: "Resource", 
    },
    settings:{
      path: "/settings",
      name: "settings", 
    },
    organizations:{
      path: "/organizations",
      name: "organizations", 
    },
    billings:{
      path: "/billings",
      name: "billings", 
    },
    createResources:{
      path: "/create-new-resource",  
      name: "create-new-resource",
    },
    createnewsite:{
      path:'/create-new-site',
      name:"Create New Site" 
      },
      createnewhouse:{
        path:'/create-new-house',
        name:"Create New house" 
        },
        createnewroom:{
          path:'/create-new-room',
          name:"Create New Room" 
          },
    serverId:{
      path: "server:id",
      name: "Server",
     
    },
  },
};