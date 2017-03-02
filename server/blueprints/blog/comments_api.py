from flask import Blueprint, request
from flask_restful import Api, Resource
from server.blueprints.blog.models.comment import Comment
from lib.util_json import render_json
from flask_login import current_user

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
        content = request.form
        comment = Comment()
        comment.content = request.form.get('content')
        comment.user_id = current_user.id
        comment.post_id = request.form.get('postId')

        try: 
            comment.save()
        except:
            return render_json(500, {'message': "An error occurred whilst posting your comment."})
        
        return render_json(200, {'comment': comment.to_json()})

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
