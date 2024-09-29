from starlette.middleware.base import BaseHTTPMiddleware
from fastapi import Request
from db.session import async_session

# Middleware to attach db session to the request
class DBSessionMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        # Create a database session for the request
        async with async_session() as session:
            # Attach the session to the request state
            request.state.db = session
            # Continue to process the request
            response = await call_next(request)
            # Return the response after the request is processed
            return response
