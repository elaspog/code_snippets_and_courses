#!/bin/bash


DEFAULT_CONF="default.conf"
DIRECTORY="$( cd $( dirname ${BASH_SOURCE[0]} ) && pwd )"


###############################################################################
# Processing arguments                                                        #
###############################################################################

POSITIONAL=()
while [[ $# -gt 0 ]]
do
key="$1"

case $key in
    -c|--config)
    _CONFIG_FILE="$2"
    shift # past argument
    shift # past value
    ;;
    -u|--user)
    _USER_NAME="$2"
    shift # past argument
    shift # past value
    ;;
    -k|--rsapath)
    _RSA_PATH="$2"
    shift # past argument
    shift # past value
    ;;
    --default)
    _DEFAULT=YES
    shift # past argument
    ;;
    *)    # unknown option
    POSITIONAL+=("$1") # save it in an array for later
    shift # past argument
    ;;
esac
done
set -- "${POSITIONAL[@]}" # restore positional parameters


###############################################################################
# Loading values from the default.conf file                                   #
###############################################################################

echo ""

function load_config_if_exists() {
    if [[ ! -e "$1" ]]; then
        echo "$(tput setaf 5)Config file does not exist: '$1'$(tput sgr 0)"
    else
        source "$1"
        echo "Config file was loaded: '$1'"
    fi
}

load_config_if_exists "$DIRECTORY/$DEFAULT_CONF"
if [ ! -z "${_CONFIG_FILE}" ]; then
    load_config_if_exists "$DIRECTORY/$_CONFIG_FILE"
fi


###############################################################################
# Overwriting loaded values with parameters                                   #
###############################################################################

function override_variable_if_parameter_is_present() {
    variable_name=$1
    parameter_value=$2
    if [ ! -z "$parameter_value" ]; then
        eval "$variable_name=$parameter_value"
    fi
}

override_variable_if_parameter_is_present "USER_NAME" "${_USER_NAME}"
override_variable_if_parameter_is_present "RSA_PATH" "${_RSA_PATH}"
override_variable_if_parameter_is_present "DEFAULT" "${_DEFAULT}"


###############################################################################
# Printing applied values                                                     #
###############################################################################

echo -e ""
echo -e "\tUSER_NAME=$USER_NAME"
echo -e "\tRSA_PATH=$RSA_PATH"

