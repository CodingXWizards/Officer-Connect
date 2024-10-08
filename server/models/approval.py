from uuid import uuid4
from sqlalchemy import Column, String, Enum, UUID, ForeignKey, Date
from sqlalchemy.orm import relationship
from sqlalchemy.ext.hybrid import hybrid_property

from db.session import Base
from schema import DesignationType, StatusType

class Approval(Base):
    __tablename__ = 'approval'

    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid4)
    application_id = Column(UUID(as_uuid=True), ForeignKey("application.id"))
    approver_id = Column(UUID(as_uuid=True), ForeignKey("user.id"))
    approver_designation = Column(Enum(DesignationType))
    status = Column(Enum(StatusType))
    remark = Column(String)
    approved_at = Column(Date)

    # Relationship to the Approver (User)
    user = relationship('User', back_populates='approvals', lazy='select')

    # Relationship to the Application
    application = relationship('Application', back_populates='approvals', lazy='select')

    @hybrid_property
    def public_data(self):
        return {
            "id": self.id,
            "applicationId": self.application_id,
            "approverId": self.approver_id,
            "approverDesignation": self.approver_designation,
            "status": self.status,
            "remark": self.remark,
            "approved_at": self.approved_at
        }