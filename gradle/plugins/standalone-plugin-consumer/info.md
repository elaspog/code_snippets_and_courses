
# Usage

The execution of this project depends on the existence of the plugin JAR in the 'repo' directory. If that JAR file is not present, it can be generated by executing the commands from 'build-number-or-generated-string-standalone-plugin' directory.

If the gradle is not installed the examples can run by the following command from directory:

`<REPOSITORY>\gradle\plugins > docker run -v ${PWD}:/home/gradle/project -w /home/gradle/project gradle gradle -b standalone-plugin-consumer/build.gradle clean build`

The META-INF/MANIFEST.MF file in the generated JAR will contain the results of the plugin execution.

An alternative result can be produced by uncommenting the "numberType" and "alphaNum" properties in the 'build.gradle' file.
