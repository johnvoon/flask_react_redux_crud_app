import os
from flask import Blueprint, render_template

home = Blueprint('home', __name__)

@home.route('/')
def index():
    return render_template('base.html')

@home.route('/terms-of-service')
def terms():
    return render_template('base.html')

@home.route('/privacy-policy')
def privacy():
    return render_template('base.html')
