import { MouseEvent, useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/utils';
import { useFetch } from '@/hook/useFetch';
import { Application, Status } from '@/types/application';
import { PulseLoader } from '@/components/pulse-loader';

const Leave = () => {
    const { loading, data, start } = useFetch<Application[]>("/api/application/all", { method: "GET" }, false);

    const [showStatusInfo, setShowStatusInfo] = useState<boolean>(false);
    const statusRef = useRef<HTMLElement>(null);

    const handleStatusInfo = (event: Event) => {
        if (event.target !== statusRef.current)
            setShowStatusInfo(false);
    }

    useEffect(() => {
        start();
    }, []);

    useEffect(() => {
        if (statusRef.current)
            window.addEventListener('click', handleStatusInfo)

        return () => {
            if (statusRef.current)
                window.removeEventListener('click', handleStatusInfo);
        }
    }, [showStatusInfo]);

    return (
        <main className={cn("flex flex-col gap-y-4")}>
            <h3>Applications</h3>
            <section className='grid grid-cols-4 gap-5'>
                {!loading
                    ? data && data.map((application: Application) => (
                        <div key={application.id} onClick={(event: MouseEvent<HTMLDivElement>) => {setShowStatusInfo(!showStatusInfo); event.stopPropagation()}} className='bg-white shadow-[0_2px_12px] shadow-gray-300 p-4 rounded-md flex flex-col hover:scale-105 transition-transform cursor-pointer'>
                            <header className='flex justify-between'>
                                <p>Type of Leave: {application.leaveType}</p>
                                <span className={cn(
                                    'p-0.5 px-2 border rounded-md text-sm size-fit',
                                    application.status === Status.APPROVED && 'bg-green-100 text-green-500 border-green-500',
                                    application.status === Status.PENDING && 'bg-yellow-100 text-yellow-500 border-yellow-500',
                                    application.status === Status.REJECTED && 'bg-red-100 text-red-500 border-red-500',
                                )}
                                >{application.status}</span>
                            </header>
                            <p className='flex-grow my-4 text-sm'>{application.reason}</p>
                            <div className='flex justify-between'>
                                <p className='text-gray-600 text-sm'>From: {application.startDate.toString()}</p>
                                <p className='text-gray-600 text-sm'>To: {application.endDate.toString()}</p>
                            </div>
                        </div>
                    ))
                    : Array.from({ length: 10 }).map((_, index: number) => (
                        <div key={index} className='shadow-[0_2px_12px] shadow-gray-300 p-4 rounded-md flex flex-col hover:scale-105 transition-transform cursor-pointer'>
                            <header className='flex justify-between'>
                                <PulseLoader />
                                <PulseLoader />
                            </header>
                            <div className='my-4 flex flex-col gap-y-2'>
                                <PulseLoader className='w-full' />
                                <PulseLoader className='w-full' />
                                <PulseLoader className='w-full' />
                            </div>
                            <div className='flex justify-between'>
                                <PulseLoader />
                                <PulseLoader />
                            </div>
                        </div>
                    ))
                }
            </section>
            <aside ref={statusRef} className={cn(
                "absolute -right-[21rem] top-16 m-3 w-80 rounded-lg bg-white shadow-[0_2px_16px] shadow-gray-400 transition-all duration-500 ease-in-out",
                showStatusInfo && "right-0"
            )}
            >
                <header className='pt-3 px-4 pb-2'>
                    <p className='font-semibold'>Status Info</p>
                </header>
                <hr />
                <div className='p-3 px-4 text-gray-700'>
                    <div className='space-y-2'>
                        <p className='block font-medium'>Today</p>
                        <div className='flex'>
                            <div className='flex-shrink-0 flex flex-col items-center gap-y-2'>
                                <img src="/police.png" alt="police" className='size-7 bg-gray-200 rounded-full p-1' />
                                <div className='flex-grow border-0 border-l-2 border-orange-300' />
                            </div>
                            <div className='flex flex-col px-3 pb-2 gap-y-2'>
                                <div className='flex items-center gap-x-3'>
                                    <p className='font-medium text-base'>Raja Singh</p>
                                    <span className='ml-auto font-medium border rounded-lg p-0.5 px-2 border-green-500 text-green-500 text-sm'>SP</span>
                                </div>
                                <p className='text-sm px-3 py-2 border border-gray-300 rounded-md'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Id quam quo repudiandae minus eaque. Inventore, delectus! Repudiandae eum facilis,</p>
                                <span className='p-1 px-2 text-xs bg-red-100 border border-red-500 text-red-600 rounded w-fit'>Rejected</span>
                            </div>
                        </div>
                    </div>

                </div>
            </aside>
        </main>
    );
};

export default Leave;