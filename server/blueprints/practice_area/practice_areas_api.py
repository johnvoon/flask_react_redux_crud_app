from flask import Blueprint, request
from flask_restful import Api, Resource
from models import PracticeArea
from lib.util_json import render_json
from server.extensions import db

practice_areas_api = Api(Blueprint('practice_areas_api', __name__))

@practice_areas_api.resource('/practice-areas')
class PracticeAreasAPI(Resource):
    @staticmethod
    def get():
        practice_areas = PracticeArea.query.all()
        if practice_areas:
            return render_json(200, {'practiceAreas': [area.to_json() for area in practice_areas]})

        return render_json(404, {'message': 'No posts found'})

@practice_areas_api.resource('/practice-areas/<slug>')
class PracticeAreaAPI(Resource):
    @staticmethod
    def get(slug):
        practice_area = PracticeArea.query.filter(PracticeArea.slug == slug).first()
        
        if practice_area:
            return render_json(200, {'practiceArea': practice_area.to_json()})

        return render_json(404, {'message': 'No practice areas found'})
