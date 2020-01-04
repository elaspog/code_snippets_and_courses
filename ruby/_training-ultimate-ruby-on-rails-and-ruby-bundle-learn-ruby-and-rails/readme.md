# Ultimate Ruby on Rails and Ruby Bundle: Learn Ruby and Rails

https://www.udemy.com/course/ultimate-ruby-on-rails-and-ruby-bundle-learn-ruby-and-rails

## S01 Introduction

### S01/E01 Introduction

## S02 Ruby Programming

### S02/E02 Introduction

### S02/E03 Install Sublime and Git Bash

### S02/E04 Install Ruby

### S02/E05 Hello World - First Ruby Program

** hello.rb **

```
ruby --version
ruby hello.rb
```

### S02/E06 Printing To The Screen With Puts and Print

** hello.rb **

### S02/E07 String Manipulation

** hello.rb **

### S02/E08 Variables

** hello.rb **

### S02/E09 Getting User Input With Gets

** hello.rb **

### S02/E10 Simple Math

** hello.rb **

### S02/E11 Converting To An Integer

** hello.rb **

### S02/E12 Comparison Operators

** hello.rb **

### S02/E13 Assignment Operators

** hello.rb **

### S02/E14 If/Else Conditional Statments

** hello.rb **

### S02/E15 Arrays

** hello.rb **

### S02/E16 While Loops

** hello.rb **

### S02/E17 Each Loops

** hello.rb **

### S02/E18 Hashes

** hello.rb **

### S02/E19 Building FizzBuzz!

** hello.rb **

### S02/E20 Methods Part 1

** hello.rb **

### S02/E21 Methods Part 2

** hello.rb **

### S02/E22 Intro To Ruby Classes

https://ruby-doc.org/core-2.4.2/

### S02/E23 Ruby Classes Part 1

** hello.rb **

### S02/E24 Class Getters

** hello.rb **

### S02/E25 Class Setters

** hello.rb **

### S02/E26 Adding Perimeter and Area Methods

** hello.rb **

### S02/E27 Class Attr Accessor

** hello.rb **

### S02/E28 Creating a Draw Method

** hello.rb **

## S03 Install Ruby on Rails

### S03/E29 Ruby on Rails Overview

### S03/E30 Install Node.js

https://nodejs.org/en/

### S03/E31 Install Sublime and Git Bash Terminal

https://www.sublimetext.com

https://git-scm.com

### S03/E32 Create SSH Key

```
pwd
mkdir .ssh
cd .ssh
pwd
ls
clear
ssh-keygen.exe
ls  # id_rsa id_rsa.pub
```

### S03/E33 Install the Heroku Toolbelt

https://devcenter.heroku.com/articles/heroku-cli

```
heroku --version
```

### S03/E34 Install Ruby on Rails

https://rubyonrails.org

http://railsinstaller.org

### S03/E35 Create Test Project and Handle Errors

```
mkdir railstest
cd railstest
rails new tester
```

if error happens
```
gem install bundler
# in Gemfile:
# gem 'sqlite3' # uncomment this line
gem 'sqlite3', '< 1.4'

# in terminal:
bundle install
```

## S04 Build a To-Do List App With Ruby on Rails

### S04/E36 Create New Project and Run Server

```
rails new todo
cd todo
```

if error happens
```
gem install bundler
# in Gemfile:
# gem 'sqlite3' # uncomment this line
gem 'sqlite3', '< 1.4'

# in terminal:
bundle install
```

run rail server:
```
rails s
# localhost:3000
```

### S04/E37 Git

https://johnelder.org/code

```
git config --global user.name "Your Name"
git config --global user.email "you@youraddress.com"
git config --global push.default matching
git config --global alias.co checkout
git init
git add .
git commit -am "Initial Commit"
```

### S04/E38 Github.com

https://github.com/flatplanet

```
cat ~/.ssh/id_rsa.pub

git remote add origin git@github.com:flatplanet/todo.git
git push -u origin master

git commit add .
git commit -am "Tweaked Readme File"
```

### S04/E39 Rails Scaffold

```
# rails generate scaffold <database_name> <name>:<type> <name>:<type>
# rails generate scaffold lists description:string completed:boolean
rails g scaffold lists description:string completed:boolean
```

### S04/E40 Database Migration

**db/migrate/<timestamp>_create_lists.rb**  
**db/migrate/schema.rb**

