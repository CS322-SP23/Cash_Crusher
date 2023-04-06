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
    app.config['SECRET KEY'] = 'Cash Crusher'

    return app
