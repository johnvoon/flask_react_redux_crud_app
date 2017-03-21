try:
    from urlparse import urljoin
except ImportError:
    from urllib.parse import urljoin


from flask import request


def safe_next_url(target):
    """
    Ensure relative URL path on same domain as this host.
    Protects against 'Open redirect vulnerability'.

    :param target: Relative url (typically supplied by Flask-Login)
    :type target: str
    :return: str
    """
    return urljoin(request.host_url, target)
