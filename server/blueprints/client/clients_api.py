import re
from flask import Blueprint, request
from flask_restful import Api, Resource
from models.client import Client
from server.blueprints.practice_area.models import PracticeArea
from server.blueprints.client.models.matter import Matter
from flask_jwt import jwt_required
from lib.util_json import render_json

clients_api = Api(Blueprint('clients_api', __name__))

@clients_api.resource('/client')
class ClientsAPI(Resource):
    @staticmethod
    def get():
        client = Client.query.all()
        if client:
            return render_json(200, {'client': [member.to_json() for member in client]})

        return render_json(404, {'message': 'No client found'})

    @staticmethod
    @jwt_required()
    def post():
        content = request.form
        matter_ids = content.get('matters', '')
        
        client = Client()
        client.user_id = content.get('userId', None)

        if matter_ids:
            print matter_ids
            matters = [Matter.query.get(int(id)) for id in matter_ids.split(",")]
            client.matters_handled.extend(matters)

        try: 
            client.save()
            return render_json(200, {'client': client.to_json()})
        except:
            return render_json(500, {'message': "An error occurred."})

@clients_api.resource('/client/<int:client_id>')
class ClientApi(Resource):
    @staticmethod
    def get(user_id):
        user = User.query.get_or_404(user_id)
        if user:
            return render_json(200, {'user': user.to_json()})

        return render_json(404, {'message': 'No users found'})

    @staticmethod
    @jwt_required()
    def put(client_id):
        client = Client.query.get_or_404(client_id)

        if client:
            content = request.form
            matter_ids = content.get('matters', '')

            if matter_ids:
                print matter_ids
                matters = [Matter.query.get(int(id)) for id in matter_ids.split(",")]
                client.matters_handled.extend(matters)

            try: 
                client.save()
                return render_json(200, {'client': client.to_json()})
            except:
                return render_json(500, {'message': "An error occurred."})
 
        return render_json(404, {'message': 'No client with ID {} found'.format(client_id)})
