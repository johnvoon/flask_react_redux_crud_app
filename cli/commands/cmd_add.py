import click
import random
import itertools

from datetime import datetime
from faker import Faker
from flask import url_for

from server.app import create_app
from server.extensions import db
from server.blueprints.user.models import User
from server.blueprints.blog.models.post import Post
from server.blueprints.blog.models.comment import Comment
from server.blueprints.practice_area.models import PracticeArea
from server.blueprints.staff.models import Staff
from server.blueprints.client.models.client import Client
from server.blueprints.client.models.matter import Matter

# Create app context for database connection.
app = create_app()
db.app = app

fake = Faker('en_AU')


def _log_status(count, model_label):
    """
    Log the output of how many records were created.

    :param count: Amount created
    :type count: int
    :param model_label: Name of the model
    :type model_label: str
    :return: None
    """
    click.echo('Created {0} {1}'.format(count, model_label))

    return None


def _bulk_insert(model, data, label):
    """
    Perform bulk insert and log it.

    :param model: Model being affected
    :type model: SQLAlchemy
    :param data: Data to be saved
    :type data: list
    :param label: Label for the output
    :type label: str
    :param skip_delete: Optionally delete previous records
    :type skip_delete: bool
    :return: None
    """
    with app.app_context():
        model.query.delete()

        db.session.commit()
        db.engine.execute(model.__table__.insert(), data)

        _log_status(model.query.count(), label)

    return None


@click.group()
def cli():
    """ Add items to database. """
    pass


@click.command()
def practice_areas():
    """
    Generate practice areas.
    """
    click.echo('Working...')
    
    data = []
    practice_areas = ["Dispute Resolution", "Criminal Law", "Family Law", "Mergers & Acquisitions"]
    with app.app_context():
        img_srcs = [url_for('static', filename='images/400/glass-architecture.jpg'), 
                    url_for('static', filename='images/400/building.jpg'),
                    url_for('static', filename='images/400/ipad.jpg'),
                    url_for('static', filename='images/400/pencils.jpg'),
                    url_for('static', filename='images/400/team_meeting.jpg'),
                    url_for('static', filename='images/400/suit.jpg')]

    for area in practice_areas:
        img_src = random.choice(img_srcs)
        description = list(fake.paragraphs(nb=20))
        params = {
            'area': area,
            'img_src': img_src,
            'description': description
        }

        data.append(params)

    _bulk_insert(PracticeArea, data, 'practice areas')

@click.command()
def users():
    """
    Generate fake clients.
    """
    click.echo('Working...')

    data = []
    random_usernames = []
    with app.app_context():
        placeholder_user = url_for('static', filename='images/64/placeholder-user.png')

    for i in range(0, 99):
        random_usernames.append(fake.user_name())

    random_usernames.append(app.config['SEED_ADMIN_USERNAME'])
    random_usernames = list(set(random_usernames))

    for username in random_usernames:
        fake_datetime = fake.date_time_between(
            start_date='-1y', end_date='now').strftime('%s')
        created_on = datetime.utcfromtimestamp(
            float(fake_datetime)).strftime('%Y-%m-%dT%H:%M:%S Z')
        random_percent = random.random()
        role = 'public' if random_percent >= 0.5 \
               else 'staff' if random_percent >= 0.25 \
               else 'client'
        street_address = fake.building_number() + ' ' + fake.street_name()

        params = {
            'created_on': created_on,
            'updated_on': created_on,
            'role': role,
            'email': fake.email(),
            'username': username,
            'password': User.encrypt_password('password'),
            'first_name': fake.first_name(),
            'middle_name': fake.first_name(),
            'last_name': fake.last_name(),
            'unit_number': fake.building_number(),
            'street_address': street_address,
            'postcode': fake.postcode(),
            'state': fake.state(),
            'suburb': fake.city(),
            'country': 'Australia',
            'phone_number': fake.phone_number(),
            'sign_in_count': random.random() * 100,
            'current_sign_in_on': created_on,
            'current_sign_in_ip': fake.ipv4(),
            'last_sign_in_on': created_on,
            'last_sign_in_ip': fake.ipv4(),
            'photo': placeholder_user
        }

        if username == app.config['SEED_ADMIN_USERNAME']:
            password = User.encrypt_password(app.config['SEED_ADMIN_PASSWORD'])

            params['role'] = 'admin'
            params['password'] = password
            params['email'] = 'dev@local.host'

        data.append(params)

    _bulk_insert(User, data, 'users')

@click.command()
def staff():
    """
    Generate fake staff.
    """
    click.echo('Working...')

    data = []
    users = db.session.query(User).filter(User.role == 'staff')
    with app.app_context():
        img_srcs = [url_for('static', filename='images/400/glass-architecture.jpg'), 
                    url_for('static', filename='images/400/building.jpg'),
                    url_for('static', filename='images/400/ipad.jpg'),
                    url_for('static', filename='images/400/pencils.jpg'),
                    url_for('static', filename='images/400/team_meeting.jpg'),
                    url_for('static', filename='images/400/suit.jpg')]
    positions = ['Trainee Solicitor',
                 'Senior Partner',
                 'Associate',
                 'Business Development Manager',
                 'Senior Associate',
                 'Managing Partner',
                 'Office Manager',
                 'Secretary',
                 'Paralegal']
    practice_area_ids = db.session.query(PracticeArea.id).all()

    for user in users:
        fake_datetime = fake.date_time_between(
            start_date='-1y', end_date='now').strftime('%s')
        date_joined = datetime.utcfromtimestamp(
            float(fake_datetime)).strftime('%Y-%m-%d')

        params = {
            'date_joined': date_joined,
            'position': random.choice(positions),
            'img_src': random.choice(img_srcs),
            'user_id': user.id,
            'practice_area_id': random.choice(practice_area_ids)
        }

        data.append(params)

    _bulk_insert(Staff, data, 'staff')

