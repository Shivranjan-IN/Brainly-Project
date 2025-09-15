import { useRef, useState } from "react";
import { CrossIcon } from "../icon/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import axios from "axios";
import { BACKEND_URL } from "../config";

 enum ContentType{
    Youtube="Youtube",
    Twitter= "twitter"
  }


export function CreateContentModel({ open, onClose }) {

 

  const titleRef = useRef<HTMLInputElement>()
  const linkRef = useRef<HTMLInputElement>()
  const [type , setType] =  useState(ContentType.Youtube)

 async function  addContent(){

  const title = titleRef.current?.value;
  const link = linkRef.current?.value;

  await axios.post(`${BACKEND_URL}/api/v1/content`,{
    link,
    title,
    type
  },{
    headers: {
      "Authorization": localStorage.getItem("token")
    } 
  } )
}

  return (
    
    
    <div>
      {open && (
        <div className="w-screen h-screen bg-slate-200 fixed top-0 left-0 opacity-95 flex justify-center">
        <div className="flex flex-col justify-center">
            <span className="bg-white  opacity-100 p-4 rounded ">
           <div className="flex justify-end">
            <div onClick={onClose} className="cursor-pointer"> 
                 <CrossIcon/>
            </div>
                   
           </div>
          <div>
            <Input ref={titleRef}  placeholder = {"Title"}/>
            <Input ref={linkRef} placeholder= {"Link"}/>

          </div>

          <h1>Type</h1>
          <div>
<div className="flex gap-1 p-4">

  <Button text="Youtube" variant={ type===ContentType.Youtube ? "primary":"secondary"} onClick={() => {
    setType(ContentType.Youtube)
  }} ></Button>

  <Button text="Twitter" variant={ type===ContentType.Twitter ? "primary":"secondary"}  onClick={()=>{
    setType(ContentType.Twitter)
  }}></Button>
  </div>

</div>
          <div className="flex justify-center">
          <Button onClick={addContent} variant="primary" text="Submit"/>
          </div>
        </span>
        </div>
        
        </div>
      )} 
    </div>
  );
}

 
 