from uuid import UUID
from pydantic import BaseModel
from datetime import date

from .user import DesignationType
from .application import StatusType

class User(BaseModel):
    application_id: UUID
    approver_id: UUID
    approver_designation: DesignationType
    status: StatusType
    remark: str
    approved_at: date

    class Config:
        from_attributes = True