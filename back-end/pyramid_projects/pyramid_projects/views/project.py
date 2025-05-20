from pyramid.view import view_config
from pyramid.response import Response
from pyramid.httpexceptions import HTTPNotFound, HTTPUnauthorized
from ..models.project import Project
from datetime import datetime
import uuid

# 🔧 Fungsi bantu: validasi autentikasi
def get_user_id(request):
    user_id = request.authenticated_userid
    if not user_id:
        raise HTTPUnauthorized(json_body={'error': 'Unauthorized'})
    return user_id

# 🔧 Fungsi bantu: ambil project milik user
def get_user_project_or_404(request, project_id):
    user_id = get_user_id(request)
    project = request.dbsession.get(Project, project_id)
    if not project or project.user_id != user_id:
        raise HTTPNotFound(json_body={'error': 'Project not found or forbidden'})
    return project

# 📄 Ambil semua project milik user
@view_config(route_name='projects', request_method='GET', renderer='json')
def list_projects(request):
    user_id = get_user_id(request)
    projects = request.dbsession.query(Project).filter_by(user_id=user_id).all()
    return [p.to_dict() for p in projects]

# 📄 Ambil detail project milik user
@view_config(route_name='project_detail', request_method='GET', renderer='json')
def get_project(request):
    project = get_user_project_or_404(request, request.matchdict['id'])
    return project.to_dict()

# 📄 Tambahkan project baru dan kaitkan dengan user
@view_config(route_name='projects', request_method='POST', renderer='json')
def create_project(request):
    user_id = get_user_id(request)
    data = request.json_body

    try:
        start_date = datetime.strptime(data['start_date'], "%Y-%m-%d").date()
        ends_date = datetime.strptime(data['ends_date'], "%Y-%m-%d").date()
    except (ValueError, KeyError):
        return Response(json_body={'error': 'Invalid or missing date format (YYYY-MM-DD)'}, status=400)

    project = Project(
        id=str(uuid.uuid4()),
        name=data.get('name'),
        description=data.get('description'),
        start_date=start_date,
        ends_date=ends_date,
        status=data.get('status'),
        created_at=datetime.utcnow().date(),
        updated_at=datetime.utcnow().date(),
        user_id=user_id
    )

    request.dbsession.add(project)
    return project.to_dict()

# 📄 Update hanya jika project milik user
@view_config(route_name='project_detail', request_method='PUT', renderer='json')
def update_project(request):
    project = get_user_project_or_404(request, request.matchdict['id'])
    data = request.json_body

    for key, value in data.items():
        if key in ['start_date', 'ends_date']:
            try:
                value = datetime.strptime(value, "%Y-%m-%d").date()
            except ValueError:
                return Response(json_body={'error': f'Invalid date format for {key}'}, status=400)
        setattr(project, key, value)

    project.updated_at = datetime.utcnow().date()
    return project.to_dict()

# 📄 Delete hanya jika project milik user
@view_config(route_name='project_detail', request_method='DELETE', renderer='json')
def delete_project(request):
    project = get_user_project_or_404(request, request.matchdict['id'])
    request.dbsession.delete(project)
    return {'message': 'Project deleted'}