@click.command()
def clients():
    """
    Generate fake clients.
    """
    click.echo('Working...')

    data = []
    users = db.session.query(User).filter(User.role == 'client')

    for user in users:
        params = {
            'user_id': user.id
        }

        data.append(params)

    _bulk_insert(Client, data, 'clients')

@click.command()
def posts():
    """
    Generate fake blog posts.
    """
    click.echo('Working...')

    random_titles = []
    data = []

    for i in range(0, 400):
        random_titles.append(fake.sentence(nb_words=6, variable_nb_words=True))

    random_titles = list(set(random_titles))
    with app.app_context():
        thumbnail_srcs = [url_for('static', filename='images/400/glass-architecture.jpg'), 
                          url_for('static', filename='images/400/building.jpg'),
                          url_for('static', filename='images/400/ipad.jpg'),
                          url_for('static', filename='images/400/pencils.jpg'),
                          url_for('static', filename='images/400/team_meeting.jpg'),
                          url_for('static', filename='images/400/suit.jpg')]
    thumbnail_srcs = itertools.cycle(thumbnail_srcs)
    with app.app_context():
        img_srcs = [url_for('static', filename='images/2000/glass-architecture.jpg'), 
                    url_for('static', filename='images/2000/building.jpg'),
                    url_for('static', filename='images/2000/ipad.jpg'),
                    url_for('static', filename='images/2000/pencils.jpg'),
                    url_for('static', filename='images/2000/team_meeting.jpg'),
                    url_for('static', filename='images/2000/suit.jpg')]
    img_srcs = itertools.cycle(img_srcs)
    author_ids = db.session.query(Staff.id).all()
    practice_area_ids = db.session.query(PracticeArea.id).all()
    views_counts = list(range(11))

    for title in random_titles:
        fake_datetime = fake.date_time_between(
            start_date='-1y', end_date='now').strftime('%s')
        created_on = datetime.utcfromtimestamp(
            float(fake_datetime)).strftime('%Y-%m-%dT%H:%M:%S Z')
        author_id = random.choice(author_ids)
        practice_area_id = random.choice(practice_area_ids)
        thumbnail_src = thumbnail_srcs.next()
        img_src = img_srcs.next()
        body = list(fake.paragraphs(nb=20))
        summary = fake.sentence(nb_words=10)
        view_count = random.choice(views_counts)

        params = {
            'created_on': created_on,
            'updated_on': created_on,
            'title': title,
            'body': body,
            'thumbnail_src': thumbnail_src,
            'img_src': img_src,
            'summary': summary,
            'author_id': author_id,
            'practice_area_id': practice_area_id,
            'view_count': view_count
        }

        data.append(params)

    _bulk_insert(Post, data, 'posts')

@click.command()
def comments():
    """
    Generate fake post comments.
    """
    click.echo('Working...')

    data = []
    post_ids = db.session.query(Post.id).all()
    user_ids = db.session.query(User.id).all()

    for i in range(0, 1000):
        fake_datetime = fake.date_time_between(
            start_date='-1y', end_date='now').strftime('%s')
        created_on = datetime.utcfromtimestamp(
            float(fake_datetime)).strftime('%Y-%m-%dT%H:%M:%S Z')
        user_id = random.choice(user_ids)
        post_id = random.choice(post_ids)
        content = fake.sentence(nb_words=10, variable_nb_words=True)

        params = {
            'created_on': created_on,
            'updated_on': created_on,
            'user_id': user_id,
            'post_id': post_id,
            'content': content
        }

        data.append(params)

    _bulk_insert(Comment, data, 'comments')

@click.command()
def matters():
    """
    Generate fake matters.
    """
    click.echo('Working...')

    data = []
    clients = db.session.query(Client).all()
    practice_area_ids = db.session.query(PracticeArea.id).all()
    descriptions = ['HCA 2232/2015', 
               'Acquisition of business', 
               'Issue of demand letter against X company', 
               'Visa application', 
               'Sale of business',
               'Preparation of mortgage']

    for idx, description in enumerate(descriptions):
        fake_datetime = fake.date_time_between(
            start_date='-1y', end_date='now').strftime('%s')
        file_open = datetime.utcfromtimestamp(
            float(fake_datetime)).strftime('%Y-%m-%d')
        params = {
            'description': description,
            'file_open': file_open,
            'practice_area_id': random.choice(practice_area_ids)
        }

        data.append(params)

    _bulk_insert(Matter, data, 'matters')

    matters = db.session.query(Matter).all()

    for client in clients:
        matter = random.choice(matters)
        matter.clients.append(client)
        db.session.add(matter)
        db.session.commit()

@click.command()
@click.pass_context
def all(ctx):
    """
    Generate all data.

    :param ctx:
    :return: None
    """
    ctx.invoke(practice_areas)
    ctx.invoke(users)
    ctx.invoke(staff)
    ctx.invoke(clients)
    ctx.invoke(posts)
    ctx.invoke(comments)
    ctx.invoke(matters)

    return None

cli.add_command(practice_areas)
cli.add_command(users)
cli.add_command(staff)
cli.add_command(clients)
cli.add_command(posts)
cli.add_command(comments)
cli.add_command(matters)
cli.add_command(all)
