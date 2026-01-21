

//Get CurrentEnvironment And Set BaseUrl 


 export function baseUrlHandler(){
  return import.meta.env.PROD?
  import.meta.env.VITE_BACKEND_BASE :
  import.meta.env.VITE_BACKEND_BASE_LOCAL;
}