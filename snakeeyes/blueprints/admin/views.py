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
    group_and_count_plans = Dashboard.group_and_count_plans()
    group_and_count_coupons = Dashboard.group_and_count_coupons()
    group_and_count_users = Dashboard.group_and_count_users()
    group_and_count_payouts = Dashboard.group_and_count_payouts()

    return render_template('admin/page/dashboard.html',
                           group_and_count_plans=group_and_count_plans,
                           group_and_count_coupons=group_and_count_coupons,
                           group_and_count_users=group_and_count_users,
                           group_and_count_payouts=group_and_count_payouts)


# Users -----------------------------------------------------------------------
@admin.route('/users', defaults={'page': 1})
@admin.route('/users/page/<int:page>')
def users(page):
    search_form = SearchForm()
    bulk_form = BulkDeleteForm()

    sort_by = User.sort_by(request.args.get('sort', 'created_on'),
                           request.args.get('direction', 'desc'))
    order_values = '{0} {1}'.format(sort_by[0], sort_by[1])

    paginated_users = User.query \
        .filter(User.search(request.args.get('q', ''))) \
        .order_by(User.role.asc(), User.payment_id, text(order_values)) \
        .paginate(page, 50, True)

    return render_template('admin/user/index.html',
                           form=search_form, bulk_form=bulk_form,
                           users=paginated_users)


@admin.route('/users/edit/<int:id>', methods=['GET', 'POST'])
def users_edit(id):
    user = User.query.get(id)
    form = UserForm(obj=user)

    if current_user.subscription:
        coupon = Coupon.query \
            .filter(Coupon.code == current_user.subscription.coupon).first()
    else:
        coupon = None

    if form.validate_on_submit():
        if User.is_last_admin(user,
                              request.form.get('role'),
                              request.form.get('active')):
            flash('You are the last admin, you cannot do that.', 'error')
            return redirect(url_for('admin.users'))

        form.populate_obj(user)

        if not user.username:
            user.username = None

        user.save()

        flash('User has been saved successfully.', 'success')
        return redirect(url_for('admin.users'))

    return render_template('admin/user/edit.html', form=form, user=user,
                           coupon=coupon)

# Invoices --------------------------------------------------------------------
@admin.route('/invoices', defaults={'page': 1})
@admin.route('/invoices/page/<int:page>')
def invoices(page):
    search_form = SearchForm()

    sort_by = Invoice.sort_by(request.args.get('sort', 'created_on'),
                              request.args.get('direction', 'desc'))
    order_values = 'invoices.{0} {1}'.format(sort_by[0], sort_by[1])

    paginated_invoices = Invoice.query.join(User) \
        .filter(Invoice.search(request.args.get('q', ''))) \
        .order_by(text(order_values)) \
        .paginate(page, 50, True)

    return render_template('admin/invoice/index.html',
                           form=search_form, invoices=paginated_invoices)

# Blogs
@admin.route('/blogs', defaults={'page': 1})
@admin.route('/blogs/page/<int:page>')
def blogs(page):
    search_form = SearchForm()
    bulk_form = BulkDeleteForm()
    sort_by = Blog.sort_by(request.args.get('sort', 'created_on'),
                              request.args.get('direction', 'desc'))
    order_values = 'blogs.{0} {1}'.format(sort_by[0], sort_by[1])

    paginated_blogs = Blog.query \
        .filter(Blog.search(request.args.get('q', ''))) \
        .order_by(text(order_values)) \
        .paginate(page, 10, True)

    return render_template('admin/blog/index.html', bulk_form=bulk_form,
                           form=search_form, blogs=paginated_blogs)

@admin.route('/blogs/new', methods=['GET', 'POST'])
def blog_new():
    blog = Blog()
    form = BlogForm()

    if form.validate_on_submit():
        form.populate_obj(blog)
        blog.save()

        # flash("New blog was successfully posted.", 'success')
        return redirect(url_for('blog.single_post', title=blog.title))

    return render_template('admin/blog/new.html',
                           form=form, blog=blog)

@admin.route('/blogs/edit/<int:id>', methods=['GET', 'POST'])
def blog_edit(id):
    blog = Blog.query.get(id)
    form = BlogForm(obj=blog)

    if form.validate_on_submit():
        form.populate_obj(blog)

        blog.save()

        flash('Blog has been saved successfully.', 'success')
        return redirect(url_for('admin.blogs'))

    return render_template('admin/blog/edit.html', form=form, blog=blog)

@admin.route('/blogs/bulk_delete', methods=['POST'])
def blogs_bulk_delete():
    form = BulkDeleteForm()

    if form.validate_on_submit():
        ids = Blog.get_bulk_action_ids(request.form.get('scope'),
                                       request.form.getlist('bulk_ids'),
                                       query=request.args.get('q', ''))

        Blog.bulk_delete(ids)

        flash('{0} blog post(s) were deleted.'.format(len(ids)),
              'success')
    else:
        flash('No blog posts were deleted, something went wrong.', 'error')

    return redirect(url_for('admin.blogs'))