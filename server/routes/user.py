from fastapi import APIRouter, HTTPException, Response, Request
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from models import User

router = APIRouter()

@router.get('/')
async def get_user(request: Request):
    db: AsyncSession = request.state.db
    user_id = request.state.user_id

    result =  await db.execute(select(User).where(User.id == user_id))
    user = result.scalars().first()

    if(user is None):
       raise HTTPException(status_code=404, detail="User not found")

    return user.public_data