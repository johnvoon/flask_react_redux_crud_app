from lib.flask_mailplus import send_template_message
from snakeeyes.app import create_celery_app
from snakeeyes.blueprints.user.models import User

celery = create_celery_app()


@celery.task()
def deliver_password_reset_email(user_id, reset_token):
    """
    Send a reset password e-mail.

    :param user_id: User id
    :type user_id: int
    :param reset_token: Reset token
    :type reset_token: str
    :return: None if user not found
    """
    user = User.query.get(user_id)

    if user is None:
        return

    ctx = {'user': user, 'reset_token': reset_token}

    send_template_message(subject='Password reset request from Concept Law Firm',
                          recipients=[user.email],
                          template='user/mail/password_reset', ctx=ctx)

    return None
