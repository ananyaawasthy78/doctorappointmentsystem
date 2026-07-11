# (Database Tables)

from sqlalchemy import Column,Integer,String,Date,Time,ForeignKey
from sqlalchemy.orm import relationship
from db import Base

class User(Base):
    __tablename__="users"

    id=Column(Integer,primary_key=True)
    name=Column(String)
    email=Column(String,unique=True)
    password=Column(String)
    role=Column(String)

    doctor_profile = relationship("Doctor", back_populates="user", uselist=False)

    appointments = relationship("Appointment", back_populates="patient")


class Department(Base):
    __tablename__="departments"

    id=Column(Integer,primary_key=True)
    name=Column(String,unique=True,nullable=False)

    doctors=relationship("Doctor",back_populates="department")

class Doctor(Base):
    __tablename__="doctors"

    id=Column(Integer,primary_key=True)
    user_id=Column(Integer,ForeignKey('users.id'))
    department_id=Column(Integer,ForeignKey('departments.id'))
    available_from=Column(Time)
    available_to=Column(Time)

    user = relationship("User", back_populates="doctor_profile")

    department = relationship("Department", back_populates="doctors")

    appointments = relationship("Appointment", back_populates="doctor")
    
class Appointment(Base):
    __tablename__="appointments"

    id=Column(Integer,primary_key=True)
    patient_id=Column(Integer,ForeignKey('users.id'))
    doctor_id=Column(Integer,ForeignKey('doctors.id'))
    appointment_date=Column(Date)
    appointment_time=Column(Time)
    status=Column(String,default='booked')

    patient = relationship("User", back_populates="appointments")
    
    doctor = relationship("Doctor", back_populates="appointments")