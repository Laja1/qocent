export const navRoutes= [
  {
    id: "explore",
    path: "explore",
    name: "Explore",
  },
  
  {
    id: "schools",
    path: "schools",
    name: "Schools",
  },
  {
    id: "dashboard",
    path: "dashboard",
    name: "Dashboard",
  },
  {
    path: "terms",
    name: "Terms & Conditions",
  },
  {
    path: "help",
    name: "Help",
  },
]

export const RouteConstant = {
  public: {
    home: {
      path: "home",
      name: "home",
    },
  },
  auth: {   
    sigin: {
      path: "signin",
      name: "signin",
    },
    signup: {
      path: "signup",
      name: "signup",
    },
    otp: {
      path: "otp",
      name: "otp",
    },
    invite: {
      path: "invite",
      name: "invite",
    },
    error: {
      path: "error",
      name: "error",
    },
    projects: {
      path: "projects",
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
      path: "create-resource",  
      name: "Resources",
    },
    serverId:{
      path: "server:id",
      name: "Server",
     
    },
  },
};