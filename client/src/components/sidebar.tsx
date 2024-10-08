import { useLocation, useNavigate } from "react-router-dom";
import { TbHelpCircle } from "react-icons/tb";
import { IoSettingsOutline } from "react-icons/io5";
import { BsFileEarmarkText } from "react-icons/bs"; 
import { RiDashboard2Line } from "react-icons/ri";

import { cn } from "@/lib/utils";

interface Props {
    children: React.ReactNode;
};

export const Sidebar: React.FC<Props> = ({ children }) => {

    return (
        <aside className='w-[72px] border-r border-gray-300 flex flex-col p-3 justify-between'>
            <div className="flex flex-col gap-y-4 items-center">
                <img src="/logo.webp" className="rounded-md" />
                {children}
            </div>
            <div className="w-full flex flex-col gap-y-2 items-center pb-2">
                <TbHelpCircle className="size-10 icons" />
                <IoSettingsOutline className="size-10 icons" />
            </div>
        </aside>
    );
};

export const LeaveSidebar = () => {
    const location = useLocation().pathname;
    const navigate = useNavigate();

    return (
        <>
            <RiDashboard2Line onClick={()=>navigate('/leave')} className={cn("size-10 icons", location === '/leave' && "active")} />
            <BsFileEarmarkText onClick={()=>navigate('/leave/application')} className={cn("size-10 icons", location.includes('/application') && "active")} />
        </>
    );
};