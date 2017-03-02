from flask import Blueprint, request
from flask_restful import Api, Resource
from server.blueprints.practice_area.models import PracticeArea
from server.blueprints.client.models.matter import Matter
from flask_jwt import jwt_required
from lib.util_json import render_json
from datetime import datetime

matters_api = Api(Blueprint('matters_api', __name__))

@matters_api.resource('/matters')
class MattersAPI(Resource):
    @staticmethod
    def get():
        matters = Matter.query.all()
        matter = [matter.to_json() for matter in matters]
        if matter:
            return render_json(200, {'matters': matter})

        return render_json(404, {'message': 'No matter found'})

    @staticmethod
    @jwt_required()
    def post():
        content = request.form        
        practice_area_ids = content.get('practiceAreas', '')
        staff_ids = content.get('staff', '')
        file_open = content.get('fileOpen', None)
        file_open_date_object = datetime.strptime(file_open, '%d/%m/%Y')

        matter = Matter()
        matter.file_open = file_open_date_object.strftime('%m/%d/%Y')
        matter.costs_on_account = content.get('costsOnAccount')
        matter.description = content.get('description')
    
        if practice_area_ids:
            practice_areas = [PracticeArea.query.get(int(id)) for id in practice_area_ids.split(",")]
            matter.practice_areas.extend(practice_areas)

        if staff_ids: 
            staff = [Staff.query.get(int(id)) for id in staff_ids.split(",")]
            matter.staff.extend(staff)

        try:
            matter.save()
            return render_json(200, {'matter': matter.to_json()})
        except:
            return render_json(500, {'message': "An error occurred."})
