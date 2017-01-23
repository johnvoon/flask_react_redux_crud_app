import os
from PIL import Image
from flask import Blueprint, request, url_for
from werkzeug.utils import secure_filename
from flask_restful import Api, Resource
from flask_jwt import jwt_required
from snakeeyes.blueprints.blog.models.post import Post
from lib.util_json import render_json
from snakeeyes.extensions import csrf
from flask import current_app

posts_api = Api(Blueprint('posts_api', __name__), decorators=[csrf.exempt])

@posts_api.resource('/posts')
class PostsAPI(Resource):
    @staticmethod
    def get():
        posts = Post.query.all()
        posts = [post.to_json() for post in posts]
        if posts:
            return render_json(200, {'posts': posts})

        return render_json(404, {'message': 'No posts found'})

    @staticmethod
    @jwt_required()
    def post(): 
        content = request.form
        title = content['title']
        image = request.files.get('file', None)

        if Post.find_by_title(title):
            return render_json(404, 
                {'message': "A post with the title '{}' already exists. Please choose another title".format(title)})

        post = Post()
        post.title = title
        post.author_id = content['author']
        post.practice_area_id = content['practiceArea']
        post.body = [content['body']]
        post.summary = content['summary']
        
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
                post.img_src = url_for('static', filename='images/2000/{}'.format(filename))
                post.thumbnail_src = url_for('static', filename='images/400/{}'.format(filename))
        else:
            post.img_src = ''
            post.thumbnail_src = ''

        try: 
            post.save()
        except:
            return render_json(500, {'message': "An error occurred."})
        
        return render_json(200, {'post': post.to_json()})

@posts_api.resource('/posts/validate')
class PostValidationApi(Resource):
    @staticmethod
    def post():
        content = request.get_json()
        title = content.get('title', None)
        title_error = "A post with that title already exists."

        if Post.find_by_title(title):
            return render_json(404, {'title': title_error})

        return None

@posts_api.resource('/posts/<int:post_id>')
class PostAPI(Resource):
    @staticmethod
    def get(post_id):
        post = Post.query.get_or_404(post_id)
        if post:
            return render_json(200, {'post': post.to_json()})

        return render_json(404, {'message': 'No posts found'})

    @staticmethod
    @jwt_required()
    def put(post_id):
        content = request.form
        image = request.files.get('file', None)
        post = Post.query.get_or_404(post_id)

        if post:
            post.title = content['title']
            post.author_id = content['author']
            post.practice_area_id = content['practiceArea']
            post.body = [content['body']]
            post.summary = content['summary']

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
                    post.img_src = url_for('static', filename='images/2000/{}'.format(filename))
                    post.thumbnail_src = url_for('static', filename='images/400/{}'.format(filename))
            else:
                post.img_src = ''
                post.thumbnail_src = ''
        
        try: 
            post.save()
            return render_json(200, {'post': post.to_json()})
        except:
            return render_json(500, {'message': "An error occurred."})

        return render_json(404, {'message': 'No post with ID {} found'.format(post_id)})

    @staticmethod
    @jwt_required()
    def delete(post_id):
        post = Post.query.get_or_404(post_id)
        if post: 
            # try:
            post.delete()
            return render_json(200, {'post': post.to_json()})
            # except: 
            #     return render_json(500, {'message': "An error occurred."})

        return render_json(404, {'message': 'No post with ID {} found'.format(post_id)})

@posts_api.resource('/posts/<int:post_id>/comments')
class PostCommentsAPI(Resource):
    @staticmethod
    def get(post_id):
        post = Post.query.get_or_404(post_id)
        comments = [comment.to_json() for comment in post.comments]

        if post:
            return render_json(200, {'comments': comments})

        return render_json(404, {'message': 'No comments found for this post'})