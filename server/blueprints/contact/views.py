from flask import (
    Blueprint,
    flash,
    redirect,
    request,
    url_for,
    render_template)
from flask_login import current_user

contact = Blueprint('contact', __name__)

@contact.route('/contact', strict_slashes=False, defaults={'path': ''})
@contact.route('/contact/<path:path>')
def index(path):
    return render_template('base.html')
