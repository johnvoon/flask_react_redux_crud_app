from functools import wraps

from flask import flash, redirect
from flask_login import current_user


def anonymous_required(url='/'):
    """
    Redirect user if already signed in.

    :param url: Redirect URL if invalid
    :type url: str
    :return: Function
    """
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            if current_user.is_authenticated:
                return redirect(url)

            return f(*args, **kwargs)

        return decorated_function

    return decorator


def role_required(*roles):
    """
    Check if user has permission to view page

    :param *roles: 1 or more roles
    :return: Function
    """
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            if current_user.role not in roles:
                return redirect('/')

            return f(*args, **kwargs)

        return decorated_function

    return decorator
