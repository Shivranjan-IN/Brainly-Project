import { useState } from "react"
import { Button } from "../components/Button"
import { Card } from "../components/Card"
import { CreateContentModel } from "../components/CreateComponentModel"
import { PlusIcon } from "../icon/plusIcon"
import { ShareIcon } from "../icon/ShareIcon" 
import { Sidebar } from "../components/Sidebar"
import { useContent } from "../hooks/useContent"



 export function Dashboard() {
const [modelOpen , setModelOpen] = useState(false);
     
const contents = useContent();
  return (
   
    <div> 
      <Sidebar/>
      <div className="p-4 ml-72 min-h-screen bg-gray-100 border-l-3">
       <CreateContentModel open={modelOpen} onClose={()=>{
        setModelOpen(false);
       }}
       
       />

        <div className="flex justify-end gap-4">

    <Button  onClick={()=>{
      setModelOpen(true)

    }}
     variant="primary" text="Add content" startIcon={<PlusIcon/>}> </Button>
    <Button variant="secondary" text="Share Brain" startIcon={<ShareIcon/>}></Button>
 </div>
<div className="flex gap-4">

{contents.map(({type,link,title} , index) => <Card 
key={index}
type={type} 
link={link}  
title={title}

 />
 )}



{/* <Card type= "youtube" link="https://www.youtube.com/watch?v=muEaK_Sg8Ns" title="first videos" /> */}
  </div>

     </div>

      </div>
     
    
  )
}


  