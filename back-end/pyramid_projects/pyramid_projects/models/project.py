# models/project.py
from sqlalchemy import Column, String, Date, ForeignKey
from sqlalchemy.orm import relationship
from .meta import Base

class Project(Base):
    __tablename__ = 'projects'

    id = Column(String, primary_key=True)
    name = Column(String, nullable=False)
    description = Column(String, nullable=False)
    start_date = Column(Date, nullable=False)
    ends_date = Column(Date, nullable=False)
    status = Column(String, nullable=False)
    created_at = Column(Date, nullable=False)
    updated_at = Column(Date, nullable=False)

    # ✅ Foreign Key & Relationship
    user_id = Column(String, ForeignKey('users.id'), nullable=False)
    user = relationship("User", backref="projects")

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "start_date": str(self.start_date),
            "ends_date": str(self.ends_date),
            "status": self.status,
            "created_at": str(self.created_at),
            "updated_at": str(self.updated_at),
            "user_id": self.user_id,
        }

    def __repr__(self):
        return f"<Project(name='{self.name}', user_id='{self.user_id}')>"
