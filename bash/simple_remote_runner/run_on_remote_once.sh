#!/usr/bin/env bash

USER=my_user
HOST_NAME=ec2-HOST-IP.eu-west-1.compute.amazonaws.com
RSA_KEY_PATH=../.ssh/rsa_key

red=`tput setaf 1`
green=`tput setaf 2`
reset=`tput sgr 0`

DOCKER_CONTAINERS="sudo docker ps -a | grep PROJECT_NAME | grep -v 'Exited' | awk '{print $1}'"
CONTAINERS=`ssh -i ${RSA_KEY_PATH} ${USER}@${HOST_NAME} "${DOCKER_CONTAINERS}"`

if [ -z "${CONTAINERS}" ];
then
	echo "${red}No running container has been found.${reset}"
	exit 0;
else
	CONTAINER_TO_USE=`echo "${CONTAINERS}" | head -1 | awk '{print $1}'`
	echo "${red}Container was found: ${green} ${CONTAINER_TO_USE} ${reset}"

	echo "${red}Execute Pyton application from Docker Container${reset}"
	EXECUTE_APPLICATION_FROM_DOCKER="sudo docker exec ${CONTAINER_TO_USE} python /app/run.py now"
	ssh -i ${RSA_KEY_PATH} ${USER}@${HOST_NAME} "${EXECUTE_APPLICATION_FROM_DOCKER}"

	echo "${red}Finished.${reset}"
fi
