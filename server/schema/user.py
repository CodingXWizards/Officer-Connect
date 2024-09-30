from pydantic import BaseModel, EmailStr

from enum import Enum

class DesignationType(Enum):
    SP = "SP"
    ADDITIONAL_SP = "ADDITIONAL_SP"
    DSP = "DSP"
    TI = "TI"

class User(BaseModel):
    name: str
    password: str
    email: EmailStr
    phone_number: str
    designation: str

    class Config:
        from_attributes = True

class Login(BaseModel):
    email: EmailStr
    password: str