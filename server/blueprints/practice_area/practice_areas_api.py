import re, os
from PIL import Image
from werkzeug.utils import secure_filename
from flask import Blueprint, request, url_for, current_app
from flask_restful import Api, Resource
from models import PracticeArea
from lib.util_json import render_json
from server.extensions import db
from flask_jwt import jwt_required

practice_areas_api = Api(Blueprint('practice_areas_api', __name__))

@practice_areas_api.resource('/practice-areas')
class PracticeAreasAPI(Resource):
    @staticmethod
    def get():
        practice_areas = PracticeArea.query.all()
        if practice_areas:
            return render_json(200, {'practiceAreas': [area.to_json() for area in practice_areas]})

        return render_json(404, {'message': 'No posts found'})

    @staticmethod
    @jwt_required()
    def post():
        content = request.form
        
        practiceArea = PracticeArea()
        practiceArea.area = content.get('area', "")
        practiceArea.description = re.split('[\r\n]+', content.get('description', ''))
        practiceArea.slug = content.get('slug', '')
        image = request.files.get('file', None)

        if image:
            filename = secure_filename(image.filename)
            path_to_image_2000 = os.path.join(current_app.config['IMAGES_2000'], filename)
            path_to_image_400 = os.path.join(current_app.config['IMAGES_400'], filename)
            if not os.path.isfile(path_to_image_2000) and not os.path.isfile(path_to_image_400):
                image_2000 = Image.open(image)
                image_400 = Image.open(image)
                image_2000.thumbnail((2000, 2000))
                image_400.thumbnail((400, 400))
                image_2000.save(path_to_image_2000)
                image_400.save(path_to_image_400)
            
            with current_app.app_context():
                practiceArea.img_src = url_for('static', filename='images/2000/{}'.format(filename))
                practiceArea.thumbnail_src = url_for('static', filename='images/400/{}'.format(filename))

        try: 
            practiceArea.save()
            return render_json(200, {'practiceArea': practiceArea.to_json()})
        except:
            return render_json(500, {'message': "An error occurred."})

@practice_areas_api.resource('/practice-areas/<slug>')
class PracticeAreaAPI(Resource):
    @staticmethod
    def get(slug):
        practice_area = PracticeArea.get_by_slug(slug)
        
        if practice_area:
            return render_json(200, {'practiceArea': practice_area.to_json()})

        return render_json(404, {'message': 'No practice areas found'})

    @staticmethod
    @jwt_required()
    def put(slug):
        practiceArea = PracticeArea.get_by_slug(slug)

        if practiceArea:
            content = request.form
            practiceArea.area = content.get('area', None)
            practiceArea.description = re.split('[\r\n]+', content.get('description', ''))
            image = request.files.get('file', None)
            
            if image:
                filename = secure_filename(image.filename)
                path_to_image_2000 = os.path.join(current_app.config['IMAGES_2000'], filename)
                path_to_image_400 = os.path.join(current_app.config['IMAGES_400'], filename)
                if not os.path.isfile(path_to_image_2000) and not os.path.isfile(path_to_image_400):
                    image_2000 = Image.open(image)
                    image_400 = Image.open(image)
                    image_2000.thumbnail((2000, 2000))
                    image_400.thumbnail((400, 400))
                    image_2000.save(path_to_image_2000)
                    image_400.save(path_to_image_400)
                
                with current_app.app_context():
                    practiceArea.img_src = url_for('static', filename='images/2000/{}'.format(filename))
                    practiceArea.thumbnail_src = url_for('static', filename='images/400/{}'.format(filename))

            try: 
                practiceArea.save()
                return render_json(200, {'practiceArea': practiceArea.to_json()})
            except:
                return render_json(500, {'message': "An error occurred."})
 
        return render_json(404, {'message': 'No practiceArea with user ID {} found'.format(user_id)})
