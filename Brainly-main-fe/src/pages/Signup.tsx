import { useRef, useState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Signup() {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    async function signup() {
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;

        // 1. Validation: Prevent empty submissions
        if (!username || !password) {
            alert("Please provide both username and password");
            return;
        }

        setLoading(true);

        try {
            await axios.post(BACKEND_URL + "/api/v1/signup", {
                username,
                password,
            });

            // 2. Success Logic
            // It's usually better to navigate AFTER the alert or use a toast notification
            navigate("/signin");
            alert("You have signed up successfully!");
            
        } catch (e) {
            // 3. Error Handling
            console.error(e);
            alert("Error while signing up. Username might already be taken.");
        } finally {
            // 4. Reset loading state
            setLoading(false);
        }
    }

    return (
        <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
            <div className="bg-white rounded-xl border min-w-80 p-8 shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                    Join Brainly
                </h2>

                <div className="flex flex-col gap-4">
                    <Input ref={usernameRef} placeholder="Username" />
                    <Input 
                        ref={passwordRef} 
                        placeholder="Password" 
                        type="password" // Hides the password characters
                    />
                </div>

                <div className="flex justify-center pt-6">
                    <Button 
                        onClick={signup} 
                        loading={loading} // Visual feedback
                        variant="primary" 
                        text="Signup" 
                        fullWidth={true} 
                    />
                </div>
            </div>
        </div>
    );
}