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
        
        staff = Staff()
        staff.date_joined = content.get('dateJoined', None)
        staff.position = content.get('position', '')        
        staff.description = re.split('[\r\n]+', content.get('description', ''))
        staff.user_id = content.get('userId', None)

        if practice_area_ids:
            practice_areas = [PracticeArea.query.get(int(id)) for id in practice_area_ids.split(",")]
            staff.practice_areas.extend(practice_areas)

        if matter_ids:
            print matter_ids
            matters = [Matter.query.get(int(id)) for id in matter_ids.split(",")]
            staff.matters_handled.extend(matters)

        try: 
            staff.save()
            return render_json(200, {'staff': staff.to_json()})
        except:
            return render_json(500, {'message': "An error occurred."})

@staff_api.resource('/staff/<int:staff_id>')
class StaffMemberApi(Resource):
    @staticmethod
    def get(user_id):
        user = User.query.get_or_404(user_id)
        if user:
            return render_json(200, {'user': user.to_json()})

        return render_json(404, {'message': 'No users found'})

    @staticmethod
    @jwt_required()
    def put(staff_id):
        staff = Staff.query.get_or_404(staff_id)

        if staff:
            content = request.form
            practice_area_ids = content.get('practiceAreas', '')
            matter_ids = content.get('matters', '')
            staff.date_joined = content.get('dateJoined', None)
            staff.position = content.get('position', '')
            staff.description = re.split('[\r\n]+', content.get('description', ''))

            if practice_area_ids:
                practice_areas = [PracticeArea.query.get(int(id)) for id in practice_area_ids.split(",")]
                staff.practice_areas.extend(practice_areas)

            if matter_ids:
                print matter_ids
                matters = [Matter.query.get(int(id)) for id in matter_ids.split(",")]
                staff.matters_handled.extend(matters)

            try: 
                staff.save()
                return render_json(200, {'staff': staff.to_json()})
            except:
                return render_json(500, {'message': "An error occurred."})
 
        return render_json(404, {'message': 'No staff with ID {} found'.format(staff_id)})
