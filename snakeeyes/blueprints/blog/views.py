from flask import Blueprint, render_template, url_for, redirect
from snakeeyes.blueprints.blog.models.post import Post
from snakeeyes.blueprints.blog.models.comment import Comment
from snakeeyes.blueprints.blog.forms import CommentForm
from snakeeyes.blueprints.contact.forms import ContactForm


blog = Blueprint('blog', __name__, template_folder='templates', url_prefix='/blog')

@blog.route('', strict_slashes=False, defaults={'path': ''})
@blog.route('/<path:path>')
def home(path):
    return render_template('blog_home.html')
