from flask import Blueprint, request
from flask_restful import Api, Resource
from snakeeyes.blueprints.blog.models.post import Post
from lib.util_json import render_json

posts_api = Api(Blueprint('posts_api', __name__))

@posts_api.resource('/posts')
class PostsAPI(Resource):
    @staticmethod
    def get():
        posts = Post.query.all()
        if posts:
            return render_json(200, {'posts': [post.to_json() for post in posts]})

        return render_json(404, {'message': 'No posts found'})

    @staticmethod
    def post():
        if Post.find_by_name(request.form.get('name')):
            return render_json(404, 
                {'message': "A post with name '{}' already exists".format(name)})

        post = Post()
        post.title = request.form.get('name')
        post.body = request.form.get('body')
        post.summary = request.form.get('summary')
        post.imgSrc = request.form.get('image URL')

        author_name = request.form.get('author').strip()
        post.author_id = Staff.find_by_name(author_name).id
        practice_area = request.form.get('practice-area').strip()
        post.practice_area_id = PracticeArea.find_by_name(practice_area).id
        
        try: 
            post.save()
        except:
            return render_json(500, {'message': "An error occurred creating the store."})
        
        return render_json(200, post.to_json())

@posts_api.resource('/posts/<int:post_id>')
class PostAPI(Resource):
    @staticmethod
    def delete(post_id):
        post = Post.query.get_or_404(post_id)
        if post: 
            post.delete()

        return render_json(200, post.to_json())
