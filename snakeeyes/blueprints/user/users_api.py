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
        title = content['title']
        image = request.files.get('file', default=None)

        if User.find_by_title(title):
            return render_json(404, 
                {'message': "A user with the title '{}' already exists. Please choose another title".format(title)})

        user = User()
        user.title = title
        user.author_id = content['author']
        user.practice_area_id = content['practiceArea']
        user.body = [content['body']]
        user.summary = content['summary']
        
        if image:
            filename = secure_filename(image.filename)
            path_to_image_2000 = os.path.join(current_app.config['IMAGES_2000'], filename)
            path_to_image_400 = os.path.join(current_app.config['IMAGES_400'], filename)

            image_2000 = Image.open(image)
            image_400 = Image.open(image)
            image_2000.thumbnail((2000, 2000))
            image_400.thumbnail((400, 400))

            image_2000.save(path_to_image_2000)
            image_400.save(path_to_image_400)
            
            with current_app.app_context():
                user.img_src = url_for('static', filename='images/2000/{}'.format(filename))
                user.thumbnail_src = url_for('static', filename='images/400/{}'.format(filename))
        else:
            user.img_src = ''
            user.thumbnail_src = ''

        try: 
            user.save()
        except:
            return render_json(500, {'message': "An error occurred."})
        
        return render_json(200, {'user': user.to_json()})

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
        image = request.files.get('file', default=None)
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
