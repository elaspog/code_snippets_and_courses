
# Usage

If the gradle is not installed the examples can run by the following command from directory:

`<REPOSITORY>\gradle\plugins > docker run -v ${PWD}:/home/gradle/project -w /home/gradle/project gradle gradle -b build-number-or-generated-string-standalone-plugin/build.gradle uploadArchives`
