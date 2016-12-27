from flask_wtf import Form
from wtforms import TextAreaField
from wtforms_components import EmailField, StringField
from wtforms.validators import DataRequired, Length


class ContactForm(Form):
    name = StringField("", [DataRequired()])
    email = EmailField("", [DataRequired(), Length(3, 254)])
    message = TextAreaField("",
                            [DataRequired(), Length(1, 8192)])
    phone = StringField("")
    postcode = StringField("")
