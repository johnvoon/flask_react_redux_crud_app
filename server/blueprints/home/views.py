from flask import Blueprint, render_template

home = Blueprint('home', __name__)

@home.route('/')
def index():
    return render_template('base.html')


@home.route('/terms')
def terms():
    return render_template('terms.html')


@home.route('/privacy')
def privacy():
    return render_template('privacy.html')
