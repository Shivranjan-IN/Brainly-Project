import { useEffect } from "react";
// Assuming you have these icons or similar ones
import { ShareIcon } from "../icon/ShareIcon";
import { TrashIcon } from "lucide-react"; 
import { ExternalLinkIcon } from "lucide-react"; 

interface CardProps {
  title: string;
  link: string;
  type: "twitter" | "youtube";
}

export function Card({ title, link, type }: CardProps) {
    
  const getYoutubeEmbedUrl = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    const videoId = match && match[2].length === 11 ? match[2] : null;
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  };

  useEffect(() => {
    if (type === "twitter") {
      if (!document.querySelector('script[src="https://platform.twitter.com/widgets.js"]')) {
        const script = document.createElement("script");
        script.src = "https://platform.twitter.com/widgets.js";
        script.async = true;
        document.body.appendChild(script);
      } else {
        // @ts-ignore
        window.twttr?.widgets?.load();
      }
    }
  }, [type, link]);

  return (
    <div>
      {/* FIX APPLIED BELOW:
         Removed: max-w-72 min-w-72
         Added: w-full
      */}
      <div className="p-4 bg-white rounded-md border border-gray-200 w-full min-h-48 shadow-sm">
        
        {/* Header Section */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center text-md font-medium">
            <span className="text-gray-500 pr-2">
                <ShareIcon /> 
            </span>
            <span className="truncate max-w-[150px]" title={title}>{title}</span>
          </div>

          <div className="flex items-center gap-2 text-gray-400">
            <a 
                href={link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-blue-500 transition-colors"
            >
              <ExternalLinkIcon size={18} />
            </a>
            <button className="hover:text-red-500 transition-colors">
              <TrashIcon size={18} />
            </button>
          </div>
        </div>

        {/* Content Section */}
        <div className="w-full overflow-hidden rounded-md">
          {type === "youtube" && getYoutubeEmbedUrl(link) && (
            <iframe
              className="w-full aspect-video rounded-md"
              src={getYoutubeEmbedUrl(link)!}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          )}

          {type === "twitter" && (
            <div className="max-h-[300px] overflow-y-auto no-scrollbar">
                <blockquote className="twitter-tweet">
                <a href={link.replace("x.com", "twitter.com")}></a>
                </blockquote>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}