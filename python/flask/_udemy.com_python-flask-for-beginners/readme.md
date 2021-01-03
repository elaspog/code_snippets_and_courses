
# Python Flask for Beginners

https://www.udemy.com/course/python-flask-for-beginners

## S01 Introduction

### S01/E01 Introduction - Course Layout

## S02 The Basics

### S02/E02 Creating a venv and installing Flask

```python
python -m venv venv

# windows
venv\Scripts\activate.bat

# osx or linux
source venv/bin/activate

deactivate

pip list
pip install Flask
pip list
```

### S02/E03 Creating your first, simple, text based Flask app!

`app.py`:
```python
#!python3

from flask import Flask

app = Flask(__name__)

@app.route('/potato')
def welcome():
    return 'This is my first Flask app! Yay!'

@app.route('/')
def rootpage():
    return 'THIS IS MY ROOT PAGE!'

@app.route('/bob')
def bobpage():
    return "Yo Bob! What's happening man!!"

app.run()
```

```sh
python app.py
# http://127.0.0.1:5000/
```

in browser:
```
http://127.0.0.1:5000/
http://127.0.0.1:5000/bob
http://127.0.0.1:5000/potato
```

### S02/E04 Handling HTTP GET and POST Request Methods in Flask

`app.py`:
```python
#!python3

from flask import Flask, request

app = Flask(__name__)

# -||–

@app.route('/method', methods=['GET', 'POST'])
def method():
    if request.method == 'POST':
        return "You've used a POST request!"
    else:
        return "I reckon you're probably using a GET request!"

app.run()
```

in browser:
```
# GET
http://127.0.0.1:5000/method
```

in Postman:
```
# GET or POST
http://127.0.0.1:5000/method
```

### S02/E05 Flask Folder Hierarchy

```
mkdir templates
mkdir static
```

## S03 Getting Technical!

### S03/E06 Getting started with Jinja2 HTML Templates

`templates/index.html`:
```html
<!doctype html>

<head>
  <title>Welcome Flask App</title>
</head>

<p>THIS IS MY ROOT PAGE!</p>

<p>THIS IS THE PROOF! I'm not lying..</p>
```

`app.py`:
```python
#!python3

from flask import Flask, request, render_template

app = Flask(__name__)

@app.route('/potato')
def welcome():
    return 'This is my first Flask app! Yay!'

@app.route('/')
def rootpage():
    return render_template("index.html")

@app.route('/bob')
def bobpage():
    return "Yo Bob! What's happening man!!"

@app.route('/method', methods=['GET', 'POST'])
def method():
    if request.method == 'POST':
        return "You've used a POST request!"
    else:
        return "I reckon you're probably using a GET request!"

app.run()
```

in browser:
```
# GET
http://127.0.0.1:5000/
http://127.0.0.1:5000/method
```

### S03/E07 Style your Flask app with CSS

https://purecss.io

`templates/index.html`:
```html
<!doctype html>

<head>
  <title>Welcome Flask App</title>
  <link rel="stylesheet" type="text/css" href="{{ url_for('static', filename='style.css') }}">
  <!--link rel="stylesheet" type="text/css" href="{{ url_for('static', filename='css/style.css') }}"-->
  <link rel="stylesheet" href="https://unpkg.com/purecss@2.0.3/build/pure-min.css" integrity="sha384-4ZPLezkTZTsojWFhpdFembdzFudphhoOzIunR1wH6g1WQDzCAiPvDyitaK67mp0+" crossorigin="anonymous">
</head>

<h1>THIS IS MY ROOT PAGE!</h1>

<body class="main">
  <p>THIS IS THE PROOF! I'm not lying..</p>
</body>
```

`static/style.css`:
```css
h1 {
    text-align: center;
}

.main {
    padding-left: 100px;
    padding-right: 100px;
    text-align: left;
    border: 10px solid blue;
}
```

### S03/E08-E09 Creating a Web Form in Flask: Part 1 - Part 2

`static/style.css`:
```css
h1 {
    text-align: center;
}

.main {
    padding-left: 100px;
    padding-right: 100px;
    text-align: left;
}
```

`templates/index.html`:
```html
<!doctype html>

<head>
  <title>Welcome Flask App</title>
  <link rel="stylesheet" type="text/css" href="{{ url_for('static', filename='style.css') }}">
  <link rel="stylesheet" href="https://unpkg.com/purecss@2.0.3/build/pure-min.css" integrity="sha384-4ZPLezkTZTsojWFhpdFembdzFudphhoOzIunR1wH6g1WQDzCAiPvDyitaK67mp0+" crossorigin="anonymous">
</head>

<h1>THIS IS MY ROOT PAGE!</h1>

<body>
  <div>
    <p>Please enter your name.</p>
    <form class="pure-form" method="POST" action="/">
      Name:<br>
      <input type="text" name="username"><br>
      Food:<br>
      <input type="text" name="userfood"><br>
      <button type="submit" class="pure-button pure-button-primary" value="Submit">Submit</button>
    </form>
  </div>

  <br>

  <div>
  {% if name %}
    <p>Welcome to my site {{ name }}!</p>
    <p>Your favourite food is {{ food }}</p>
  {% endif %}
  </div>

</body>
```

`app.py`:
```python
#!python3

from flask import Flask, request, render_template

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def rootpage():
    name = ''
    food = ''
    if request.method == 'POST' and 'username' in request.form:
        name = request.form.get('username')
        food = request.form.get('userfood')
    return render_template("index.html", name=name, food=food)

app.run()
```

## S04 Challenge

### S04/E10 BMI Calculator - Instructions

### S04/E11 Create a BMI Calculator in Flask!

```sh
mkdir bmi-calculator
cd bmi-calculator

python -m venv venv
venv\Scripts\Activate.bat

pip list
pip install Flask

touch app.py
mkdir templates
mkdir static
```

`app.py`:
```python
#!python3

from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def index():
    bmi = ''
    if request.method == 'POST' and 'weight' in request.form and 'height' in request.form:
        weight = float(request.form.get('weight'))
        height = float(request.form.get('height'))
        bmi = calc_bmi(weight, height)
    return render_template("bmi_calc.html", bmi=bmi)

def calc_bmi(weight, height):
    return round((weight / ((height / 100) ** 2)), 2)

app.run()
```

`bmi_calc.html`:
```html
<!doctype html>

<head>
  <title>Julian's BMI Calculator of Awesome</title>
  <link rel="stylesheet" href="https://unpkg.com/purecss@2.0.3/build/pure-min.css" integrity="sha384-4ZPLezkTZTsojWFhpdFembdzFudphhoOzIunR1wH6g1WQDzCAiPvDyitaK67mp0+" crossorigin="anonymous">
  <link rel="stylesheet" type="text/css" href="{{ url_for('static', filename='style.css') }}">
</head>

<h1>BMI Calculator</h1>

<body>
  <div class="main">
    <form class="pure-form" method="POST" action="/">
      Enter your weight in kgs:<br>
      <input type="text" name="weight"><br>
      Enter your height in cms:<br>
      <input type="text" name="height"><br>
      <button type="submit" class="pure-button pure-button-primary" value="Submit">Submit</button>
    </form>
  </div>

  <br>

  <div class="main">
    {% if bmi %}
      <p>Your BMI is {{ bmi }}</p>
    {% endif %}
  </div>
</body>
```

`static/style.css`:
```css
h1 {
    text-align: center;
}

.main {
    padding-left: 100px;
    padding-right: 100px;
    text-align: left;
}
```

## S05 Afterword

### S05/E12 Welcome to PyBites!

https://pybit.es
