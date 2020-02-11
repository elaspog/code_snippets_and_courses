import sys
import util


sql_insert = 'INSERT INTO run_results (log_dttm, step_name, step_state) VALUES (%s,%s,%s)'

# Logging result of steps to Slack and into RDS DB
def log_result(step_name, step_result):

    message = ""

    # Logging to standard output
    if(step_result == 'SUCCESS'):
        message = 'STEP {} RAN SUCCESSFULLY.'.format(step_name)
    else:
        message = 'ERROR OCCURRED DURING STEP: {}. ERROR MESSAGE: {}'.format(step_name, step_result)
    print(message)

    # Logging to Slack
    util.write_to_slack(message)

    # Logging to database
    connection = None
    cursor = None
    try:
        connection = util.rds_db_connect()
        cursor = connection.cursor()

        # SQL parameters for inserting results into DB
        now = util.get_now_datetime_str()
        insert_run_result_params = (now, step_name, step_result)

        # Logging into DB
        cursor.execute(sql_insert, insert_run_result_params)
        connection.commit()

        cursor.close()
        connection.close()

    except Exception as e:
        if(cursor):
            cursor.close()
        if(connection):
            connection.rollback()
            connection.close()
            
        print('ERROR OCCURRED DURING WRITING STEP RESULT INTO DB. ERROR MESSAGE: ' + str(e))