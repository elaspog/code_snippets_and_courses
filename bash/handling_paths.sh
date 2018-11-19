#!/bin/bash

echo "SCRIPT ARGUMENT : ${0}"
echo "SCRIPT_LOCATION : ${SCRIPT_LOCATION}"
echo "SCRIPT_PATH     : ${SCRIPT_PATH}"
echo "DIST_PATH       : ${DIST_PATH}"

DIRECTORY="$( cd $( dirname ${BASH_SOURCE[0]} ) && pwd )"
echo "${DIRECTORY}"
