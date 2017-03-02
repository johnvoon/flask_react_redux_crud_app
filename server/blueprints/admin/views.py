from flask import (
    Blueprint,
    redirect,
    request,
    flash,
    url_for,
    render_template)
from flask_login import login_required, current_user
from server.blueprints.user.decorators import role_required

admin = Blueprint('admin', __name__, url_prefix='/admin')


@admin.before_request
@login_required
@role_required('admin')
def before_request():
    """ Protect all of the admin endpoints. """
    pass

@admin.route('', strict_slashes=False, defaults={'path': ''})
@admin.route('/<path:path>')
def index(path):
    return render_template('base.html')
