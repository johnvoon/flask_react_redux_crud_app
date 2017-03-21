from collections import OrderedDict

from flask_wtf import Form
from wtforms import (
  SelectField,
  StringField,
  BooleanField,
  IntegerField,
  FloatField,
  DateTimeField,
  FileField,
  TextAreaField
)
from wtforms.validators import (
  DataRequired,
  Length,
  Optional,
  Regexp,
  NumberRange
)
from wtforms_components import Unique

from lib.locale import Currency
from lib.util_wtforms import ModelForm, choices_from_dict
from server.blueprints.user.models import db, User


class SearchForm(Form):
    q = StringField('Search terms', [Optional(), Length(1, 256)])


class BulkDeleteForm(Form):
    SCOPE = OrderedDict([
        ('all_selected_items', 'All selected items'),
        ('all_search_results', 'All search results')
    ])

    scope = SelectField('Privileges', [DataRequired()],
                        choices=choices_from_dict(SCOPE, prepend_blank=False))


class UserForm(ModelForm):
    username_message = 'Letters, numbers and underscores only please.'

    coins = IntegerField('Coins', [DataRequired(),
                                   NumberRange(min=1, max=2147483647)])

    username = StringField(validators=[
        Unique(
            User.username,
            get_session=lambda: db.session
        ),
        Optional(),
        Length(1, 16),
        Regexp('^\w+$', message=username_message)
    ])

    role = SelectField('Privileges', [DataRequired()],
                       choices=choices_from_dict(User.ROLE,
                                                 prepend_blank=False))
    active = BooleanField('Yes, allow this user to sign in')


class BlogForm(Form):
    title = StringField('Title', [DataRequired(), Length(1, 1000)])
    author = StringField('Author', [DataRequired(), Length(1, 256)])
    body = TextAreaField("Body", [DataRequired(), Length(1, 8192)])
    summary = TextAreaField('Summary', [DataRequired(), Length(1, 1000)])
    area = StringField('Practice Area', [DataRequired(), Length(1, 256)])
    imgSrc = FileField('Image File', [DataRequired()])