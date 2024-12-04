from flask import Blueprint, render_template

auth = Blueprint('auth', __name__)

@auth.route('/login') # Se vogliamo metterlo nel index basta mettere ('/')
def login():
    return render_template("login.html")

@auth.route('/logout')
def logout():
    return render_template("logout.html")