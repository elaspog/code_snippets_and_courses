
# Usage

If the gradle is not installed the examples can run with the following command:

`docker run -v ${PWD}:/home/gradle/project -w /home/gradle/project -it <docker_image_name> gradle <task_name>`

e.g.:

`docker run -v ${PWD}:/home/gradle/project -w /home/gradle/project -it gradle:5.0 gradle <task_name>`
`docker run -v ${PWD}:/home/gradle/project -w /home/gradle/project -it gradle gradle <task_name>`
