from fastapi import APIRouter, Request, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from models import Application
from schema import CreateApplication, StatusType

router = APIRouter()

@router.get('/all')
async def get_all_application(request: Request):
    db: AsyncSession = request.state.db

    result = await db.execute(select(Application))
    applications = result.scalars().all()

    if(applications is None):
        raise HTTPException(status_code=404, detail="No application found")

    return [application.public_data for application in applications]


@router.get('/{id}')
async def get_application(request: Request, id: str):
    db: AsyncSession = request.state.db
    user_id = request.state.user_id

    result = await db.execute(select(Application).where(Application.id == id))
    application = result.scalars().first()

    if(application is None):
        raise HTTPException(status_code=404, detail="No application found")

    return application.public_data


@router.post('/')
async def create_application(data: CreateApplication, request: Request):
    db: AsyncSession = request.state.db
    user_id = request.state.user_id

    new_application = Application(
        applicant_id = user_id,
        leave_type = data.leave_type,
        start_date = data.start_date,
        end_date = data.end_date,
        reason = data.reason,
        status = StatusType.PENDING
    )

    db.add(new_application)

    await db.commit()
    await db.refresh(new_application)

    return new_application.public_data
    
    