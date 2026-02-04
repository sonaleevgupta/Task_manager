from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import auth, tasks

app = FastAPI()

# ✅ CORS CONFIG
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080"],  # frontend URL
    allow_credentials=True,
    allow_methods=["*"],  # GET, POST, PUT, DELETE, OPTIONS
    allow_headers=["*"],
)

# ✅ ROUTERS (THIS WAS THE PROBLEM)
app.include_router(auth.router)
app.include_router(tasks.router)
