import os
from flask import Blueprint, request, url_for
from flask_restful import Api, Resource
from flask_jwt import jwt_required
from snakeeyes.blueprints.user.models import User
from lib.util_json import render_json
from snakeeyes.extensions import csrf
from flask import current_app

users_api = Api(Blueprint('users_api', __name__), decorators=[csrf.exempt])

@users_api.resource('/users')
class UsersAPI(Resource):
    @staticmethod
    def get():
        users = User.query.all()
        users = [user.to_json() for user in users]
        if users:
            return render_json(200, {'users': users})

        return render_json(404, {'message': 'No users found'})

    @staticmethod
    @jwt_required()
    def post(): 
        content = request.form
        username = content.get('username', None)
        password = content.get('password', None)
        email = content.get('email', None)
        first_name = content.get('firstName', None)
        middle_name = content.get('middleName', None)
        last_name = content.get('lastName', None)
        phone_number = content.get('phoneNumber', None)
        unit_number = content.get('unitNumber', None)
        street_address = content.get('streetAddress', None)
        suburb = content.get('suburb', None)
        state = content.get('state', None)
        postcode = content.get('postcode', None)
        country = content.get('country', None)

        try: 
            user.save()
        except:
            return render_json(500, {'message': "An error occurred."})
        
        return render_json(200, {'user': user.to_json()})

@users_api.resource('/users/validate')
class UserValidationApi(Resource):
    @staticmethod
    def post():
        content = request.get_json()
        username = content.get('username', None)
        email = content.get('email', None)
        username_error = "Username has been taken."
        email_error = "An account with that email has already been registered."

        if User.find_by_identity(username) and User.find_by_identity(email):
            return render_json(404,
                {'username': username_error,
                 'email': email_error})
        if User.find_by_identity(username):
            return render_json(404, 
                {'username': username_error})
        if User.find_by_identity(email):
            return render_json(404, 
                {'email': email_error})

@users_api.resource('/users/<int:user_id>')
class UserApi(Resource):
    @staticmethod
    def get(user_id):
        user = User.query.get_or_404(user_id)
        if user:
            return render_json(200, {'user': user.to_json()})

        return render_json(404, {'message': 'No users found'})

    @staticmethod
    @jwt_required()
    def put(user_id):
        content = request.form
        image = request.files.get('file', None)
        user = User.query.get_or_404(user_id)

        if user:
            user.title = content['title']
            user.author_id = content['author']
            user.practice_area_id = content['practiceArea']
            user.body = [content['body']]
            user.summary = content['summary']
        
        try: 
            user.save()
            return render_json(200, {'user': user.to_json()})
        except:
            return render_json(500, {'message': "An error occurred."})

        return render_json(404, {'message': 'No user with ID {} found'.format(user_id)})

    @staticmethod
    @jwt_required()
    def delete(user_id):
        user = User.query.get_or_404(user_id)
        if user: 
            # try:
            user.delete()
            return render_json(200, {'user': user.to_json()})
            # except: 
            #     return render_json(500, {'message': "An error occurred."})

        return render_json(404, {'message': 'No user with ID {} found'.format(user_id)})
