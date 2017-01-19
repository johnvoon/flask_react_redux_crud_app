from flask import (
    Blueprint,
    redirect,
    request,
    flash,
    url_for,
    render_template)
from flask_login import login_required, current_user
from sqlalchemy import text

from snakeeyes.blueprints.admin.models import Dashboard
from snakeeyes.blueprints.user.decorators import role_required
from snakeeyes.blueprints.user.models import User
from snakeeyes.blueprints.blog.models.post import Post
from snakeeyes.blueprints.admin.forms import (
    SearchForm,
    UserForm,
    BlogForm
)

admin = Blueprint('admin', __name__,
                  template_folder='templates', url_prefix='/admin')


@admin.before_request
@login_required
@role_required('admin')
def before_request():
    """ Protect all of the admin endpoints. """
    pass


# Dashboard -------------------------------------------------------------------
@admin.route('')
def dashboard():
    group_and_count_users = Dashboard.group_and_count_users()
    group_and_count_payouts = Dashboard.group_and_count_payouts()

    return render_template('admin/page/dashboard.html')

# Users
@admin.route('/users', strict_slashes=False, defaults={'path': ''})
@admin.route('/users/<path:path>')
def users(path):
    return render_template('admin/users.html')

# Posts
@admin.route('/posts', strict_slashes=False, defaults={'path': ''})
@admin.route('/posts/<path:path>')
def blogs(path):
    return render_template('admin/blog.html')
