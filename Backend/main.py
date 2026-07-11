from fastapi import HTTPException,FastAPI,Depends
from db import get_db,create_tables
from sqlalchemy.orm import Session
from models import Doctor,Appointment,User,Department
from schemas import DoctorCreate,AppointmentCreate,UserCreate,DepartmentOut,DepartmentCreate
import hashlib
from auth import get_current_user,create_access_token

app=FastAPI()
create_tables()

@app.post('/doctors')
def add_doctor(data:DoctorCreate,user=Depends(get_current_user),db:Session=Depends(get_db)):

    existing=db.query(Doctor).filter(
        Doctor.user_id==user["user_id"]
    ).first()

    if existing:
        raise HTTPException(status_code=404,detail="Doctor profile already exists.")

    doc=Doctor(
        user_id=user["user_id"],
        department_id=data.department_id,
        available_from=data.available_from,
        available_to=data.available_to
    )
    db.add(doc)
    db.commit()
    return {"message":"Doctor profile created."}

@app.get('/doctors')
def get_doctors(db:Session=Depends(get_db)):
    doctors= db.query(Doctor).join(User).join(Department).all()
    return [
        {
            "id": d.id,
            "name": d.user.name,
            "department":d.department.name,
            "available_from": d.available_from,
            "available_to": d.available_to,
        }
        for d in doctors
    ]

@app.post('/appointments')
def book_appointments(data:AppointmentCreate,user=Depends(get_current_user),db:Session=Depends(get_db)):

    doc=db.query(Doctor).filter(Doctor.id==data.doctor_id).first()
    if not doc:
        raise HTTPException(status_code=404,detail="Doctor not found.")
    if not(doc.available_from<=data.appointment_time<=doc.available_to):
        raise HTTPException(status_code=404,detail=f"Doctor available only between {doc.available_from} and {doc.available_to}")

    conflict=db.query(Appointment).filter(
        Appointment.doctor_id==data.doctor_id,
        Appointment.appointment_date==data.appointment_date,
        Appointment.appointment_time==data.appointment_time
    ).first()

    if conflict:
        raise HTTPException(status_code=400,detail='Slot already booked')
    
    appointment=Appointment(
        patient_id=user["user_id"],
        doctor_id=data.doctor_id,
        appointment_date=data.appointment_date,
        appointment_time=data.appointment_time
    )
    db.add(appointment)
    db.commit()
    return {"message":"Appointment Booked."}

def hash_password(password:str):
    return hashlib.sha256(password.encode()).hexdigest()

@app.post('/register')
def register(user:UserCreate,db:Session=Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    new_user=User(
        name=user.name,
        email=user.email,
        password=hash_password(user.password),
        role=user.role
    )
    db.add(new_user)
    try:
        db.commit()
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail="Registration failed")
        
    db.refresh(new_user)
    return {'message':'User registered'}

from fastapi.security import OAuth2PasswordRequestForm

@app.post('/login')
def login(form_data: OAuth2PasswordRequestForm = Depends(),db:Session=Depends(get_db)):
    db_user=db.query(User).filter(User.email==form_data.username).first()
    if not db_user or db_user.password!=hash_password(form_data.password):
        raise HTTPException(status_code=401,detail='Invalid credentials')
    
    access_token = create_access_token({
        "user_id": db_user.id,
        "role": db_user.role
    })

    return {"access_token": access_token,"token_type": "bearer"}

from sqlalchemy.exc import IntegrityError

@app.post("/departments")
def create_department(data: DepartmentCreate, db: Session = Depends(get_db)):
    department = Department(name=data.name)

    db.add(department)
    try:
        db.commit()
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=400, detail="Department already exists")

    db.refresh(department)
    return department


@app.get('/departments',response_model=list[DepartmentOut])
def get_departments(db:Session=Depends(get_db)):
    return db.query(Department).all()

@app.get('/appointments')
def my_appointments(user=Depends(get_current_user),db:Session=Depends(get_db)):
    appointments=(
        db.query(Appointment)
            .filter(Appointment.patient_id==user["user_id"])
            .all()
    )
    return[
        {
            "id": appt.id,
            "doctor_name": appt.doctor.user.name,
            "appointment_date": appt.appointment_date,
            "appointment_time": appt.appointment_time,
            "status": appt.status
        }
        for appt in appointments
    ]

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5174", "http://localhost:5175"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
