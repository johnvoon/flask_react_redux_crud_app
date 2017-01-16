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

# Blogs
@admin.route('/posts', strict_slashes=False, defaults={'path': ''})
@admin.route('/posts/<path:path>')
def blogs(path):
    return render_template('admin/blog/index.html')
