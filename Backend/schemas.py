# (VALIDATION & DATA SHAPE)

from pydantic import BaseModel,field_validator
from datetime import date,time
import re
from typing import Optional

class UserCreate(BaseModel):
    name:str 
    email:str 
    password:str 
    role:str 

class UserLogin(BaseModel):
    email:str  
    password:str 
    
class DoctorCreate(BaseModel):
    department_id:int  
    available_from:time 
    available_to:time 

    @field_validator('available_from','available_to',mode='before')
    @classmethod
    def parse_time(cls,val):
        if isinstance(val,time):
            return val
        if isinstance(val,str):
            h,m=map(int,val.split(":"))
            return time(hour=h,minute=m)
        return val
    
class DoctorOut(BaseModel):
    id:int 
    name: str
    specialization: str
    available_from: time
    available_to: time

    class Config:
        from_attributes = True

class DepartmentCreate(BaseModel):
    name:str 

class DepartmentOut(BaseModel):
    id:int 
    name:str 
    
    class Config:
        from_attributes=True

class AppointmentCreate(BaseModel):
    doctor_id:int 
    appointment_date:date 
    appointment_time:time 
    patient_id:Optional[int] =None

    @field_validator('appointment_time',mode='before')
    @classmethod
    def parse_time(cls, val):
        if isinstance(val, time):
            return val

        if isinstance(val, str):
            val = val.strip()

            # HH:MM
            if re.fullmatch(r"\d{2}:\d{2}", val):
                h, m = map(int, val.split(":"))
                return time(hour=h, minute=m)

            # HH:MM:SS(.sss)Z
            match = re.fullmatch(
                r"(?P<h>\d{2}):(?P<m>\d{2}):\d{2}(\.\d+)?Z?", val
            )
            if match:
                return time(
                    hour=int(match.group("h")),
                    minute=int(match.group("m"))
                )

        raise ValueError("Time must be in HH:MM format")
    
