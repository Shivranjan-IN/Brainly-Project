import { useRef, useState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export function Signin() {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    async function signin() {
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;

        // 1. Basic Validation
        if (!username || !password) {
            alert("Please provide both username and password.");
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
                username,
                password,
            });

            // 2. Success Logic
            const jwt = response.data.token;
            localStorage.setItem("token", jwt);
            
            // Optional: Redirect logic
            navigate("/dashboard");

        } catch (e) {
            // 3. Error Handling
            console.error(e);
            // In a real app, use a Toast component instead of alert
            alert("Incorrect credentials or server error.");
        } finally {
            // 4. Reset loading state regardless of success/failure
            setLoading(false);
        }
    }

    return (
        <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
            <div className="bg-white rounded-xl border min-w-80 p-8 shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                    Welcome Back
                </h2>

                <div className="flex flex-col gap-4">
                    <Input ref={usernameRef} placeholder="Username" />
                    <Input ref={passwordRef} placeholder="Password" type="password" /> {/* type="password" hides characters */}
                </div>

                <div className="flex justify-center pt-6">
                    <Button
                        onClick={signin}
                        loading={loading} // Pass loading state
                        variant="primary"
                        text="Signin"
                        fullWidth={true}
                    />
                </div>
            </div>
        </div>
    );
}