import { Button } from "@/components/button";
import { Dropdown, DropdownContent, DropdownItem, DropdownTrigger } from "@/components/dropdown";
import { Input } from "@/components/input";
import { cn } from "@/lib/utils";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

const Leave = () => {

    const formatDate = (days: number) => {
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + days);

        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    };

    const [reason, setReason] = useState<string>("");
    const [startDate, setStartDate] = useState<string>(formatDate(0));
    const [endDate, setEndDate] = useState<string>(formatDate(7));
    const [leaveType, setLeaveType] = useState<string>('Type of Leave');

    useEffect(() => {
        console.log(startDate)
    }, [startDate]);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }
    const handleReset = () => {

    }

    return (
        <main>
            <form onSubmit={handleSubmit} onReset={() => handleReset} className="flex flex-col gap-y-4 w-1/2">
                <h3>Leave Application</h3>
                <div className="flex flex-col gap-y-1">
                    <label htmlFor="reason" className="font-medium text-lg">Reason for leave</label>
                    <textarea name="reason" id="reason" value={reason} onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setReason(e.target.value)} className="border border-gray-400 outline-none rounded-lg min-h-40 max-h-60 p-2" placeholder="I want leave for..."/>
                </div>
                <div className="flex gap-x-4">
                    <Input id="start-date" label="Start Date" value={startDate} setValue={setStartDate} type="date" />
                    <Input id="end-date" label="End Date" value={endDate} setValue={setEndDate} type="date" />
                    <Dropdown>
                        <DropdownTrigger className="min-w-36 flex justify-center h-full rounded-xl bg-blue-600 text-white px-4">{leaveType}</DropdownTrigger>
                        <DropdownContent className="w-fit left-0">
                            <DropdownItem className={cn(leaveType === 'Type of Leave' && 'bg-blue-100 hover:bg-blue-100 text-blue-700')} onClick={() => setLeaveType('Type of Leave')}>Type of Leave</DropdownItem>
                            <DropdownItem className={cn(leaveType === 'CL' && 'bg-blue-100 hover:bg-blue-100 text-blue-700')} onClick={() => setLeaveType('CL')}>CL</DropdownItem>
                            <DropdownItem className={cn(leaveType === 'SPL' && 'bg-blue-100 hover:bg-blue-100 text-blue-700')} onClick={() => setLeaveType('SPL')}>SPL</DropdownItem>
                            <DropdownItem className={cn(leaveType === 'BTR' && 'bg-blue-100 hover:bg-blue-100 text-blue-700')} onClick={() => setLeaveType('BTR')}>BTR</DropdownItem>
                            <DropdownItem className={cn(leaveType === 'EL' && 'bg-blue-100 hover:bg-blue-100 text-blue-700')} onClick={() => setLeaveType('EL')}>EL</DropdownItem>
                        </DropdownContent>
                    </Dropdown>
                </div>
                <div className="flex gap-x-4">
                    <Button variant='primary' type="submit" className="rounded-xl">Apply</Button>
                    <Button variant='danger' type="reset" className="rounded-xl">Reset</Button>
                </div>
            </form>
        </main>
    );
};

export default Leave