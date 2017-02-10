from flask import Blueprint, render_template
from snakeeyes.blueprints.contact.forms import ContactForm

page = Blueprint('page', __name__, template_folder='templates')

@page.route('/')
def home():
    form = ContactForm()
    return render_template('home.html', form=form)


@page.route('/about')
def about():
    form = ContactForm()
    return render_template('terms.html', form=form)


@page.route('/people')
def people():
    form = ContactForm()
    return render_template('terms.html', form=form)


@page.route('/terms')
def terms():
    form = ContactForm()
    return render_template('terms.html', form=form)


@page.route('/privacy')
def privacy():
    form = ContactForm()
    return render_template('privacy.html', form=form)


