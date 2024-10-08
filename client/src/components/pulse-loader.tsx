import { cn } from "@/lib/utils";

interface Props {
    className?: string;
};

export const PulseLoader: React.FC<Props> = ({ className }) => {
    return (
        <div className={cn(
            "w-24 h-5 bg-gray-200 rounded-md animate-pulse",
            className
        )}
        />
    );
};