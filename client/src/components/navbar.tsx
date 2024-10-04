import { Link, useLocation, useNavigate } from "react-router-dom";
import { useFetch } from "@/hook/useFetch";

import { IoNotificationsOutline } from "react-icons/io5";
import { Dropdown, DropdownArrow, DropdownContent, DropdownItem, DropdownTrigger } from "./dropdown";
import { cn } from "@/lib/utils";

export const Navbar = () => {

    const path = useLocation().pathname;
    const router = useNavigate();

    const { error, fetchData } = useFetch('/api/auth/signout', { method: 'GET' }, false);

    const handleLogout = () => {
        fetchData();
        if (!error) {
            router('/signin');
            localStorage.removeItem('isAuthenticated');
        }
    };

    return (
        path !== '/signin' && <nav className="h-16 px-4 py-2 flex justify-between items-center border-b border-gray-300">
            <ul className="flex items-center gap-x-3">
                <Link to='/' className={cn("font-medium p-2 px-4 hover:bg-blue-100 hover:text-blue-600 rounded-md transition-colors cursor-pointer", path === '/' && 'bg-blue-100 text-blue-600')}>Dashboard</Link>
                <Link to='/leave' className={cn("font-medium p-2 px-4 hover:bg-blue-100 hover:text-blue-600 rounded-md transition-colors cursor-pointer", path === '/leave' && 'bg-blue-100 text-blue-600')}>Leave</Link>
                <Link to='/performance' className={cn("font-medium p-2 px-4 hover:bg-blue-100 hover:text-blue-600 rounded-md transition-colors cursor-pointer", path === '/performance' && 'bg-blue-100 text-blue-600')}>Performance</Link>
            </ul>
            <ul className="flex items-center gap-x-3">
                <li className="relative hover:bg-blue-100 hover:text-blue-600 rounded-md transition-colors cursor-pointer p-2">
                    <IoNotificationsOutline className="size-6" />
                    <span className="size-3 border-2 border-white absolute top-2 right-2 bg-red-500 rounded-full" />
                </li>
                <li className="hover:bg-blue-100 hover:text-blue-600 rounded-md transition-colors cursor-pointer">
                    <Dropdown>
                        <DropdownTrigger>
                            <img src="/police.png" className="size-6 rounded-full" />
                            <DropdownArrow />
                        </DropdownTrigger>
                        <DropdownContent>
                            <DropdownItem onClick={handleLogout}>Profile</DropdownItem>
                            <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
                        </DropdownContent>
                    </Dropdown>
                </li>
            </ul>
        </nav>
    );
};