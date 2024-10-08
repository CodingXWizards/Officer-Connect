export enum DesignationType {
    SP = 'SP',
    ADDITIONAL_SP = 'ADDITIONAL_SP',
    DSP = 'DSP',
    TI = 'TI'
};

export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    phoneNumber: string;
    designation: DesignationType
};
