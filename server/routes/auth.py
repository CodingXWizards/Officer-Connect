from fastapi import APIRouter, HTTPException, Response, Request
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from schema import UserSchema, LoginSchema
from models import User
from utils.security import hash_password, create_access_token, verify_password

router = APIRouter()

@router.post("/signin")
async def signin(user: LoginSchema, request: Request, response: Response):
    db: AsyncSession = request.state.db
    
    result = await db.execute(select(User).where(User.email == user.email))
    user_exists = result.scalars().first()

    if user_exists is None:
        raise HTTPException(status_code=404, detail="User not found")
    
    if not verify_password(user.password, user_exists.password):
        raise HTTPException(status_code=400, detail="Incorrect Password")

    try:
        token = create_access_token(user_id=user_exists.id)

        response.set_cookie(key="access_token", value=token, httponly=True, samesite='none', secure=True)

        return {"message": "User Signed in Successfully"}
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=f'An error occured while signing: {e}')


@router.post("/signup")
async def create_user(user: UserSchema, request: Request, response: Response):
    db: AsyncSession = request.state.db
    
    result = await db.execute(select(User).where(User.email == user.email))
    user_exists = result.scalars().first() is not None

    if user_exists:
        raise HTTPException(status_code=400, detail="User already exists")

    try:
        new_user = User(name=user.name,
                        email=user.email,
                        password=hash_password(user.password),
                        phone_number=user.phone_number,
                        designation=user.designation)
        db.add(new_user)

        await db.commit()
        await db.refresh(new_user)

        token = create_access_token(user_id=new_user.id)
        response.set_cookie(key="access_token", value=token, httponly=True, samesite='none', secure=True)
        return {"message": "User Signed up successfully"}
    except Exception as e:
        await db.rollback()
        raise HTTPException(status_code=500, detail=f'An error occurred during user registration: {str(e)}')
    
@router.get("/signout")
async def logout_user(response: Response):
    response.set_cookie(key="access_token", value="", httponly=True, samesite='none', secure=True, expires=0, max_age=0)
    return {"message": "User Signed out successfully"}