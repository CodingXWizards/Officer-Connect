from uuid import uuid4
from sqlalchemy import Column, String, Enum, UUID
from sqlalchemy.ext.hybrid import hybrid_property

from db.session import Base
from schema import DesignationType

class User(Base):
    __tablename__ = 'users'

    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid4)
    name = Column(String)
    email = Column(String, unique=True, index=True)
    designation = Column(Enum(DesignationType))
    password = Column(String)
    phone_number = Column(String, unique=True, index=True)

    @hybrid_property
    def public_data(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "designation": self.designation,
            "phone_number": self.phone_number
        }