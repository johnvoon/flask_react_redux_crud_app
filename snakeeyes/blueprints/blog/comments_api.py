from flask import Blueprint, request
from flask_restful import Api, Resource
from snakeeyes.blueprints.blog.models.comment import Comment
from lib.util_json import render_json

comments_api = Api(Blueprint('comments_api', __name__))

@comments_api.resource('/comments')
class CommentsAPI(Resource):
    @staticmethod
    def get():
        comments = Comment.query.all()
        comments = [comment.to_json() for comment in comments]
        if comments:
            return render_json(200, {'comments': comments})

        return render_json(404, {'message': 'No comments found'})

    @staticmethod
    def post():
        comment = Comment()
        comment.content = request.form.get('content')
        comment.summary = request.form.get('summary')
        comment.imgSrc = request.form.get('image URL')

        author_name = request.form.get('author').strip()
        post.author_id = Staff.find_by_name(author_name).id
        practice_area = request.form.get('practice-area').strip()
        post.practice_area_id = PracticeArea.find_by_name(practice_area).id
        
        try: 
            post.save()
        except:
            return render_json(500, {'message': "An error occurred creating the store."})
        
        return render_json(200, post.to_json())

@comments_api.resource('/comments/<int:comment_id>')
class CommentAPI(Resource):
    @staticmethod
    def get(comment_id):
        comment = Comment.query.get_or_404(comment_id)
        if comment:
            return render_json(200, {'comment': comment.to_json()})

        return render_json(404, {'message': 'No comment found'})

    @staticmethod
    def put(comment_id):
        comment = Comment.query.get_or_404(comment_id)
        if comment:
            comment.visible = request.form.get('visible')
        try: 
            comment.save()
            return render_json(200, {'comment': comment.to_json()})
        except:
            return render_json(500, {'message': "An error occurred."})

        return render_json(404, {'message': 'No comment with ID {} found'.format(comment_id)})

    @staticmethod
    def delete(comment_id):
        comment = Comment.query.get_or_404(comment_id)
        if comment: 
            comment.delete()

        return render_json(200, comment.to_json())
