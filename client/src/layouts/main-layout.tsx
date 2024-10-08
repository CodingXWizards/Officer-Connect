import { Outlet, useLocation } from 'react-router-dom';

import { Navbar } from "@/components/navbar";
import { LeaveSidebar, Sidebar } from "@/components/sidebar";

const MainLayout = () => {
    const location = useLocation().pathname;
    const getSidebarChildrens = (): React.ReactNode => {
        if(location.includes('/leave')){
                return <LeaveSidebar />
        }
    }

    return (
        <div className='flex'>
            <Sidebar>{getSidebarChildrens()}</Sidebar>
            <div className='w-full'>
                <Navbar />
                <Outlet />
            </div>
        </div>
    );
};

export default MainLayout;