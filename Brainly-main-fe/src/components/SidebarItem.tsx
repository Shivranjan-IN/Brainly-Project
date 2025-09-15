import type { ReactElement } from "react";




export function SidebarItem( {text,icon}:{
text: string;
icon:ReactElement;

})  {
    return <div className="flex text-gray-700 py-2 cursor-pointer hover:bg-gray-200 rounded max-w-48 pl-4"> 
    <div className="p-2">
{icon}
    </div>
    <div className="p-2">
{text}
    </div>

    </div>
}