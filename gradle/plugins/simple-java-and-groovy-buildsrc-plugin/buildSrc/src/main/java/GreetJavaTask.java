
import org.gradle.api.DefaultTask;
import org.gradle.api.tasks.TaskAction;

public class GreetJavaTask extends DefaultTask {

	@TaskAction
	public void greetAction() {
		System.out.println("Hello Java Gradle Plugin");
	}

}