1. create a migration
2. push the migration into the database

in the **<timestamp>_create_lists.rb** file modify the line:
```
# t.boolean :completed
t.boolean :completed, default: false
```

push the migration:
```
rake db:migrate
```

### S04/E41 Rake Routes and Views

*app/views/lists/**

```
rake routes
```

### S04/E42 Root Route

*config/routes.rb*  
*app/views/lists/index.html.erb*  
*app/controllers/lists_controller.rb*

https://guides.rubyonrails.org

https://api.rubyonrails.org

https://ruby-doc.org/core

Add index page in lists folder as root to *config/routes.rb*:

```
Rails.application.routes.draw do
  resources :lists
  root 'lists#index'
# ...
```

*app/controllers/lists_controller.rb*

```
def index
  @lists = List.all
end
```

https://codemy.com

### S04/E43 Views Walkthru

*app/views/lists/**

erb = embedded ruby

partials

### S04/E44 Install Bootstrap CSS

*app/assets/stylesheets/applications.css*  
**app/assets/stylesheets/bootstraply.css.scss**  
*app/assets/javascript/applications.js*  

https://getbootstrap.com

Gemfile = where to add third party functionalities

https://rubygems.org

```
gem 'bootstrap', '~> 4.1', '>= 4.1.1'
```

in *app/assets/stylesheets/applications.css* add or create the **app/assets/stylesheets/bootstraply.css.scss** with this content:
```
@import "bootstrap";
```

in *app/assets/javascript/applications.js* paste the following lines:
```
//= require jquery3
//= require popper
//= require bootstrap-sprockets
//= require_tree .
```

install gem:
```
bundle update
bundle install
```

restart the server

### S04/E45 Bootstrap CSS Walkthru

*app/views/layouts/application.html.erb*  
*app/views/lists/index.html.erb*  
*app/views/lists/**  

The `<%= yield %>` in *app/views/layouts/application.html.erb* includes any page.

```
<!-- mobile ready -->
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
...
<!-- bootstrap style -->
<div class="container">
  <%= yield %>
</div>
```

*app/views/lists/index.html.erb*:
```
<table class="table table-bordered">
...
</table>
...
<%= link_to 'Add Todo Item', new_list_path, class: 'btn btn-primary' %>
```

### S04/E46 Styling Todo Items

*app/views/lists/index.html.erb*

```
<% @list.each do |list| %>
  <% if list.completed %>
    <tr class="table-secondary">...</tr>
  <% else %>
    <tr>...</tr>
  <% end %>
<% end %>
```

### S04/E47 Strikethrough Text

**app/assets/stylesheets/bootstraply.css.scss**  
*app/views/lists/index.html.erb*

```
<td class="striker">...</td>
```

### S04/E48 Creating Links

*app/views/lists/index.html.erb*

```
rake routes
```

### S04/E49 Redirection

*app/controllers/list_controllers.erb*

Rails = MVC framework

### S04/E50 Flash Messages

*app/views/lists/index.html.erb*  
**app/views/lists/_flash.html.erb**  
*app/views/layouts/application.html.erb*

Example: `<%= notice %>`

Use partial:
```
<!-- bootstrap style -->
<div class="container">
  <%= render flash %>
  <%= yield %>
</div>
```

https://getbootstrap.com/docs/4.0/migration/

### S04/E51 Form On The Index Page

### S04/E52 Styling The Index Form

### S04/E53 Creating a Navbar

### S04/E54 Putting a Form on The Navbar

### S04/E55 Table Colors

### S04/E56 Style The Edit Page

### S04/E57 Delete Marked Items Button

### S04/E58 Delete All Items Button

### S04/E59 Checkbox Buttons

### S04/E60 Intro to Heroku Webhosting

https://heroku.com

in Gemfile:
```
group :development, :test do
  ...
end

group :development do
  gem 'sqlite3'
end

group :production do
  gem 'pg', '~> 0.21.0'
  gem 'rails_12factor', '~> 0.0.3'
end
```

```
bundle install --without production
```

### S04/E61 Pushing Code To Heroku

```
heroku --version
heroku login
heroku keys:add
heroku create
heroku rename eldertodo

git add .
git commit -am 'tweaked gemfile for pg heroku'
git push heroku master

heroku run rake db:migrate
```

### S04/E62 Domain Names With Heroku

### S04/E63 Update Video - Root Redirect
