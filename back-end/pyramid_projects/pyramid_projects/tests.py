import unittest
import transaction
from datetime import date
from uuid import uuid4

from pyramid import testing
from pyramid.response import Response
from .models import (
    get_engine,
    get_session_factory,
    get_tm_session,
    User,
    Project,
    Task
)


class BaseTest(unittest.TestCase):
    def setUp(self):
        self.config = testing.setUp(settings={
            'sqlalchemy.url': 'sqlite:///:memory:'
        })
        self.config.include('pyramid_projects.models')
        settings = self.config.get_settings()
        self.engine = get_engine(settings)
        session_factory = get_session_factory(self.engine)
        self.session = get_tm_session(session_factory, transaction.manager)

        from .models.meta import Base
        Base.metadata.create_all(self.engine)

    def tearDown(self):
        from .models.meta import Base
        transaction.abort()
        testing.tearDown()
        Base.metadata.drop_all(self.engine)


# --------------------- USER MODEL ----------------------

class TestUserModel(BaseTest):
    def test_user_password_check(self):
        user = User(id=str(uuid4()), username="test", email="test@example.com")
        user.set_password("secret")
        self.assertTrue(user.check_password("secret"))
        self.assertFalse(user.check_password("wrong"))

    def test_user_repr_and_dict(self):
        user = User(id="u1", username="john", email="john@doe.com")
        user.set_password("pwd123")
        user_dict = user.to_dict()
        self.assertIn("john", repr(user))
        self.assertEqual(user_dict["username"], "john")
        self.assertEqual(user_dict["email"], "john@doe.com")
        self.assertTrue("password" in user_dict)


# --------------------- PROJECT MODEL ----------------------

class TestProjectModel(BaseTest):
    def test_project_to_dict_and_repr(self):
        project = Project(
            id=str(uuid4()),
            name="Test Project",
            description="A project",
            start_date=date.today(),
            ends_date=date.today(),
            status="planning",
            created_at=date.today(),
            updated_at=date.today(),
            user_id="user-id"
        )
        data = project.to_dict()
        self.assertEqual(data["status"], "planning")
        self.assertIn("Test Project", repr(project))
        self.assertEqual(data["user_id"], "user-id")


# --------------------- TASK MODEL ----------------------

class TestTaskModel(BaseTest):
    def test_task_repr_and_dict(self):
        task = Task(
            id=str(uuid4()),
            name="Sample Task",
            description="desc",
            status="todo",
            start_date=date.today(),
            ends_date=date.today(),
            project_id="proj-1"
        )
        data = task.to_dict()
        self.assertEqual(data["status"], "todo")
        self.assertIn("Sample Task", repr(task))
        self.assertEqual(data["project_id"], "proj-1")


# --------------------- PROJECT VIEWS ----------------------

class TestProjectViews(BaseTest):
    def setUp(self):
        super().setUp()
        self.user = User(id="user-1", username="test", email="test@example.com")
        self.user.set_password("password")
        self.session.add(self.user)
        self.project_id = str(uuid4())
        self.project = Project(
            id=self.project_id,
            name="P1",
            description="desc",
            start_date=date.today(),
            ends_date=date.today(),
            status="planning",
            created_at=date.today(),
            updated_at=date.today(),
            user_id=self.user.id
        )
        self.session.add(self.project)
        self.session.flush()

    def dummy_request(self, user_id=None, json_body=None, matchdict=None):
        return testing.DummyRequest(
            dbsession=self.session,
            authenticated_userid=user_id,
            json_body=json_body or {},
            matchdict=matchdict or {"id": self.project_id}
        )

    def test_get_project_authorized(self):
        from .views.project import get_project
        request = self.dummy_request(user_id=self.user.id)
        response = get_project(request)
        self.assertEqual(response["id"], self.project_id)
        self.assertEqual(response["name"], "P1")

    def test_get_project_unauthorized(self):
        from .views.project import get_project
        request = self.dummy_request(user_id="wrong-user")
        response = get_project(request)
        self.assertIsInstance(response, Response)
        self.assertEqual(response.status_code, 404)

    def test_list_projects(self):
        from .views.project import list_projects
        request = self.dummy_request(user_id=self.user.id)
        response = list_projects(request)
        self.assertEqual(len(response), 1)
        self.assertEqual(response[0]["id"], self.project.id)

    def test_create_project_and_update(self):
        from .views.project import create_project, update_project
        create_data = {
            "name": "New Project",
            "description": "Created by test",
            "start_date": str(date.today()),
            "ends_date": str(date.today()),
            "status": "planning"
        }
        request = self.dummy_request(user_id=self.user.id, json_body=create_data)
        created = create_project(request)
        self.assertEqual(created["name"], "New Project")

        update_data = {"name": "Updated Project"}
        request = self.dummy_request(user_id=self.user.id, json_body=update_data, matchdict={"id": created["id"]})
        updated = update_project(request)
        self.assertEqual(updated["name"], "Updated Project")

    def test_delete_project_forbidden(self):
        from .views.project import delete_project
        request = self.dummy_request(user_id="not-owner", matchdict={"id": self.project.id})
        response = delete_project(request)
        self.assertIsInstance(response, Response)
        self.assertEqual(response.status_code, 404)
        
    def test_create_project_invalid_date(self):
        from .views.project import create_project
        request = self.dummy_request(
            user_id=self.user.id,
            json_body={
                "name": "Invalid Project",
                "description": "Test",
                "start_date": "invalid",
                "ends_date": "2024-01-01",
                "status": "planning"
            }
        )
        response = create_project(request)
        self.assertEqual(response.status_code, 400)



