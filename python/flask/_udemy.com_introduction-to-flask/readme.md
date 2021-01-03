
# Introduction to Flask

https://www.udemy.com/course/introduction-to-flask

## S01 Basics of Python For Flask

### S01/E01 Download and Install Python

### S01/E02 Download and Install Visual Studio Code

### S01/E03 Hello, World!

### S01/E04 Variables and User Input

### S01/E05 Conditional Statements

### S01/E06 Basics of Functions

## S02 Flask

### S02/E07 Introduction to Flask

- Micro Web Framework
- Jinja templating
- Development server and debugger
- Secure cookie support (client side sessions)
- Available extensions

```
pip install Flask
```

### S02/E08 First Flask Application

`app.py`:
```py
from flask import Flask
app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/hi')
def hi_world():
    return 'Hi, World!'

if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True)
```

```sh
python app.py
```

### S02/E09 Adding URL Variables

```py
from markupsafe import escape

@app.route('/user/<username>')
def show_user_profile(username):
    # show the user profile for that user
    return 'User %s' % escape(username)

@app.route('/post/<int:post_id>')
def show_user_profile(post_id):
    # show the post with given id, the id is an integer
    return 'Post %d' % post_id

@app.route('/user/<path:subpath>')
def show_user_profile(subpath):
    # show the subpath after /path/
    return 'Subpath %s' % escape(subpath)
```

- converter types - specifiy the type of argument:
  - string - (default) accepts any text without slash
  - int - accepts positive integers
  - float - accepts pisitive floating point values
  - path - like string but also accepts slashes
  - uuid - accepts UUID strings

`app.py`:
```py
# -||-
from markupsafe import escape
# -||-
@app.route('/user/<username>')
def user(username):
    return 'Welcome user: %s' %escape(username)
# -||-
```

in browser:
```
localhost:5000
localhost:5000/hi
localhost:5000/user/Bob
```

### S02/E10 HTTP Methods

```py
from flask import request

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        return do_the_login()
    else:
        return show_the_login_form()
```

### S02/E11 Static and Template Files

Generate URL for the file which is stored as `static/style.css`:
```py
url_for('static', filename='style.css')
```

Render template for the file which is stored as `template/hello.html`:
```py
render_template('hello.html', name=name)
```
Templates can use the full power of Jinja2.

`templates/hello.html`:
```html
<!doctype html>

<title>Hello from Flask</title>
{% if name %}
    <h1>Hello {{ name }} !</h1>
{% else %}
    <h1>Hello, World!</h1>
{% endif %}
```

`app.py`:
```py
from flask import Flask, render_template
# -||-
@app.route('/hello')
@app.route('/hello/<name>')
def hello(name=None):
    return render_template('hello.html', name=name)
# -||-
```

in browser:
```
localhost:5000/hello
localhost:5000/hello/Bob
```

### S02/E12 Accessing Request Data and File Uploading

#### Login example:
```py
@app.route('/login', methods=['GET', 'POST'])
def login():
    error = None
    if request.method == 'POST':
        if valid_login(request.form['username'], request.form['password']):
            return log_the_user_in(request.form['username'])
        else:
            error = 'Invalid username/password'
    # the code below is executed if the request method
    # was GET or the credential was invalid
    return render_template('login.html', error=error)
```

#### File upload:
in HTML form:
```
enctype="multipart/form-data"
```
Example with hardcoded file name:
```py
from flask import request

@app.route('/upload', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        f = request.files['the_file']
        f.save('/var/www/uploads/uploaded.txt')
```
Example with secure file name:
```py
from flask import request
from werkzeug.utils import secure_filemane

@app.route('/upload', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        f = request.files['the_file']
        f.save('/var/www/uploads/' + secure_filename(f.filename))
```

### S02/E13 Redirection and Error Handling

#### Redirect to another endpoint:
```py
from flask import abort, redirect, url_for

@app.route('/')
def index():
    return redirect(url_for('login'))
```

#### Abort request early:
```py
@app.route('/login')
def login():
    abort(401)
    this_is_never_executed()
```

#### Customize the error page:
```py
from flask import render_template

@app.errorhandler(404)
def page_not_found(error):
    return render_template('page_not_found.html'), 404
```
`templates/error.html`:
```html
<!doctype html>
<title>Error</title>
<h1>This is my custom Error page!</h1>
```

`app.py`:
```py
from flask import Flask, render_template, redirect, url_for
from markupsafe import escape

app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/hi')
def hi_world():
    return redirect(url_for('hello'))

@app.route('/user/<username>')
def user(username):
    return 'Welcome user: %s' %escape(username)

@app.route('/hello')
@app.route('/hello/<name>')
def hello(name=None):
    return render_template('hello.html', name=name)

@app.errorhandler(404)
def error(error):
    return render_template('error.html'), 404

if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True)
```

in browser:
```
localhost:5000/blablabla
# error page
```

### S02/E14 Cookies and Sessions

#### Access cookies
```py
from flask import request

@app.route('/')
def index():
    username = request.cookies.get('username')
    # use cookies.get(key) instead of cookies[key] to not get a
    # KeyError if the cookie is missing.
```

#### Set cookies
```py
from flask import make_response

@app.route('/')
def index():
    resp = make_response(render_template(...))
    resp.set_cookie('username', 'the username')
    return resp
```

#### Sessions

- store user specific information
- implemented on top of cookies and signs the cookies cryptographically
- user can look at the content of the cookie but not change it without the secret key

```py
from flask import Flask, session, redirect, url_for, request
from markupsafe import escape

app = Flask(__name__)

# Set the secret key to some random bytes. Keep this really secret!
app.secret_key = b'_5#y2L"F4Q8z\\n\\xec]\\'

@app.route('/')
def index():
    if 'username' in session:
        return 'Logged in as %s' % escape(session['username'])
    return 'You are not logged in'

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        session['username'] = request.form['username']
        return redirect(url_for('index'))
    return '''
        <form method="post">
            <p><input text=text name=username></p>
            <p><input text=submit value=Login></p>
        </form>
    '''

@app.route('/logout')
def logout():
    # remove the username from the session if it is there
    session.pop('username', None)
    return redirect(url_for('index'))
```
