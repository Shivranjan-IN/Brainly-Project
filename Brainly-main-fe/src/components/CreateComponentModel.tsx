import { useRef, useState, useEffect } from "react"; // Import useEffect
import { CrossIcon } from "../icon/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input"; 
import axios from "axios";
import { BACKEND_URL } from "../config";

enum ContentType {
  Youtube = "youtube",
  Twitter = "twitter",
}

interface CreateContentModalProps {
  open: boolean;
  onClose: () => void;
}

export function CreateContentModel({ open, onClose }: CreateContentModalProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const [type, setType] = useState(ContentType.Youtube);
  const [loading, setLoading] = useState(false);

  // NEW: Reset inputs when modal opens
  useEffect(() => {
    if (open && titleRef.current && linkRef.current) {
        titleRef.current.value = "";
        linkRef.current.value = "";
        setType(ContentType.Youtube); // Reset type to default
    }
  }, [open]);

  async function addContent() {
    const title = titleRef.current?.value;
    const link = linkRef.current?.value;

    if (!title || !link) {
      alert("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      await axios.post(
        `${BACKEND_URL}/api/v1/content`,
        {
          link,
          title,
          type,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      onClose(); // Close on success
      
    } catch (e) {
      console.error(e);
      alert("Failed to create content. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (!open) return null;

  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-50 flex justify-center items-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-md mx-4 flex flex-col">
        
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Add Content</h2>
          <div onClick={onClose} className="cursor-pointer hover:bg-gray-100 rounded p-1 transition-colors">
            <CrossIcon />
          </div>
        </div>

        <div className="flex justify-between items-center  w-full m-4 flex-col gap-2 ">
          <Input ref={titleRef} placeholder={"Title"} />
          <Input ref={linkRef} placeholder={"Link"} />
        </div>

        <div className="mt-4 ">
          <h3 className="mb-2 text-sm font-medium text-gray-700">Type</h3>
          <div className="flex gap-2 mb-6">
            <Button
              text="Youtube"
              variant={type === ContentType.Youtube ? "primary" : "secondary"}
              onClick={() => setType(ContentType.Youtube)}
            />
            <Button
              text="Twitter"
              variant={type === ContentType.Twitter ? "primary" : "secondary"}
              onClick={() => setType(ContentType.Twitter)}
            />
          </div>
        </div>

        <div className="flex justify-center">
          <Button 
            onClick={addContent} 
            variant="primary" 
            text="Submit" 
            loading={loading} 
          />
        </div>
      </div>
    </div>
  );
}