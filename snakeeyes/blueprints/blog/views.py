from flask import Blueprint, render_template, url_for, redirect
from snakeeyes.blueprints.blog.models.post import Post
from snakeeyes.blueprints.blog.models.comment import Comment
from snakeeyes.blueprints.blog.forms import CommentForm
from snakeeyes.blueprints.contact.forms import ContactForm


blog = Blueprint('blog', __name__, template_folder='templates', url_prefix='/blog')

@blog.route('')
def home():
    return render_template('blog_home.html')


@blog.route('/<title>', methods=['GET', 'POST'])
def single_post(title):
    form = CommentForm()
    post = Post.find_by_title(title)
    all_practice_areas = Post.group_and_count_by_area()
    posts_by_area = Post.find_by_area(post.practice_area
                                      ).filter(Post.title != post.title
                                      ).limit(2)

    if post == None:
        return abort(404)

    if form.validate_on_submit():
        comment = Comment()
        form.populate_obj(comment)
        comment.post_id = post.id
        comment.save()

        # flash("Thanks for commenting!", 'success')
        return redirect(url_for('blog.single_post', title=title))

    return render_template('blog/single_post.html')
