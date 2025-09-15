import { LogoIcon } from "../icon/Logo";
import { TwitterIcon } from "../icon/TwitterIcon";
import { YoutubeIcon } from "../icon/YoutubeIcon";
import { SidebarItem } from "./SidebarItem";

export function Sidebar(){
    return <div className="h-screen bg-white border-r w-72  fixed left-0 top-0 pl-4 pt-4">

        <div className="flex text-2xl items-center">
            <div className="pr-2  text-purple-600">
              <LogoIcon/>  
            </div>
            
            Brainly
        </div>
<div className="pt-8 pl-6">
<SidebarItem text="Twitter" icon={<TwitterIcon/>}/>

<SidebarItem text="Youtube" icon={<YoutubeIcon/>} />

</div>
    </div>
}