"""
This script creates and runs a Flask application for the Cash Crusher website.


"""

from website import create_app

app = create_app()

if __name__ == '__main__':
    app.run(debug=True)
