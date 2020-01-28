#!/usr/bin/env python

import sys
import json

# if Python config is not in the same directory
sys.path.append('./cfg')

import config as cfg


if __name__== "__main__":

    print("\nPython Config: (./cfg/config.py)")

    print(cfg.simple_config['example_key_1'])
    cfg.simple_config['example_key_1'] = 'masked_value'
    print(cfg.simple_config['example_key_1'])

    print(cfg.complex_config['example_key_2']['username'])
    print(cfg.list_config[1])


    print("\nJSON Config (./cfg/config.json):")

    data = None
    with open('./cfg/config.json') as json_data_file:
        data = json.load(json_data_file)
    print(type(data))
    print(data)
    print(data['example_key_2']['username'])
