import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

export function useContent() {
    const [contents, setContents] = useState([]);

    // 1. Move the fetch logic into a named function
    function refresh() {
        axios.get(`${BACKEND_URL}/api/v1/content`, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        })
        .then((response) => {
            // Ensure we handle the response structure correctly
            setContents(response.data.content);
        })
        .catch((e) => {
            console.error("Error fetching content:", e);
        });
    }

    // 2. Call refresh inside useEffect
    useEffect(() => {
        refresh();
        
        // Optional: Auto-refresh every 10 seconds so you see updates from other devices
        let interval = setInterval(() => {
            refresh()
        }, 10 * 1000)

        return () => {
            clearInterval(interval);
        }
    }, []);

    // 3. IMPORTANT: Return an object containing both the data and the function
    return { contents, refresh };
}