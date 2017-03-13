from flask import Blueprint, request
from flask_restful import Api, Resource
from server.blueprints.blog.models.post import Post
from server.blueprints.user.models import User
from server.blueprints.client.models.matter import Matter
from server.blueprints.practice_area.models import PracticeArea
from lib.util_json import render_json
from flask_login import current_user

admin_api = Api(Blueprint('admin_api', __name__))

@admin_api.resource('/admin')
class AdminAPI(Resource):
    @staticmethod
    def get():
        return render_json(200, {'admin': {
            'posts': Post.query.count(),
            'users': User.query.count(),
            'matters': Matter.query.count(),
            'practiceAreas': PracticeArea.query.count()
        }})

        return render_json(404, {'message': 'No data found'})
