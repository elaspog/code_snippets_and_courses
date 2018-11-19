#!/bin/bash
# Unix Batch-Script for sourcing by the deployer scripts
# Don't call it directly, this files is referenced in other shell scripts

# TODO:
#	Print messages to STDERR


WAS_ERROR_DURING_EXECUTION=false
ERROR_MESSAGES_DURING_RUN=( )

function note_warning() {
    retVal="$1"
    message="$2"
    if [[ "$retVal" -ne "0" ]] ; then
        WAS_ERROR_DURING_EXECUTION=true
        ERROR_MESSAGES_DURING_RUN+=("${message}")
    fi
}

function print_noted_warnings() {
    for error_msg in "${ERROR_MESSAGES_DURING_RUN[@]}"
    do
      echo "$(tput setaf 1)$error_msg$(tput sgr 0)"
    done
}

function print_checked_error() {
    retVal="$1"
    message="$2"
    command_to_execute="$3"
    if [[ "$retVal" -ne "0" ]] ; then
        echo "$(tput setaf 5)${message}$(tput sgr 0)"
        eval "$command_to_execute"
    fi
}

function handle_critical_error() {
    print_checked_error "$1" "$2" "$3"
    if [[ "$1" -ne "0" ]] ; then
        echo -e "$(tput setaf 1)${2}$(tput sgr 0)"
        exit $1
    fi
}


# In file which imports the above code

# checking the return value after a custom command
handle_critical_error $? "Error message while executing the command" "WAS_ERROR_DURING_EXECUTION=true"

# checking the return value after a custom command
retVal=$?
note_warning $retVal "Warning message while executing the command."

# TODO: can be moved to function
if ! $WAS_ERROR_DURING_EXECUTION ; then
    echo "Success"
else
    echo "Success with warnings: #${#ERROR_MESSAGES_DURING_RUN[@]}"
    print_noted_warnings
fi
