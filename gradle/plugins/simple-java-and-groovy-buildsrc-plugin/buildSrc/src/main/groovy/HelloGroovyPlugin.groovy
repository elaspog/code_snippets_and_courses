
import org.gradle.api.Plugin;
import org.gradle.api.Project;

class HelloGroovyPlugin implements Plugin<Project> {

	@Override
	void apply(Project project) {

		//project.task('greetGroovy') << {
		//	println 'Hello Groovy Gradle Plugin'
		//}

		project.task('greetGroovy') {
			doLast {
				println 'Hello Groovy Gradle Plugin'
			}
		}

	}
}
