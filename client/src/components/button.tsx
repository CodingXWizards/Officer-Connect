import { cn } from '@/lib/utils'
import { cva, VariantProps } from 'class-variance-authority';
import React, { ReactNode } from 'react'


const buttonStyles = cva(
    "rounded-2xl font-medium transition-colors duration-500 py-2.5 px-5",
    {
        variants: {
            variant: {
                primary: "bg-blue-600 hover:bg-opacity-90 text-white",
                secondary: "bg-[#F4F4FF] hover:bg-[#F0F0FB]",
                success: "bg-green-600 hover:bg-opacity-90 text-white",
                danger: "bg-red-600 hover:bg-opacity-90 text-white",
                bordered: "bg-white text-blue-500 border border-blue-500 hover:border-blue-600 hover:text-blue-600",
                dark: "bg-[#191C1F] text-white hover:bg-black",
                light: "bg-white hover:bg-slate-100 text-[#191C1F]",
                link: "hover:underline px-0 font-normal"
            },
            size: {
                sm: "text-sm",
                base: "text-base",
                lg: "text-lg"
            }
        },
        defaultVariants: {
            size: "base",
            variant: "dark"
        }
    }
);

interface ButtonProps extends VariantProps<typeof buttonStyles>, React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
}

export const Button = ({ children, size, variant, className, ...props }: ButtonProps) => {

    return (
        <button className={cn(buttonStyles({ variant, size, className }))} {...props}>
            {children}
        </button>
    )
}