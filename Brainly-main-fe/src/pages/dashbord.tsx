import { useState, useEffect } from "react";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { CreateContentModel } from "../components/CreateComponentModel"; // Fixed Typo: Model -> Modal usually, but kept to your file name
import { PlusIcon } from "../icon/plusIcon";
import { ShareIcon } from "../icon/ShareIcon";
import { Sidebar } from "../components/Sidebar";
import { useContent } from "../hooks/useContent";
import axios from "axios";
import { BACKEND_URL } from "../config";

export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  
  // Assuming useContent returns { contents, refresh } 
  // If it only returns contents, you might need to move the refresh logic here.
  const { contents, refresh } = useContent(); 

  async function shareBrain() {
      try {
        const response = await axios.post(`${BACKEND_URL}/api/v1/brain/share`, {
            share: true
        }, {
            headers: { Authorization: localStorage.getItem("token") }
        });
        const shareUrl = `http://localhost:5173/share/${response.data.hash}`;
        alert(`Share link copied to clipboard: ${shareUrl}`);
        // Copy to clipboard logic
        navigator.clipboard.writeText(shareUrl);
      } catch(e) {
          console.error(e);
      }
  }

  return (
    <div>
      <Sidebar />
      
      {/* Main Content Area */}
      {/* ml-72 matches the Sidebar width. min-h-screen ensures full height background */}
      <div className="p-8 ml-72 min-h-screen bg-gray-100">
        
        <CreateContentModel 
            open={modalOpen} 
            onClose={() => {
                setModalOpen(false);
                if (refresh) refresh(); // Refresh contents after closing modal
            }} 
        />

        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">All Notes</h1>
          
          <div className="flex gap-4">
            <Button 
                onClick={() => setModalOpen(true)}
                variant="primary" 
                text="Add content" 
                startIcon={<PlusIcon />} 
            />
            <Button 
                onClick={shareBrain}
                variant="secondary" 
                text="Share Brain" 
                startIcon={<ShareIcon />} 
            />
          </div>
        </div>

        {/* Cards Grid */}
        {/* Using Grid is better than Flex for card layouts so they align in columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            
            {contents.map(({ type, link, title, _id }) => (
                <Card
                    key={_id || link} // Prefer database ID (_id) over index
                    type={type}
                    link={link}
                    title={title}
                />
            ))}
            
            {/* Empty State Suggestion */}
            {contents.length === 0 && (
                <div className="col-span-full text-center text-gray-500 mt-10">
                    No notes found. Click "Add content" to get started!
                </div>
            )}
        </div>
      </div>
    </div>
  );
}