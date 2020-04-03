
# MySQL Cheatsheet

## Command line

```
# start CLI
mysql -u root -h db_host -p

# dump database
# mysqldump -root -h <hostname> -p <database_name> > /tmp/db.sql
mysqldump -root -h localhost -p testdb > /tmp/db.sql
mysqldump -root -h db_host -p testdb > /tmp/db.sql
```

## MySQL CLI

```
show databases;
create database testdb;
use testdb;

create table info (name varchar(20), lastname varchar(20), age int(2));
show tables;
desc info;

insert into info values ('John', 'Doe', 21);
select * from info;
```
