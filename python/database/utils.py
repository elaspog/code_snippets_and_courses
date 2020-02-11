
import pymysql
import mysql.connector


db_config = {
    'region': 'eu-central-1',
    'hostname': 'example_db.generated_string.eu-central-1.rds.amazonaws.com',
    'port': 6508,
    'username': 'technical',
    'database': 'example_db',
    'ca_path': '/app/ca/rds-combined-ca-bundle.pem',
    'charset': 'utf8mb4',
    'autocommit': False
}


# Connect to MySQL Database on RDS with generating token
def rds_db_connect():

    # Generate token
    token = "1234567890"

    connection = pymysql.connect(
        host = db_config['hostname'],
        port = db_config['port'],
        user = db_config['username'],
        password = token,
        db = db_config['database'],
        ssl = {'ca': db_config['ca_path']},
        charset = db_config['charset'],
        autocommit = db_config['autocommit']
    )
    return connection

# Connect to MySQL Database on RDS with generating token
def rds_db_connect_for_multi_statement():

    # Generate token
    token = "1234567890"

    config = {
        'host': db_config['hostname'],
        'port': db_config['port'],
        'user': db_config['username'],
        'password': token,
        'database': db_config['database'],
        'ssl_ca': db_config['ca_path'],
        'charset': db_config['charset'],
        'raise_on_warnings': True
    }
    return mysql.connector.connect( **config )