# --------------------- TASK VIEWS ----------------------

class TestTaskViews(BaseTest):
    def test_create_task_view(self):
        from .views.task import create_task
        payload = {
            "name": "New Task",
            "description": "Details",
            "status": "todo",
            "start_date": str(date.today()),
            "ends_date": str(date.today()),
            "project_id": "proj-123"
        }
        request = testing.DummyRequest(json_body=payload, dbsession=self.session)
        response = create_task(request)
        self.assertEqual(response["name"], "New Task")
        self.assertEqual(response["status"], "todo")

    def test_list_tasks_and_get(self):
        from .views.task import list_tasks, get_task
        task = Task(
            id="task1",
            name="Task 1",
            description="desc",
            status="todo",
            start_date=date.today(),
            ends_date=date.today(),
            project_id="proj1"
        )
        self.session.add(task)
        self.session.flush()

        request = testing.DummyRequest(dbsession=self.session)
        tasks = list_tasks(request)
        self.assertTrue(any(t["id"] == "task1" for t in tasks))

        request.matchdict = {"id": "task1"}
        found = get_task(request)
        self.assertEqual(found["name"], "Task 1")

    def test_update_and_delete_task(self):
        from .views.task import update_task, delete_task
        task = Task(
            id="task2",
            name="Old",
            description="desc",
            status="todo",
            start_date=date.today(),
            ends_date=date.today(),
            project_id="proj1"
        )
        self.session.add(task)
        self.session.flush()

        update_payload = {"name": "Updated"}
        request = testing.DummyRequest(
            json_body=update_payload,
            dbsession=self.session,
            matchdict={"id": "task2"}
        )
        updated = update_task(request)
        self.assertEqual(updated["name"], "Updated")

        delete_req = testing.DummyRequest(
            dbsession=self.session,
            matchdict={"id": "task2"}
        )
        deleted = delete_task(delete_req)
        self.assertEqual(deleted["message"], "Task deleted")
    
    def test_get_task_not_found(self):
        from .views.task import get_task
        request = testing.DummyRequest(dbsession=self.session, matchdict={"id": "nonexistent"})
        response = get_task(request)
        self.assertEqual(response.status_code, 404)

    def test_update_task_invalid_date(self):
        from .views.task import update_task
        task = Task(
            id="task3",
            name="T",
            description="desc",
            status="todo",
            start_date=date.today(),
            ends_date=date.today(),
            project_id="p1"
        )
        self.session.add(task)
        self.session.flush()

        request = testing.DummyRequest(
            dbsession=self.session,
            matchdict={"id": "task3"},
            json_body={"start_date": "invalid-date"}
        )
        response = update_task(request)
        self.assertEqual(response.status_code, 400)
        
    def test_get_project_unauthenticated(self):
        from .views.project import list_projects
        request = self.dummy_request(user_id=None)
        response = list_projects(request)
        self.assertEqual(response.status_code, 401)


class TestAuthViews(BaseTest):
    def test_register_success(self):
        from .views.auth import register
        request = testing.DummyRequest(
            json_body={
                "username": "user1",
                "email": "user1@example.com",
                "password": "secret"
            },
            dbsession=self.session
        )
        result = register(request)
        self.assertEqual(result["message"], "Registration successful")

    def test_register_duplicate_email(self):
        from .views.auth import register
        user = User(id="u1", username="exist", email="exist@example.com")
        user.set_password("123")
        self.session.add(user)
        self.session.flush()

        request = testing.DummyRequest(
            json_body={
                "username": "exist",
                "email": "exist@example.com",
                "password": "secret"
            },
            dbsession=self.session
        )
        result = register(request)
        self.assertEqual(result.status_code, 409)

    def test_login_success(self):
        from .views.auth import login
        user = User(id="u2", username="login", email="log@example.com")
        user.set_password("password")
        self.session.add(user)
        self.session.flush()

        request = testing.DummyRequest(
            json_body={
                "email": "log@example.com",
                "password": "password"
            },
            dbsession=self.session
        )
        response = login(request)
        self.assertEqual(response.json_body["message"], "Login successful")

    def test_login_invalid(self):
        from .views.auth import login
        request = testing.DummyRequest(
            json_body={"email": "wrong@example.com", "password": "wrong"},
            dbsession=self.session
        )
        response = login(request)
        self.assertEqual(response.status_code, 401)

    def test_logout(self):
        from .views.auth import logout
        request = testing.DummyRequest()
        result = logout(request)
        self.assertEqual(result.json_body["message"], "Logout successful")


if __name__ == "__main__":
    unittest.main()
