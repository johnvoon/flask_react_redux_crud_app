from flask import Blueprint, render_template

practice_areas = Blueprint('practice_areas', __name__)

@practice_areas.route('/practice-areas', strict_slashes=False, defaults={'path': ''})
@practice_areas.route('/practice-areas/<path:path>')
def index(path):
    return render_template('base.html')
