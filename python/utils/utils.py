
import datetime
from pytz import timezone
import base64
import hashlib
import simplejson as json
import requests


# Read SQL files for execution
def read_file_as_sql_string(file_path):

    str_data = None
    with open(file_path, 'r') as file:
        str_data = file.read().strip()
        str_data = " ".join(str_data.replace("\n", " ").split())

    return str_data


# Get formatted datetime of now moment
def get_now_datetime_str(datetime_format='%Y-%m-%d %H:%M:%S', time_zone="Europe/Budapest"):

    now = None
    ret_datetime = None
    try:
        tz = timezone(time_zone)
        now = datetime.datetime.now(tz)
        ret_datetime = now.strftime(datetime_format)
    except Exception as e:
        raise(e)

    return now, ret_datetime


# Getting data from REST API and converting it into JSON object
def http_get_json(endpoint, params, headers):

    # HTTP GET
    result = requests.get(url=endpoint, params=params, headers=headers)

    # We need it if we want requests library to raise exception for 4xx and 5xx errors
    # result.raise_for_status()

    result_json = result.json()
    return result_json


# Data from/for Example API (depends on command string)
endpoint='http://api.example-site.com/example-endpoint'
def example_request_with_payload(command, password, data=None):

    if password == None \
        or command not in ["get", "insert"] \
        or (command == "get" and data != None) \
        or (command == "insert" and data == None):
        return

    payload = {'command': command, 'passw': password}

    if data:
        data_json = json.dumps(data, ensure_ascii=False)
        payload['data'] = data_json

    return requests.post(endpoint, data=payload)


# Generating interval (from first day of last month until today)
interval_config = {
    'from': "",
    'to': ""
}
def gen_interval():

    if(interval_config['from'] and interval_config['to']):
        return {'from': interval_config['from'], 'to': interval_config['to']}
    else:
        # Today
        today = datetime.date.today()

        # First day of last month
        first_day_of_this_month = today.replace(day=1)
        last_day_of_last_month = first_day_of_this_month - datetime.timedelta(days=1)
        first_day_of_last_month = last_day_of_last_month.replace(day=1)

        return {'from': first_day_of_last_month.strftime('%Y-%m-%d'), 'to': today.strftime('%Y-%m-%d')}


# Generating password for accessing API
def generate_password():

    tz = timezone("Europe/Budapest")
    now = datetime.datetime.now(tz)

    passw_string = 'API_' + now.strftime('%Y-%m-%d %H')
    passw_sha256 = hashlib.sha256(passw_string.encode('utf-8')).digest()
    passw_base64 = base64.b64encode(passw_sha256).decode('utf-8')

    return passw_base64
