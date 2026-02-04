from pydantic import BaseModel, EmailStr

class SignupSchema(BaseModel):
    name: str
    email: EmailStr
    password: str

class LoginSchema(BaseModel):
    email: EmailStr
    password: str

class TaskCreateSchema(BaseModel):
    title: str

class TaskResponseSchema(BaseModel):
    id: int
    title: str

    class Config:
        from_attributes = True

