import { LogoIcon } from "../icon/Logo";
import { TwitterIcon } from "../icon/TwitterIcon";
import { YoutubeIcon } from "../icon/YoutubeIcon";
import { SidebarItem } from "./SidebarItem";

export function Sidebar() {
  return (
    <div className="h-screen bg-white border-r border-gray-200 w-72 fixed left-0 top-0 pl-6">
      
      <div className="flex text-2xl font-bold items-center pt-8">
        <div className="pr-3 text-purple-600 transition-all hover:text-purple-700 cursor-pointer">
          <LogoIcon />
        </div>
        Brainly
      </div>

      <div className="pt-8 pl-4 space-y-2">
        <SidebarItem text="Twitter" icon={<TwitterIcon />} />
        {/* FIXED: Changed Button to SidebarItem */}
        <SidebarItem text="Youtube" icon={<YoutubeIcon />} />
      </div>

    </div>
  );
}