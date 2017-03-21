import re
from flask import Blueprint, request
from flask_restful import Api, Resource
from models.client import Client
from server.blueprints.practice_area.models import PracticeArea
from server.blueprints.client.models.matter import Matter
from flask_jwt import jwt_required
from lib.util_json import render_json

clients_api = Api(Blueprint('clients_api', __name__))

@clients_api.resource('/clients')
class ClientsAPI(Resource):
    @staticmethod
    def get():
        client = Client.query.all()
        if client:
            return render_json(200, {'clients': [member.to_json() for member in client]})

        return render_json(404, {'message': 'No client found'})

    @staticmethod
    @jwt_required()
    def post():
        content = request.form
        matter_ids = content.get('matters', '')
        
        client = Client()
        client.user_id = content.get('userId', None)

        if matter_ids:
            matters = [Matter.query.get(int(id)) for id in matter_ids.split(",")]
            client.matters = matters

        try: 
            client.save()
            return render_json(200, {'client': client.to_json()})
        except:
            return render_json(500, {'message': "An error occurred."})

@clients_api.resource('/clients/<int:user_id>')
class ClientApi(Resource):
    @staticmethod
    def get(user_id):
        client = Client.find_by_user_id(user_id)
        if client:
            return render_json(200, {'client': client.to_json()})

        return render_json(404, {'message': 'No clients found'})

    @staticmethod
    @jwt_required()
    def put(user_id):
        client = Client.find_by_user_id(user_id)

        if client:
            content = request.form
            matter_ids = content.get('matters', '')

            if matter_ids:
                print matter_ids
                matters = [Matter.query.get(int(id)) for id in matter_ids.split(",")]
                client.matters = matters

            try: 
                client.save()
                return render_json(200, {'client': client.to_json()})
            except:
                return render_json(500, {'message': "An error occurred."})
 
        return render_json(404, {'message': 'No client with user ID {} found'.format(user_id)})
