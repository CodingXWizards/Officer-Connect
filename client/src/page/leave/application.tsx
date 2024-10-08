import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useLoading } from "@/hook/useLoading";
import { fetchData } from "@/utils/fetch-data";
import { formatDate } from "@/utils/date";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Dropdown, DropdownContent, DropdownItem, DropdownTrigger } from "@/components/dropdown";
import { AlertType, useAlert } from "@/components/alerts";

const LeaveApplication = () => {
    const [reason, setReason] = useState<string>("");
    const [startDate, setStartDate] = useState<string>(formatDate(0));
    const [endDate, setEndDate] = useState<string>(formatDate(7));
    const [leaveType, setLeaveType] = useState<string>('Type of Leave');

    const { loading, error, withLoading } = useLoading();

    const { showAlert } = useAlert();
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response = await withLoading<string>(() => fetchData<string>("/api/application", {
            method: 'POST',
            headers: { "Content-Type": 'application/json' },
            body: JSON.stringify({
                leave_type: leaveType,
                start_date: startDate,
                end_date: endDate,
                reason,
            })
        }));

        if (response.error) {
            console.log(error);
            showAlert("Something went wrong", AlertType.ERROR);
            return;
        }

        showAlert("Sent the application successfully!", AlertType.SUCCESS);
        navigate('/leave');

    }

    const handleReset = () => {
        setReason("");
        setStartDate(formatDate(0));
        setEndDate(formatDate(7));
        setLeaveType("Type of Leave");
    }

    return (
        <main>
            <form onSubmit={handleSubmit} onReset={handleReset} className="flex flex-col gap-y-4 w-1/2">
                <h3>Leave Application</h3>
                <div className="flex flex-col gap-y-1">
                    <label htmlFor="reason" className="font-medium text-lg">Reason for leave</label>
                    <textarea name="reason" id="reason" value={reason} onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setReason(e.target.value)} className="border border-gray-400 outline-none rounded-lg min-h-40 max-h-60 p-2" placeholder="I want leave for..." />
                </div>
                <div className="flex gap-x-4">
                    <Input id="start-date" label="Start Date" value={startDate} setValue={setStartDate} type="date" />
                    <Input id="end-date" label="End Date" value={endDate} setValue={setEndDate} type="date" />
                    <Dropdown>
                        <DropdownTrigger className="min-w-36 flex justify-center h-full rounded-xl bg-blue-600 text-white px-4">{leaveType}</DropdownTrigger>
                        <DropdownContent className="w-fit left-0">
                            <DropdownItem active={leaveType === 'Type of Leave'} onClick={() => setLeaveType('Type of Leave')}>Type of Leave</DropdownItem>
                            <DropdownItem active={leaveType === 'CL'} onClick={() => setLeaveType('CL')}>CL</DropdownItem>
                            <DropdownItem active={leaveType === 'SPL'} onClick={() => setLeaveType('SPL')}>SPL</DropdownItem>
                            <DropdownItem active={leaveType === 'BTR'} onClick={() => setLeaveType('BTR')}>BTR</DropdownItem>
                            <DropdownItem active={leaveType === 'EL'} onClick={() => setLeaveType('EL')}>EL</DropdownItem>
                        </DropdownContent>
                    </Dropdown>
                </div>
                <div className="flex gap-x-4">
                    <Button isLoading={loading} variant='primary' type="submit" className="rounded-xl">Apply</Button>
                    <Button variant='danger' type="reset" className="rounded-xl">Reset</Button>
                </div>
            </form>
        </main>
    );
};

export default LeaveApplication;