from flask import Blueprint, render_template 

blog = Blueprint('blog', __name__)

@blog.route('/blog', strict_slashes=False, defaults={'path': ''})
@blog.route('/blog/<path:path>')
def index(path):
    return render_template('base.html')
