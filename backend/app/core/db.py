from app.core.settings import settings

from sqlalchemy import select
from sqlalchemy.orm import Session
from sqlalchemy.engine import create_engine

from app.models.users import User
from app.schemas.users import UserCreate
from app.crud import users
from app.core.security import get_password_hash

engine = create_engine(str(settings.SQLALCHEMY_DATABASE_URI))

def init_db(db: Session) -> None:
    user = db.execute(
        select(User).where(User.username==settings.FIRST_SUPERUSER)
    ).first()
    if not user:
        # Use the password from settings, or a default if it's too short for the schema
        plain_password = settings.FIRST_SUPERUSER_PASSWORD
        if not plain_password or len(plain_password) < 8:
            plain_password = "admin123"
            
        user_in = UserCreate(
            username=settings.FIRST_SUPERUSER,
            password=plain_password,
            is_superuser=True
        )
        user = users.create_user(db=db, user_data=user_in)