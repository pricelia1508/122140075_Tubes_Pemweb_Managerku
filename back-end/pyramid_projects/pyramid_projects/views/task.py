from pyramid.view import view_config
from pyramid.response import Response
from pyramid.httpexceptions import HTTPNotFound, HTTPBadRequest
from ..models.task import Task
from datetime import datetime
import uuid

# 🔧 Helper: validasi & parsing tanggal
def parse_date(value, field):
    try:
        return datetime.strptime(value, "%Y-%m-%d").date()
    except Exception:
        raise HTTPBadRequest(json_body={'error': f'Invalid date format for {field}, expected YYYY-MM-DD'})

# 🔧 Helper: ambil task atau 404
def get_task_or_404(request):
    task_id = request.matchdict.get('id')
    task = request.dbsession.get(Task, task_id)
    if not task:
        raise HTTPNotFound(json_body={'error': 'Task not found'})
    return task

# 📄 List semua task
@view_config(route_name='tasks', request_method='GET', renderer='json')
def list_tasks(request):
    tasks = request.dbsession.query(Task).all()
    return [t.to_dict() for t in tasks]

# 📄 Ambil detail satu task
@view_config(route_name='task_detail', request_method='GET', renderer='json')
def get_task(request):
    task = get_task_or_404(request)
    return task.to_dict()

# 📄 Tambah task baru
@view_config(route_name='tasks', request_method='POST', renderer='json')
def create_task(request):
    data = request.json_body

    try:
        task = Task(
            id=str(uuid.uuid4()),
            name=data['name'],
            description=data['description'],
            start_date=parse_date(data['start_date'], 'start_date'),
            ends_date=parse_date(data['ends_date'], 'ends_date'),
            status=data['status'],
            project_id=data['project_id']
        )
    except KeyError as e:
        return Response(json_body={'error': f'Missing field: {e.args[0]}'}, status=400)

    request.dbsession.add(task)
    return task.to_dict()

# 📄 Update task
@view_config(route_name='task_detail', request_method='PUT', renderer='json')
def update_task(request):
    task = get_task_or_404(request)
    data = request.json_body

    for key, value in data.items():
        if key in ['start_date', 'ends_date']:
            try:
                value = parse_date(value, key)
            except HTTPBadRequest as e:
                return e
        setattr(task, key, value)

    return task.to_dict()

# 📄 Hapus task
@view_config(route_name='task_detail', request_method='DELETE', renderer='json')
def delete_task(request):
    task = get_task_or_404(request)
    request.dbsession.delete(task)
    return {'message': 'Task deleted'}
