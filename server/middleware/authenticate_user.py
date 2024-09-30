from fastapi import HTTPException, Request

from utils.security import verify_token

async def authenticate_user(request: Request):
    token = request.cookies.get('access_token')
    if(token is None):
        raise HTTPException(status_code=403, detail="Unauthorized")
    
    user_id = verify_token(token)
    request.state.user_id = user_id