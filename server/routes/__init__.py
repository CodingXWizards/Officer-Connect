from fastapi import APIRouter, Depends

from .auth import router as auth_router
from .user import router as user_router
from .application import router as application_router

from middleware.authenticate_user import authenticate_user

router = APIRouter()

router.include_router(auth_router, prefix='/auth')
router.include_router(user_router, prefix='/user', dependencies=[Depends(authenticate_user)])
router.include_router(application_router, prefix='/application', dependencies=[Depends(authenticate_user)])