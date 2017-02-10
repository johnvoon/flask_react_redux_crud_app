from flask import Blueprint, render_template

practice_areas = Blueprint('practice_areas', __name__, template_folder='templates', url_prefix='/practice-areas')

@practice_areas.route('', strict_slashes=False, defaults={'path': ''})
@practice_areas.route('/<path:path>')
def home(path):
    return render_template('practice_areas.html')
