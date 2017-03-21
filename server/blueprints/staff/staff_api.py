import re
from flask import Blueprint, request
from flask_restful import Api, Resource
from models import Staff
from server.blueprints.practice_area.models import PracticeArea
from server.blueprints.client.models.matter import Matter
from flask_jwt import jwt_required
from lib.util_json import render_json

staff_api = Api(Blueprint('staff_api', __name__))

@staff_api.resource('/staff')
class StaffAPI(Resource):
    @staticmethod
    def get():
        staff = Staff.query.all()
        if staff:
            return render_json(200, {'staff': [member.to_json() for member in staff]})

        return render_json(404, {'message': 'No staff found'})

    @staticmethod
    @jwt_required()
    def post():
        content = request.form
        practice_area_ids = content.get('practiceAreas', '')
        matter_ids = content.get('matters', '')
        date_joined = content.get('dateJoined', None)
        date_joined_date_object = datetime.strptime(date_joined, '%d/%m/%Y')

        staff = Staff()
        
        staff.date_joined = date_joined_date_object.strftime('%m/%d/%Y') if date_joined else None
        staff.position = content.get('position', '')        
        staff.description = re.split('[\r\n]+', content.get('description', ''))
        staff.user_id = content.get('userId', None)

        if practice_area_ids:
            practice_areas = [PracticeArea.query.get(int(id)) for id in practice_area_ids.split(",")]
            staff.practice_areas = practice_areas

        if matter_ids:
            print matter_ids
            matters = [Matter.query.get(int(id)) for id in matter_ids.split(",")]
            staff.matters_handled = matters

        try: 
            staff.save()
            return render_json(200, {'staff': staff.to_json()})
        except:
            return render_json(500, {'message': "An error occurred."})

@staff_api.resource('/staff/<int:user_id>')
class StaffMemberApi(Resource):
    @staticmethod
    def get(user_id):
        staff = Staff.find_by_user_id(user_id)

        if staff:
            return render_json(200, {'staff': staff.to_json()})

        return render_json(404, {'message': 'No staff found'})

    @staticmethod
    @jwt_required()
    def put(user_id):
        staff = Staff.find_by_user_id(user_id)

        if staff:
            content = request.form
            practice_area_ids = content.get('practiceAreas', '')
            matter_ids = content.get('matters', '')
            date_joined = content.get('dateJoined', None)
            date_joined_date_object = datetime.strptime(date_joined, '%d/%m/%Y')

            staff.date_joined = date_joined_date_object.strftime('%m/%d/%Y') if date_joined else None
            staff.position = content.get('position', '')
            staff.description = re.split('[\r\n]+', content.get('description', ''))

            if practice_area_ids:
                practice_areas = [PracticeArea.query.get(int(id)) for id in practice_area_ids.split(",")]
                staff.practice_areas = practice_areas

            if matter_ids:
                matters = [Matter.query.get(int(id)) for id in matter_ids.split(",")]
                staff.matters_handled = matters

            try: 
                staff.save()
                return render_json(200, {'staff': staff.to_json()})
            except:
                return render_json(500, {'message': "An error occurred."})
 
        return render_json(404, {'message': 'No staff with user ID {} found'.format(user_id)})
