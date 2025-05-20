import os
from setuptools import setup, find_packages

here = os.path.abspath(os.path.dirname(__file__))

with open(os.path.join(here, 'README.txt')) as f:
    README = f.read()

with open(os.path.join(here, 'CHANGES.txt')) as f:
    CHANGES = f.read()

# Core dependencies (sesuai tutorial)
core_requires = [
    'pyramid',
    'pyramid_debugtoolbar',
    'pyramid_jinja2',
    'waitress',
    'passlib[bcrypt]'
]

# Tambahan untuk SQLAlchemy, transaksi, dan migrasi
db_requires = [
    'SQLAlchemy',
    'transaction',
    'zope.sqlalchemy',
    'pyramid_tm',
    'alembic',
    'psycopg2-binary',
    'psycopg2'
]

# Optional deployment tools
deploy_requires = [
    'plaster_pastedeploy',
    'pyramid_retry',
]

# Testing dependencies
tests_require = [
    'WebTest >= 1.3.1',
    'pytest >= 3.7.4',
    'pytest-cov',
]

setup(
    name='pyramid_projects',
    version='0.1',
    description='pyramid_projects',
    long_description=README + '\n\n' + CHANGES,
    classifiers=[
        'Programming Language :: Python',
        'Framework :: Pyramid',
        'Topic :: Internet :: WWW/HTTP',
        'Topic :: Internet :: WWW/HTTP :: WSGI :: Application',
    ],
    author='',
    author_email='',
    url='',
    keywords='web pyramid pylons',
    packages=find_packages(),
    include_package_data=True,
    zip_safe=False,
    install_requires=core_requires + db_requires + deploy_requires,
    extras_require={
        'testing': tests_require,
    },
    entry_points={
        'paste.app_factory': [
            'main = pyramid_projects:main',
        ],
        'console_scripts': [
            'initialize_pyramid_projects_db = pyramid_projects.scripts.initialize_db:main',
        ],
    },
)
