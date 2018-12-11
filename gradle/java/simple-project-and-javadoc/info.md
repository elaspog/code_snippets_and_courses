
# Usage

If the gradle is not installed the examples can run by the following command from directory:

`<REPOSITORY>\gradle\java\simple-project-and-javadoc > docker run -v ${PWD}:/home/gradle/project -w /home/gradle/project gradle tasks`

`<REPOSITORY>\gradle\java\simple-project-and-javadoc > docker run -v ${PWD}:/home/gradle/project -w /home/gradle/project gradle gradle build javadoc`
