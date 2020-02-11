import boto3
import simplejson as json
import requests
import sys
import time
import base64


aws_config = {
    's3_bucket': 'example-bucket',
    'profile_name': 'example-role1'
    # 'profile_name': 'default'
}

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


# Getting secret from AWS Secrets Manager
def aws_get_secret(secret_name):

    # Setup profile for session
    if aws_config['profile_name'] != 'default':
        session = boto3.session.Session(profile_name=aws_config['profile_name'])
    else:
        session = boto3.session.Session()

    client = session.client(service_name='secretsmanager', region_name='eu-central-1')

    # Getting secret
    get_secret_value_response = client.get_secret_value(SecretId=secret_name)

    if 'SecretString' in get_secret_value_response:
        secret = get_secret_value_response['SecretString']
        return secret
    else:
        decoded_binary_secret = base64.b64decode(get_secret_value_response['SecretBinary'])
        return decoded_binary_secret


# Generating RDS IAM token
def aws_generate_db_auth_token():

    # If not local evironment, then...
    if aws_config['profile_name'] != 'default':
        boto3.setup_default_session(profile_name = aws_config['profile_name'])

    client = boto3.client('rds', region_name=db_config['region'])

    token = client.generate_db_auth_token(db_config['hostname'],db_config['port'],db_config['username'])
    return token


# Detemine the RDS status
def get_aws_rds_status():

    try:
        # If not local evironment, then...
        if aws_config['profile_name'] != 'default':
            boto3.setup_default_session(profile_name = aws_config['profile_name'])

        client = boto3.client('rds', region_name=db_config['region'])

        # If instance is already turned on, return, else try to turn it on
        response = client.describe_db_instances(DBInstanceIdentifier=db_config['database'])
        state = response['DBInstances'][0]['DBInstanceStatus']
        return state

    except Exception as e:
        print(e)
        print("RDB INSTANCE STATUS COULDN'T BE DETERMINED.")
        sys.exit(1)


# Turning on RDS instance if it's not turned on
def aws_turn_on_rds():

    try:
        # If not local evironment, then...
        if aws_config['profile_name'] != 'default':
            boto3.setup_default_session(profile_name = aws_config['profile_name'])

        client = boto3.client('rds', region_name=db_config['region'])

        # If instance is already turned on, return, else try to turn it on
        response = client.describe_db_instances(DBInstanceIdentifier=db_config['database'])
        state = response['DBInstances'][0]['DBInstanceStatus']
        if state == 'available':
            print('RDB INSTANCE IS ALREADY TURNED ON.')
            return
        else:
            client.start_db_instance(DBInstanceIdentifier=db_config['database'])

        # Waiting until instance is turned on
        while(True):
            response = client.describe_db_instances(DBInstanceIdentifier=db_config['database'])
            state = response['DBInstances'][0]['DBInstanceStatus']
            if(state == 'available'):
                print( 'RDB INSTANCE TURNED ON.')
                return
            time.sleep(10)

    except Exception as e:
        print(e)
        print("RDB INSTANCE COULDN'T BE TURNED ON.")
        sys.exit(1)


# Turning off RDS instance if it's not turned off
def aws_turn_off_rds():

    try:
        # If not local evironment, then...
        if aws_config['profile_name'] != 'default':
            boto3.setup_default_session(profile_name = aws_config['profile_name'])

        client = boto3.client('rds', region_name=db_config['region'])

        # If instance is already turned off, return, else try to turn it off
        response = client.describe_db_instances(DBInstanceIdentifier=db_config['database'])
        state = response['DBInstances'][0]['DBInstanceStatus']
        if state == 'stopped':
            print('RDB INSTANCE IS ALREADY TURNED OFF.')
            return
        else:
            client.stop_db_instance(DBInstanceIdentifier=db_config['database'])

        # Waiting until instance is turned off
        while(True):
            response = client.describe_db_instances(DBInstanceIdentifier=db_config['database'])
            state = response['DBInstances'][0]['DBInstanceStatus']
            if(state == 'stopped'):
                print('RDB INSTANCE TURNED OFF.')
                return
            time.sleep(10)

    except Exception as e:
        print(e)
        print("RDB INSTANCE COULDN'T BE TURNED OFF.")

        sys.exit(1)


# Putting data to S3 bucket
def aws_s3_upload(data, filename):

    # If not local evironment, then...
    if aws_config['profile_name'] != 'default':
        boto3.setup_default_session(profile_name = aws_config['profile_name'])

    data_str = json.dumps(data, ensure_ascii=False).encode('utf8')

    s3 = boto3.resource('s3')
    s3_object = s3.Object(aws_config['s3_bucket'], filename)
    s3_object.put(Body=data_str)


# Downloading JSON file from S3 bucket and converting it into JSON object
def aws_s3_download_json(filename):

    # If not local evironment, then...
    if aws_config['profile_name'] != 'default':
        boto3.setup_default_session(profile_name = aws_config['profile_name'])

    s3 = boto3.resource('s3')
    s3_object = s3.Object(aws_config['s3_bucket'], filename)
    data = s3_object.get()['Body'].read()

    data_json = json.loads(data)
    return data_json
