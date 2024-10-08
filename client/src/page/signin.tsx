import { FormEvent, useState } from "react";
import { TbBrandMailgun } from "react-icons/tb";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { cn } from "@/lib/utils";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { useAppDispatch } from "@/store/hooks";
import { setIsAuthenticated } from "@/store/features/userSlice";
import { fetchData } from "@/utils/fetch-data";
import { useLoading } from "@/hook/useLoading";

const SignIn = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

    const dispatch = useAppDispatch();

    const router = useNavigate();

    const { loading, error, withLoading } = useLoading();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const response = await withLoading<{ result?: string, error?: string }>(() => fetchData("/api/auth/signin", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        }));
        if (response.error) {
            console.log(error);
            return;
        }
        localStorage.setItem('isAuthenticated', 'true');
        dispatch(setIsAuthenticated(true));
        router('/');
    }

    return (
        <main>
            <form onSubmit={handleSubmit} className="lg:w-1/3 md:w-1/2 lg:mx-0 mx-auto p-4 h-full flex flex-col justify-center gap-y-4">
                <h2 className="uppercase mb-6 text-blue-600">Welcome Back</h2>
                <Input id="email" label="Email" value={email} setValue={setEmail} type="text" Icon={TbBrandMailgun} />
                <Input id="password" label="Password" value={password} setValue={setPassword} type={passwordVisible ? 'text' : 'password'} Icon={passwordVisible ? FaEyeSlash : FaEye} iconClick={() => setPasswordVisible(!passwordVisible)} />
                <p className={cn('h-0 text-red-600 text-sm transition-all overflow-hidden', error as string && 'h-5')}>{error as (string | null) && (error as string).toString()}</p>
                <Button type="submit" variant='primary' isLoading={loading}>Sign in</Button>
            </form>
        </main>
    );
};

export default SignIn;