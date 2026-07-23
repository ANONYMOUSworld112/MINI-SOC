from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models.user import User
from app.schemas.auth import UserCreate, UserLogin, Token
from app.core.security import verify_password, get_password_hash, create_access_token, create_refresh_token
from app.core.exceptions import UnauthorizedException, BadRequestException

class AuthService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def authenticate_user(self, data: UserLogin) -> Token:
        result = await self.db.execute(select(User).where(User.email == data.email))
        user = result.scalars().first()
        
        if not user or not verify_password(data.password, user.hashed_password):
            raise UnauthorizedException("Incorrect email or password")
            
        access_token = create_access_token(subject=user.id)
        refresh_token = create_refresh_token(subject=user.id)
        
        return Token(access_token=access_token, refresh_token=refresh_token, token_type="bearer")

    async def register_user(self, data: UserCreate) -> User:
        result = await self.db.execute(select(User).where(User.email == data.email))
        if result.scalars().first():
            raise BadRequestException("Email already registered")
            
        hashed_password = get_password_hash(data.password)
        user = User(
            email=data.email,
            hashed_password=hashed_password,
            full_name=data.full_name,
            role=data.role
        )
        self.db.add(user)
        await self.db.commit()
        await self.db.refresh(user)
        return user
