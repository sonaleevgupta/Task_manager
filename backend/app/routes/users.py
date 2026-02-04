from fastapi import APIRouter, Depends
from app.dependencies import get_current_user
from app import models

router = APIRouter(
    prefix="/api/v1",
    tags=["User"]
)

@router.get("/me")
def get_profile(current_user: models.User = Depends(get_current_user)):
    return {
        "id": current_user.id,
        "name": current_user.name,
        "email": current_user.email
    }
