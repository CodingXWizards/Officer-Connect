from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

from core.config import settings

engine = create_async_engine(settings.database_url)
async_session = sessionmaker(engine, autocommit=False, autoflush=False, class_=AsyncSession)

async def get_db():
    async with async_session() as session:
        yield session
    
Base = declarative_base()