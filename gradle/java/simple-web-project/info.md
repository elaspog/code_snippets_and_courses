
# Usage

If the gradle is not installed the examples can run by the following command from directory:

`<REPOSITORY>\gradle\java\simple-web-project > docker run -v ${PWD}:/home/gradle/project -w /home/gradle/project gradle build`
`<REPOSITORY>\gradle\java\simple-web-project > docker run -v ${PWD}:/home/gradle/project -w /home/gradle/project gradle jettyRun` (not working with new gradle)
