import { Input } from "@/components/input";
import { FormEvent, useState } from "react";
import { TbBrandMailgun } from "react-icons/tb";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Button } from "@/components/button";
import { useFetch } from "@/hook/useFetch";
import { cn } from "@/lib/utils";
import { TbLoader2 } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/store/hooks";
import { setIsAuthenticated } from "@/store/features/userSlice";

const SignIn = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

    const dispatch = useAppDispatch();

    const router = useNavigate();

    const { error, loading, fetchData } = useFetch("/api/auth/signin", {
        method: 'POST',
        body: JSON.stringify({ email, password })
    }, false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await fetchData();
        if (!error) {
            localStorage.setItem('isAuthenticated', 'true');
            dispatch(setIsAuthenticated(true));
            router('/');
        }
    }

    return (
        <main>
            <form onSubmit={handleSubmit} className="lg:w-1/3 md:w-1/2 lg:mx-0 mx-auto p-4 h-full flex flex-col justify-center gap-y-4">
                <h2 className="uppercase mb-6 text-blue-600">Welcome Back</h2>
                <Input id="email" label="Email" value={email} setValue={setEmail} type="text" Icon={TbBrandMailgun} />
                <Input id="password" label="Password" value={password} setValue={setPassword} type={passwordVisible ? 'text' : 'password'} Icon={passwordVisible ? FaEyeSlash : FaEye} iconClick={() => setPasswordVisible(!passwordVisible)} />
                <p className={cn('h-0 text-red-600 text-sm transition-all overflow-hidden', error && 'h-5')}>{error}</p>
                <Button type="submit" variant='primary'>{loading ? <TbLoader2 className="animate-spin mx-auto size-5" /> : "Sign in"}</Button>
            </form>
        </main>
    );
};

export default SignIn;