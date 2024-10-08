import { cn } from "@/lib/utils";
import { createContext, useContext, useState, ReactNode } from "react";

export enum AlertType {
    ERROR = 'ERROR',
    SUCCESS = 'SUCCESS',
    INFO = 'INFO'
};

interface AlertContextValue {
    visible: boolean;
    message: string;
    type: AlertType;
    showAlert: (message: string, type: AlertType) => void;
    hideAlert: () => void;
};

const AlertContext = createContext<AlertContextValue | undefined>(undefined);

export const useAlert = () => {
    const context = useContext(AlertContext);

    if (!context) {
        throw new Error("useAlert must be used within an AlertProvider");
    }

    return context;
};

interface AlertProviderProps {
    children: ReactNode;
};

// Main Alert Provider
export const AlertProvider: React.FC<AlertProviderProps> = ({ children }) => {
    const [visible, setVisible] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [type, setType] = useState<AlertType>(AlertType.INFO);

    const showAlert = (message: string, type: AlertType) => {
        setMessage(message);
        setType(type);
        setVisible(true);
        setTimeout(() => {
            setVisible(false); // Hide after 3 seconds
        }, 3000);
    };

    const hideAlert = () => {
        setVisible(false);
    };

    return (
        <AlertContext.Provider value={{ visible, message, type, showAlert, hideAlert }}>
            {children}
            {visible && (
                <div className={cn("absolute top-4 right-4 p-4 rounded-lg text-white text-sm",
                    type === AlertType.SUCCESS && 'bg-green-500',
                    type === AlertType.ERROR && 'bg-red-500',
                    type === AlertType.INFO && 'bg-blue-500')}>
                    <p>{message}</p>
                </div>
            )
            }
        </AlertContext.Provider >
    );
};