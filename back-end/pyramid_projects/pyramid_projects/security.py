# security.py

def groupfinder(userid, request):
    # Mengambil user dari db berdasarkan userid (id yang ada di session cookie)
    user = request.dbsession.query(request.registry.models.User).get(userid)
    if user:
        return ['role:user']  # Kembalikan hanya satu role "user" karena Anda tidak menggunakan role lebih lanjut
    return None
