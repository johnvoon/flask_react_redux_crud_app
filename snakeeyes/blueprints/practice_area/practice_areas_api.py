from flask import Blueprint, request
from flask_restful import Api, Resource
from models import PracticeArea
from lib.util_json import render_json

practice_areas_api = Api(Blueprint('practice_areas_api', __name__))

@practice_areas_api.resource('/practice_areas')
class PostsAPI(Resource):
    @staticmethod
    def get():
        practice_areas = PracticeArea.query.all()
        if practice_areas:
            return render_json(200, {'practiceAreas': [area.to_json() for area in practice_areas]})

        return render_json(404, {'message': 'No posts found'})
