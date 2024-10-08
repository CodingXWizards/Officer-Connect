from uuid import UUID
from pydantic import BaseModel, EmailStr
from datetime import date

from enum import Enum

class StatusType(Enum):
    PENDING = 'PENDING'
    APPROVED = 'APPROVED'
    REJECTED = 'REJECTED'

class LeaveType(Enum):
    CL = 'CL'
    SPL = 'SPL'
    BTR = 'BTR'
    EL = 'EL'

class CreateApplication(BaseModel):
    leave_type: LeaveType
    start_date: date
    end_date: date
    reason: str

    class Config:
        from_attributes = True