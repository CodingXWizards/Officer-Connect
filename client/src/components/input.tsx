import { ChangeEvent, Dispatch, SetStateAction, useRef } from "react";
import { IconType } from "react-icons";

interface Props<T> {
    id: string
    type: string;
    label: string;
    value: string;
    setValue: Dispatch<SetStateAction<T>>;
    Icon?: IconType
    iconClick?: () => void;
};

export const Input = ({ id, type, label, value, setValue, Icon, iconClick }: Props<any>) => {
    const inputRef = useRef<HTMLInputElement | null>(null);

    return (
        <div onClick={() => inputRef.current?.focus()} className="relative w-full overflow-hidden flex items-center border border-gray-400 focus-within:border-blue-600 rounded-xl h-14 px-3 group cursor-pointer">
            <label htmlFor={id} className={`z-[2] absolute font-medium text-gray-500 group-focus-within:text-xs group-focus-within:top-1.5 group-focus-within:text-blue-600 ${value.length > 0 ? "top-1.5 text-xs text-blue-600" : "top-4"} transition-all`}>{label}</label>
            <input
                ref={inputRef}
                id={id}
                type={type}
                value={value}
                onChange={(ele: ChangeEvent<HTMLInputElement>) => setValue(ele.target.value)}
                placeholder=""
                className='focus:outline-none flex-grow transition-transform cursor-pointer relative group-focus-within:my-6 top-1.5'
            />
            {Icon && <Icon onClick={iconClick} className="absolute right-4 size-5" />}
        </div>
    );
};