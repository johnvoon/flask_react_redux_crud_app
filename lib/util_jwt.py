def authenticate(username, password):
    from snakeeyes.blueprints.user.models import User
    user = User.find_by_identity(username)
    if user and user.authenticated(password=password):
        return user

def identity(payload):
    from snakeeyes.blueprints.user.models import User
    user_id = payload['identity']
    return User.query.get(user_id)
