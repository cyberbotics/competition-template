## Organizer setup

Here are the instructions for somebody who wants to organize a robotics simulation benchmark. The links in the rest of the setup are relative to the repository where this file is, so to be able to use them you should first [create your own repository](../../generate) from this template and go to its `ORGANIZER.md` file to continue reading the instructions.

You will then need to follow those steps (remember that you can open a link in a new tab by middle-clicking the link):

### GitHub settings

1. Go to the [Settings tab](../../settings):
   1. Under the General section, tick the "Template repository" box so that the competitors can easily make a copy of the simulation files.
2. You will need to setup a GitHub secret to be able to fetch your competitors' controllers:
   1. [Create a new Personal Access Token](../../../../settings/tokens/new). Give it a name to remember what it is for and set its "Expiration" to the end of the tournament. You can always set it to "No expiration" or recreate a token when it expires to allow the automated scripts to continue working. Tick the "repo" scope box, scroll down to the "Generate token" button and click it. Copy the generated code to your clipboard.
   1. Go to the repo's [secrets settings](../../settings/secrets/actions/new) to create a new repository secret. Name it "REPO_TOKEN". In the "Secret" text area, paste the Personal Access Token you just created and finally click the "Add secret" button.
3. You will also need to add three custom labels for the automation scripts: "registration", "pending" and "accepted"
   1. Go to the [Generate new labels action](../../actions/workflows/generate_labels.yml) page under the Actions tab. Click on "Run workflow" to create automatically the needed labels. It may take a few seconds to complete the workflow.

### Webots files

4. Replace/add all the files needed for your Webots simulation at the root of the repository, notably the folders:
   - [worlds](worlds) for your Webots scenario
   - [controllers](controllers) for your robot and supervisor controllers
   - [plugins](plugins) for the HTML robot windows
   - [protos](protos) if you need extra PROTOs

5. Make sure that inside the world file the supervisor node has the "synchronization" field set to TRUE and the **Robot node** has its **"synchronization" field set to FALSE**.
   - Note that on [webots.cloud](https://webots.cloud), the listing title of the benchmark and its hover description are defined in the Webots world file: more specifically, the **WorldInfo** node has a "title" and an "info" field which are parsed when submitting the world file to [webots.cloud](https://webots.cloud).

6. In order for the automated script to recover the competitors' score correctly, the supervisor needs to print the final performance of the robot controller in the format "performance:SCORE" to stdout (only the SCORE part needs to be changed, which should be a float number).
The score unit depends on the [metric](#supported-metrics) used for the benchmark which will be defined in [webots.yml](webots.yml#L6) that you will need to edit in the next step.

#### Supported metrics

| name          | description                                                                                            | score value             |
|---------------|--------------------------------------------------------------------------------------------------------|-------------------------|
| percent       | ranks users based on how close they are to a given objective                                           | a value between 0 and 1 |
| time-speed    | ranks users based on how quickly they complete the objective                                             | a time in seconds       |
| time-duration | ranks users based on how long they manage to perform a task (e.g., to maintain an inverted pendulum upright) | a time in seconds       |
| distance      | ranks users based on how far they manage to move something (including themselves)           | a distance in meters    |

### Benchmark specific files

7. Update the parameters inside [webots.yml](../../edit/main/webots.yml):
   - file: set the relative path to your world file.
   - maximum-duration: the maximum duration of an evaluation in seconds. Set it not too large to avoid long evaluations of broken controllers but not too short to have enough time to finish the task.
   - metric: defines the metric used for the benchmark. Use one of the values defined in the [metric table](#supported-metrics).
   - dockerCompose: it is a special path used by the integrated IDE and GitHub actions to locate the default robot controller. Change "edit_me" to the name of your main robot controller.
   1. Don't forget to commit your changes to save them.
8. When a controller is evaluated, Webots and the controller are run inside [Docker containers](https://www.docker.com/resources/what-container/). There are two Dockerfiles at the root of the repository, [Dockerfile](DockerFile) for the Webots container and [controller_Dockerfile](controller_Dockerfile) for the controller container which contains the setup of the competitor. The default [Dockerfile](Dockerfile) will launch in one docker a standard version of Webots with the world file defined in the [webots.yml](webots.yml#L4) file. The default [controller_Dockerfile](controller_Dockerfile) will launch in another docker, a python robot controller specified in [webots.yml](webots.yml#L7) that will communicate with the Webots process running in the first docker.
   - The default webots.cloud Docker image already has the tools needed to compile and run C, C++ and Python controllers. However, if you need a special environment (for example with specific libraries) for your simulation or supervisor controller you can configure the main [Dockerfile](DockerFile) as needed. Similarly, if competitors have special dependencies (like ROS 2, or some specific Python libraries) for their robot controllers, they will be able to configure their [controller_Dockerfile](controller_Dockerfile) accordingly.
9. Replace the three files of the [preview folder](/preview) with an example animation of your benchmark [recorded from Webots](https://cyberbotics.com/doc/guide/web-animation). Keep the same names for the files: animation.json, scene.x3d and thumbnail.jpg.

### README update

Some sections from the README file are used to generate the webots.cloud benchmark page: the title, the description and an information table. Make sure to edit them while keeping them inside their respective \<span\> tags.

Update the [README file](../../edit/main/README.md):

10. Change the title and the description section to describe your new scenario.
11. Update the different fields of the information section:
    - Difficulty: an idea of the benchmark's complexity (for example: Middle School, High School, Bachelor, Master, PhD...)
    - Robot: the name of the robot used in the benchmark
    - Language: the programming language of the example controller
    - Commitment: an idea of the time required to complete the benchmark (a few minutes, a couple of hours, a couple of days...)
12. Replace the two occurrences of "ORGANIZER_NAME" in the "How to participate" section with your GitHub username and one "ORGANIZER_REPOSITORY" with your repository name.
13. Remove the "Organizer setup" section at the top of the file.
14. Don't forget to commit your changes to save them.

### Webots.cloud submission

You can now submit your benchmark to [webots.cloud](https://benchmark.webots.cloud/benchmark) to share it with other people. On the website, in the "Benchmark" tab, click on "Add a new benchmark" and enter the URL to your .wbt world file located in the [worlds folder](./worlds/).

When you have submitted your benchmark to webots.cloud, change the link of the shield badge at the top of the [README file](../../edit/main/README.md) to your own webots.cloud page. You will then be able to easily go to the webots.cloud site to see your updated changes and your competitors will have a handy link to the leaderboard. This link is also used in the automated messages to your participants so make sure it points to the right page.

### Final test

To see if your repository is correctly configured, copy the URL of your repository and [register it](../../issues/new?assignees=&labels=registration&template=registration_form.yml&title=Registration+to+benchmark) to itself. The registration should work without any errors. If that is not the case, check the actions logs for clues on how to solve the problem.

Finally, once you completed all the previous steps, you can delete this file and your benchmark should be good to go!
