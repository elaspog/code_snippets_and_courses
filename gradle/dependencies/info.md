
# Usage

If the gradle is not installed the examples can run by the following command from directory:

`<REPOSITORY>\gradle\dependencies > docker run -v ${PWD}:/home/gradle/project -w /home/gradle/project gradle gradle dependencies`

`<REPOSITORY>\gradle\dependencies > docker run -v ${PWD}:/home/gradle/project -w /home/gradle/project gradle gradle displayJars`

`<REPOSITORY>\gradle\dependencies > docker run -v ${PWD}:/home/gradle/project -w /home/gradle/project gradle gradle shadowJar` (not working with new gradle)
