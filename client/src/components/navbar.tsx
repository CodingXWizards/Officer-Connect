export const Navbar = () => {
    return (
        <nav className="h-16 px-10 py-2 flex">
            <div className="flex items-center gap-x-3">
                <img src="/logo.webp" alt="Officer Connect" className="h-full w-fit rounded" />
                <h4 className="uppercase">Officer Connect</h4>
            </div>
        </nav>
    );
};