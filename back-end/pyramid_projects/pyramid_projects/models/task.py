from sqlalchemy import Column, String, Date, ForeignKey
from sqlalchemy.orm import relationship
from .meta import Base

class Task(Base):
    __tablename__ = 'tasks'

    id = Column(String, primary_key=True)
    name = Column(String, nullable=False)
    description = Column(String, nullable=False)
    status = Column(String, nullable=False)
    start_date = Column(Date, nullable=False)
    ends_date = Column(Date, nullable=False)

    project_id = Column(String, ForeignKey('projects.id'), nullable=False)
    project = relationship("Project", backref="tasks")
    
    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "status": self.status,
            "start_date": str(self.start_date),
            "ends_date": str(self.ends_date),
            "project_id": self.project_id,
        }

    def __repr__(self):
        return f"<Task(name='{self.name}', status='{self.status}')>"
