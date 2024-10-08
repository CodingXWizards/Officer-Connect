import React, { createContext, useContext, useState, ReactNode, useRef, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";

import { cn } from "@/lib/utils";

// Context for managing dropdown state
interface DropdownContextValue {
    isOpen: boolean;
    toggleDropdown: () => void;
    closeDropdown: () => void;
};

const DropdownContext = createContext<DropdownContextValue | undefined>(undefined);

const useDropdown = () => {
    const context = useContext(DropdownContext);
    if (!context) {
        throw new Error("useDropdown must be used within a Dropdown");
    }
    return context;
};

// Main Dropdown component
interface DropdownProps {
    children: ReactNode;
};

export const Dropdown: React.FC<DropdownProps> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => setIsOpen((prev) => !prev);
    const closeDropdown = () => setIsOpen(false);

    return (
        <DropdownContext.Provider value={{ isOpen, toggleDropdown, closeDropdown }}>
            <div className="relative inline-block text-nowrap">{children}</div>
        </DropdownContext.Provider>
    );
};

// Dropdown Trigger (button or clickable element to open/close dropdown)
interface DropdownTriggerProps {
    children: ReactNode;
    className?: string;
};

export const DropdownTrigger: React.FC<DropdownTriggerProps> = ({ children, className }) => {
    const { toggleDropdown } = useDropdown();

    const handleClick = (ev: React.MouseEvent<HTMLButtonElement>) => {
        ev.stopPropagation();
        toggleDropdown();
    }

    return (
        <button
            type="button"
            className={cn("p-2 rounded-md focus:outline-none flex gap-x-2 items-center", className)}
            onClick={handleClick}
        >
            {children}
        </button>
    );
};

export const DropdownArrow = () => {
    const { isOpen } = useDropdown();

    return (
        <IoIosArrowDown className={cn("size-4 rotate-0 transition-transform", isOpen && 'rotate-180')} />
    );
};

// Dropdown content (shown when open)
interface DropdownContentProps {
    children: ReactNode;
    className?: string;
};

export const DropdownContent: React.FC<DropdownContentProps> = ({ children, className }) => {
    const { isOpen, closeDropdown } = useDropdown();

    const boxRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (boxRef.current && !boxRef.current.contains(event.target as Node)) {
                closeDropdown();
            }
        };

        if (isOpen) {
            document.addEventListener("click", handleClickOutside);
        }

        // Cleanup event listener on unmount or when isOpen changes
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [isOpen, closeDropdown]);

    if (!isOpen) return null;

    return (
        <div
            ref={boxRef}
            className={cn("absolute mt-2 min-w-48 w-full py-2 right-0 bg-white shadow-[0_0_10px] shadow-gray-300 rounded-lg", className)}
        >
            {children}
        </div>
    );
};

// Dropdown item (individual dropdown options)
interface DropdownItemProps {
    children: ReactNode;
    className?: string;
    active?: boolean;
    onClick?: () => void;
};

export const DropdownItem: React.FC<DropdownItemProps> = ({ children, onClick, className, active = false }) => {
    const { closeDropdown } = useDropdown();

    return (
        <div
            className={cn(
                "px-4 py-2 cursor-pointer hover:bg-gray-100",
                active && "bg-blue-100 hover:bg-blue-100 text-blue-700",
                className
            )}
            onClick={() => { onClick && onClick(); closeDropdown(); }}
        >
            {children}
        </div>
    );
};