from flask import Blueprint, request
from flask_restful import Api, Resource
from server.blueprints.blog.models.comment import Comment
from lib.util_json import render_json
from flask_login import current_user

comments_api = Api(Blueprint('comments_api', __name__))

@comments_api.resource('/comments')
class CommentsAPI(Resource):
    @staticmethod
    def get():
        
        if comments:
            return render_json(200, {'admin': comments})

        return render_json(404, {'message': 'No comments found'})
