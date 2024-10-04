import { useLocation } from "react-router-dom";
import { TbHelpCircle } from "react-icons/tb";
import { IoSettingsOutline } from "react-icons/io5";

export const Sidebar = () => {
    const path = useLocation().pathname;

    return (
        path !== '/signin' && <aside className='w-[72px] border-r border-gray-300 flex flex-col p-3 justify-between'>
            <img src="/logo.webp" className="rounded-md" />
            <div className="w-full flex flex-col gap-y-2 items-center pb-2">
                <TbHelpCircle className="size-10 p-2 hover:bg-blue-100 hover:text-blue-600 rounded-md transition-colors cursor-pointer" />
                <IoSettingsOutline className="size-10 p-2 hover:bg-blue-100 hover:text-blue-600 rounded-md transition-colors cursor-pointer" />
            </div>
        </aside>
    );
};