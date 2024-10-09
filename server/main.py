import logging

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from middleware.db_session_middleware import DBSessionMiddleware
from db.session import engine, Base
from routes import router

logging.basicConfig(level=logging.INFO, format='%(levelprefix)s: \t %(message)s')
logger = logging.getLogger('uvicorn')

@asynccontextmanager
async def lifespan(fastapi: FastAPI):
    logger.info("Connecting to PostgreSQL")
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
        logger.info("Connected to PostgreSQL")
    yield

app = FastAPI(lifespan=lifespan)

origins = [
    "http://localhost:5173",
    "https://codingxwizard.tech"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_middleware(DBSessionMiddleware)
app.include_router(router, prefix='/api')

if __name__ == '__main__':
    import uvicorn

    uvicorn.run('main:app', host='0.0.0.0')