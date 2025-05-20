def includeme(config):
    config.add_static_view('static', 'static', cache_max_age=3600)
    config.add_route('home', '/')

    # Project
    config.add_route('projects', '/api/v1/projects')
    config.add_route('project_detail', '/api/v1/projects/{id}')

    # Task
    config.add_route('tasks', '/api/v1/tasks')
    config.add_route('task_detail', '/api/v1/tasks/{id}')
    
    # Auth
    config.add_route('register', '/api/v1/register')
    config.add_route('login', '/api/v1/login')
    config.add_route('logout', '/api/v1/logout')
    
