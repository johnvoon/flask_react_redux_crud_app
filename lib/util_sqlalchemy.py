import datetime
from sqlalchemy import DateTime
from sqlalchemy.types import TypeDecorator
from lib.util_datetime import tzaware_datetime
from server.extensions import db


class AwareDateTime(TypeDecorator):
    """
    DateTime type which only stores timezone-aware DateTimes.

    Source:
      https://gist.github.com/inklesspen/90b554c864b99340747e
    """
    impl = DateTime(timezone=True)

    def process_bind_param(self, value, dialect):
        if isinstance(value, datetime.datetime) and value.tzinfo is None:
            raise ValueError('{!r} must be TZ-aware'.format(value))
        return value

    def __repr__(self):
        return 'AwareDateTime()'


class ResourceMixin(object):
    # Keep track when records are created and updated.
    created_on = db.Column(AwareDateTime(),
                           default=tzaware_datetime)
    updated_on = db.Column(AwareDateTime(),
                           default=tzaware_datetime,
                           onupdate=tzaware_datetime)

    def save(self):
        """
        Save a model instance.

        :return: Model instance
        """
        db.session.add(self)
        db.session.commit()

        return self

    def delete(self):
        """
        Delete a model instance.

        :return: db.session.commit()'s result
        """
        db.session.delete(self)
        return db.session.commit()

    def __str__(self):
        """
        Create a human readable version of a class instance.

        :return: self
        """
        obj_id = hex(id(self))
        columns = self.__table__.c.keys()

        values = ', '.join("%s=%r" % (n, getattr(self, n)) for n in columns)
        return '<%s %s(%s)>' % (obj_id, self.__class__.__name__, values)
