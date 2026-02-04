from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app import models, schemas

from app.dependencies import get_current_user


router = APIRouter(
    prefix="/api/v1/tasks",
    tags=["Tasks"]
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Create Task
@router.post("", response_model=schemas.TaskResponseSchema)
def create_task(
    data: schemas.TaskCreateSchema,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    task = models.Task(
        title=data.title,
        owner_id=current_user.id
    )
    db.add(task)
    db.commit()
    db.refresh(task)
    return task


# Get All Tasks (for logged-in user)
@router.get("", response_model=list[schemas.TaskResponseSchema])
def get_tasks(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    return db.query(models.Task).filter(
        models.Task.owner_id == current_user.id
    ).all()


# Update Task
@router.put("/{task_id}", response_model=schemas.TaskResponseSchema)
def update_task(
    task_id: int,
    data: schemas.TaskCreateSchema,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    task = db.query(models.Task).filter(
        models.Task.id == task_id,
        models.Task.owner_id == current_user.id
    ).first()

    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    task.title = data.title
    db.commit()
    db.refresh(task)
    return task


# Delete Task
@router.delete("/{task_id}")
def delete_task(
    task_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    task = db.query(models.Task).filter(
        models.Task.id == task_id,
        models.Task.owner_id == current_user.id
    ).first()

    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    db.delete(task)
    db.commit()
    return {"message": "Task deleted"}
