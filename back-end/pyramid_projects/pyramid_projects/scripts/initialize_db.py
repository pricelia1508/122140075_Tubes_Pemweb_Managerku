import argparse
import sys

from pyramid.paster import bootstrap, setup_logging
from sqlalchemy.exc import OperationalError

from ..models.user import User
from ..models.project import Project
from ..models.task import Task
from datetime import datetime


def setup_models(dbsession):
    """
    Add sample data to the database: users, projects, tasks.
    """
    # ✅ Sample User
    user1 = User(
        id="f9dcb631-31d5-47e7-bab9-55d21314b101",
        username="alice",
        email="alice@example.com",
    )
    user1.set_password("alicepassword")  # ✅ set hashed password

    # ✅ Sample Project (relasi ke user1)
    project1 = Project(
        id="a1c29e7e-5e0e-4f44-84f4-f6c1a1a1c001",
        name="Website Redesign",
        description="Redesign the corporate website",
        start_date=datetime.strptime("2025-01-10", "%Y-%m-%d").date(),
        ends_date=datetime.strptime("2025-03-30", "%Y-%m-%d").date(),
        status="ongoing",
        created_at=datetime.strptime("2025-01-01", "%Y-%m-%d").date(),
        updated_at=datetime.strptime("2025-02-03", "%Y-%m-%d").date(),
        user_id=user1.id  # ✅ relasi ke user
    )

    # ✅ Sample Task (relasi ke project1)
    task1 = Task(
        id="f47ac10b-58cc-4372-a567-0e02b2c3d479",
        name="Create Sitemap",
        description="Plan and create the sitemap for the new website",
        status="completed",
        start_date=datetime.strptime("2025-01-10", "%Y-%m-%d").date(),
        ends_date=datetime.strptime("2025-01-17", "%Y-%m-%d").date(),
        project_id=project1.id,  # ✅ relasi ke project
    )

    # ✅ Tambahkan ke sesi dengan urutan yang benar
    dbsession.add_all([user1, project1, task1])



def parse_args(argv):
    parser = argparse.ArgumentParser()
    parser.add_argument(
        'config_uri',
        help='Configuration file, e.g., development.ini',
    )
    return parser.parse_args(argv[1:])


def main(argv=sys.argv):
    args = parse_args(argv)
    setup_logging(args.config_uri)
    env = bootstrap(args.config_uri)

    try:
        with env['request'].tm:
            dbsession = env['request'].dbsession
            setup_models(dbsession)
            print("✅ Sample data inserted successfully.")
    except OperationalError as err:
        print("❌ OperationalError:", err)
        print('''
Database connection failed. Possible causes:
1. You may need to initialize the tables using alembic.
2. The database server may not be running or misconfigured in development.ini.
        ''')
