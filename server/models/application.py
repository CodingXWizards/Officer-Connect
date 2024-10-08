from uuid import uuid4
from sqlalchemy import Column, String, Enum, UUID, ForeignKey, Date
from sqlalchemy.orm import relationship
from sqlalchemy.ext.hybrid import hybrid_property

from db.session import Base
from schema import LeaveType, StatusType

class Application(Base):
    __tablename__ = 'application'

    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid4)
    applicant_id = Column(UUID(as_uuid=True), ForeignKey("user.id"))
    leave_type = Column(Enum(LeaveType))
    start_date = Column(Date)
    end_date = Column(Date)
    reason = Column(String)
    status = Column(Enum(StatusType))

    # Relationship with the Applicant (User)
    user = relationship('User', back_populates='applications', lazy='select')

    # Relationship with Approvals
    approvals = relationship('Approval', back_populates='application', lazy='select')

    @hybrid_property
    def public_data(self):
        return {
            "id": self.id,
            "applicantId": self.applicant_id,
            "leaveType": self.leave_type,
            "startDate": self.start_date,
            "endDate": self.end_date,
            "reason": self.reason,
            "status": self.status
        }