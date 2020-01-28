
import pymysql

db_config = {
    'region': 'eu-central-1',
    'hostname': 'projname.generated.eu-central-1.rds.amazonaws.com',
    'port': 6508,
    'username': 'technical',
    'password': 'password',
    'database': 'projname',
    'ca_path': 'rds-combined-ca-bundle.pem',
    'charset': 'utf8mb4',
    'autocommit': False
}

select_query = 'SELECT col_1, col_2 FROM my_table;'
insert_statement = 'INSERT INTO my_table (col_1, col_2) VALUES (%s,%s)'

insert_task_data_params = [('a',1),('b',2)]


def process_query(cursor):
    result = []
    for element in cursor:
        entry = {
            'Id': 1234567890,
            'Val_1': element[0],
            'Val_2': element[1]
        }
        result.append(entry)
    return result


if __name__== "__main__":

    connection = None
    cursor = None

    try:
        # Initializa connection
        connection = pymysql.connect(
            host = db_config['hostname'],
            port = db_config['port'],
            user = db_config['username'],
            password = db_config['password'],
            db = db_config['database'],
            ssl = {'ca': db_config['ca_path']},
            charset = db_config['charset'],
            autocommit = db_config['autocommit']
        )
        cursor = connection.cursor()

        # Execute
        cursor.execute(select_query)
        print(process_query(cursor))

        # Execute Many
        cursor.executemany(insert_statement, insert_task_data_params)
        print(cursor.rowcount)
        connection.commit()

        # Execute
        cursor.execute(select_query)
        print(process_query(cursor))

        # Close connection
        cursor.close()
        connection.close()

    except Exception as e:
        if(cursor):
            cursor.close()
        if(connection):
            connection.close()
    
    #finally:
    #    cursor.close()
    #    connection.close()
