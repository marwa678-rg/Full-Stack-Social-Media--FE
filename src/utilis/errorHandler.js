

import toast from "react-hot-toast";


export function handleError(error){
//handle Error Messages[]
if(error.response?.data?.messages){
  error.response?.data?.messages.forEach((message)=>{
    toast.error(message);
  })
  return;
}else if(error.response?.data?.message){
  toast.error(error.response?.data?.message);
  return;
}else{
  toast.error("Something went wrong")
}
}