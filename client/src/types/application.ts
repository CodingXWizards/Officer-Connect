export enum Status{
    PENDING = 'PENDING',
    REJECTED = 'REJECTED',
    APPROVED = 'APPROVED'
};

export enum LeaveType{
    CL = 'CL',
    SPL = 'SPL',
    BTR = 'BTR',
    EL = 'EL'
};

export interface Application{
    id: string;
    applicantId: string;
    leaveType: LeaveType;
    reason: string;
    startDate: Date;
    endDate: Date;
    status: Status;
};