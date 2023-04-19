"""
This module contains a Flask application for the Cash Crusher website.

"""

from flask import Flask

def create_app():
    """
    Creates a Flask application for the Cash Crusher website.
 
    :return: A Flask app object with a secret key set in its configuration.
    """
    app = Flask(__name__)
    app.config['SECRET KEY'] = 'Cash_Crusher_ASJ'

    from .views import views
    from .auth import auth

    app.register_blueprint(views, url_prefix='/')
    app.register_blueprint(auth, url_prefix='/')

    return app
