
import { forwardRef } from "react";

interface InputProps {
    placeholder: string;
    type?: string; // Added type prop so you can use it for passwords
}

// 1. Wrap the component in forwardRef
// 2. The type arguments are <HTMLInputElement, InputProps>
export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ placeholder, type }, ref) => {
        return (
            <div>
                <input
                    ref={ref} // 3. Connect the ref here
                    type={type || "text"}
                    placeholder={placeholder}
                    className="px-4 py-2 border rounded m-2 w-full"
                />
            </div>
        );
    }
);

// Optional: Display name for debugging in React DevTools
Input.displayName = "Input";