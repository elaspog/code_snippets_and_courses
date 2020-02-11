#!/usr/bin/env bash

USER=my_user
HOST_NAME=ec2-HOST-IP.eu-west-1.compute.amazonaws.com
RSA_KEY_PATH=../.ssh/rsa_key

DEPLOYMENT_DIR_PATH=/home/my_user/deployment/project_name
DEVELOPMENT_DIR_PATH=/home/my_user/development/docker-compose_projects/project_name

red=`tput setaf 1`
reset=`tput sgr 0`


# Deleting Folders
echo "${red}Deleting Folders${reset}"

ssh -i ${RSA_KEY_PATH} ${USER}@${HOST_NAME} "rm -Rf ${DEVELOPMENT_DIR_PATH}"
ssh -i ${RSA_KEY_PATH} ${USER}@${HOST_NAME} "rm -Rf ${DEPLOYMENT_DIR_PATH}"

ssh -i ${RSA_KEY_PATH} ${USER}@${HOST_NAME} "mkdir -p ${DEVELOPMENT_DIR_PATH}"
ssh -i ${RSA_KEY_PATH} ${USER}@${HOST_NAME} "mkdir -p ${DEPLOYMENT_DIR_PATH}"
ssh -i ${RSA_KEY_PATH} ${USER}@${HOST_NAME} "mkdir -p ${DEPLOYMENT_DIR_PATH}/ca"
ssh -i ${RSA_KEY_PATH} ${USER}@${HOST_NAME} "mkdir -p ${DEPLOYMENT_DIR_PATH}/cfg"
ssh -i ${RSA_KEY_PATH} ${USER}@${HOST_NAME} "mkdir -p ${DEPLOYMENT_DIR_PATH}/src"


# Copying Files
echo "${red}Copying Files${reset}"

scp -i ${RSA_KEY_PATH} ../docker_compose_project/docker-compose.yml ${USER}@${HOST_NAME}:${DEVELOPMENT_DIR_PATH}/docker-compose.yml

scp -i ${RSA_KEY_PATH} ../app/Dockerfile ${USER}@${HOST_NAME}:${DEPLOYMENT_DIR_PATH}/Dockerfile
scp -i ${RSA_KEY_PATH} ../app/requirements.txt ${USER}@${HOST_NAME}:${DEPLOYMENT_DIR_PATH}/requirements.txt

scp -i ${RSA_KEY_PATH} ../app/ca/rds-combined-ca-bundle.pem ${USER}@${HOST_NAME}:${DEPLOYMENT_DIR_PATH}/ca/rds-combined-ca-bundle.pem
scp -i ${RSA_KEY_PATH} ../app/cfg/config.py ${USER}@${HOST_NAME}:${DEPLOYMENT_DIR_PATH}/cfg/config.py
scp -i ${RSA_KEY_PATH} ../app/src/logger.py ${USER}@${HOST_NAME}:${DEPLOYMENT_DIR_PATH}/src/logger.py
scp -i ${RSA_KEY_PATH} ../app/src/util.py ${USER}@${HOST_NAME}:${DEPLOYMENT_DIR_PATH}/src/util.py
scp -i ${RSA_KEY_PATH} ../app/src/app.py ${USER}@${HOST_NAME}:${DEPLOYMENT_DIR_PATH}/src/app.py


# Kill Docker Containers
echo "${red}Kill Docker Containers${reset}"
ssh -i ${RSA_KEY_PATH} ${USER}@${HOST_NAME} "sudo docker ps -a | grep project_name | cut -d ' ' -f1 | xargs sudo docker kill"


# Remove Existing Docker Containers
echo "${red}Remove Existing Docker Containers${reset}"
ssh -i ${RSA_KEY_PATH} ${USER}@${HOST_NAME} "sudo docker ps -a | grep project_name | cut -d ' ' -f1 | xargs sudo docker rm"


# Remove Existing Docker Images
echo "${red}Remove Existing Docker Images${reset}"
ssh -i ${RSA_KEY_PATH} ${USER}@${HOST_NAME} "sudo docker images -a | grep project_name | awk '{print $3}' | xargs sudo docker rmi -f"


# Build Docker Image
echo "${red}Build Docker Image${reset}"
ssh -i ${RSA_KEY_PATH} ${USER}@${HOST_NAME} "cd ${DEVELOPMENT_DIR_PATH} ; sudo docker-compose build"


# Execute Docker Container
echo "${red}Execute Docker Container${reset}"
ssh -i ${RSA_KEY_PATH} ${USER}@${HOST_NAME} "cd ${DEVELOPMENT_DIR_PATH} ; sudo docker-compose run -d project_name"


COMMIT_HASH=$(git log --oneline | head -1)
echo "COMMIT_HASH: ${COMMIT_HASH}"


echo "${red}Finished.${reset}"
