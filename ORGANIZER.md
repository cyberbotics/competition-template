## Organizer Setup

Here are the instructions to organize your own simulation-based robot competition.
You will have to create and configure your own GitHub repository hosting your competition.
Then, you should register it at [webots.cloud](https://webots.cloud/competition) to start accepting participants and actually run the competition.
To proceed, simply follow the following steps and remember that you can open a link in a new tab by middle-clicking the link.

### 1. Create your own repository from this template

Your competition will be hosted on your own GitHub repository that you should [create now from this template](../../generate).
On the repository creation page, provide a name and a description for your competition repository.
Keep the default options, e.g., public repository, do not include all branches.
Press the green button to create your repository.

**Important: Once created, you should continue reading this ORGANIZER.md file on your own repository, so that the hyperlinks included in this file will point to your own repository files.**

### 2. GitHub Settings

- Under the General section of the [Settings tab](../../settings), tick the "Template repository" box so that the participants can easily make a copy of the simulation files.
- You will need to setup a GitHub secret to be able to fetch the controllers of your participants:
  - [Create a new Personal Access Token](../../../../settings/tokens/new). Give it a name to remember what it is for and set its "Expiration" to the end of the competition. You can always set it to "No expiration" or recreate a token when it expires to allow the automated scripts to continue working. Tick the "repo" scope box, scroll down to the "Generate token" button and click it. Copy the generated code to your clipboard.
  - Go to the [secrets settings](../../settings/secrets/actions/new) of your repository to create a new repository secret. Name it "REPO_TOKEN". In the "Secret" text area, paste the Personal Access Token you just created and finally click the "Add secret" button.
- You will need to add [webots-cloud](https://github.com/webots-cloud) as a collaborator with write access on your organizer repository, so that webots-cloud can start the [run workflow](.github/workflows/run.yml#L6) on your repository when participants push changes to their controllers:
  - [Click here](../../settings/access) to go to the "Collaborators" setting page.
  - You should see a "Manage access" box where you will see the current collaborators of the repo.
     Click on the "Add people", search for "webots-cloud" and add it to the repository with write access.

### 3. Webots Files

- Replace/add all the files needed for your Webots simulation at the root of the repository, notably the folders:
  - [controllers](controllers): it's where your robot and supervisor controllers will go. In competitions, there is at least one robot controller, typically named [participant](controllers/participant), that the participants will modify and one supervisor controller that will measure how well their controller performs. If you want to change the name of the participant controller, you will have to adapt the [README.md](README.md) and [webots.yml](webots.yml#L8) files accordingly.
  - [plugins](plugins): here goes the files for the [HTML robot windows](https://www.cyberbotics.com/doc/reference/robot-window-plugin) and for a [physics plugin](https://www.cyberbotics.com/doc/reference/physics-plugin) if needed.
  - [protos](protos): if you need extra [PROTOs](https://www.cyberbotics.com/doc/reference/proto), you can add them in this folder.
  - [worlds](worlds): it's where your world file will go. In competitions only one world file will be accessible to the online testing and automated evaluation (which you will define in [step 4.](#4-competition-specific-files)).
    - Make sure that inside your world file the **Robot node** of the robot controlled by the participant has its **"synchronization" field set to FALSE**. This is needed to avoid that a participant controller takes an unfair amount of CPU time, slowing down the simulation process.
      - Also the same **Robot node** should have its **"name" field set to "participant"**. This is needed connect the participant controller as an extern controller.
      - Update the [title](worlds/robot_programming.wbt#L13) and [info](worlds/robot_programming.wbt#L9-L12) fields of the [WorldInfo](worlds/robot_programming.wbt#L8) node. This is needed as [webots.cloud](https://webots.cloud) relies on these fields to display the competition information.

- In order for the automated script to recover the score of participants, the supervisor controller needs to print the final performance of the robot controller in the format "performance:SCORE" (only the SCORE part needs to be changed, which should be a float number).
The score unit depends on the [metric](#supported-metrics) used for the competition which will be defined in [webots.yml](webots.yml#L6) that you will need to edit in the next step.
The [higher_is_better](webots.yml#L7) boolean value determines whether a higher value for the metric is considered as a better or a worse performance.

#### Supported Metrics

| name     | description                                                                                            | score value             |
|----------|--------------------------------------------------------------------------------------------------------|-------------------------|
| percent  | ranks users based on how close they are to a given objective                                           | a value between 0 and 1 |
| time     | ranks users based on how quickly they complete the objective or how long they manage to perform a task | a time in seconds       |
| distance | ranks users based on how far they manage to move or how close they achieve a precise position          | a distance in meters    |
| ranking  | ranks users with respect to each other in duel-like confrontations                                     | an integer value        |

### 4. Competition Specific Files

- Update the parameters inside [webots.yml](../../edit/main/webots.yml):
  - file: set the relative path to your world file.
  - maximum-duration: the maximum duration of an evaluation in seconds. Set it not too large to avoid long evaluations of broken controllers but not too short to have enough time to finish the task.
  - metric: defines the metric used for the competition. Use one of the values defined in the [metric table](#supported-metrics).
  - higher_is_better: specify if a higher value for the metric should be considered as a better or a worse performance.
  - dockerCompose: it is a special path used by the integrated IDE and GitHub actions to locate the default robot controller. Change "participant" to the name of your main robot controller.
  - Don't forget to commit your changes to save them.
- When a controller is evaluated, Webots and the controller are run inside [Docker containers](https://www.docker.com/resources/what-container/). There are two Dockerfiles: one [at the root of the repository](Dockerfile), for the Webots container and another [inside the controllers folder](/controllers/Dockerfile) for the controller container which contains the setup of the participant. The [root Dockerfile](Dockerfile) will launch in a docker a standard version of Webots with the world file defined in the [webots.yml](webots.yml#L4) file. The [controller Dockerfile](/controllers/Dockerfile) will launch, in another docker, a python robot controller that will communicate with the Webots process running in the first docker. This is done to allow users to freely add dependencies if needed and to prevent any kind of cheating during the automated evaluation.
  - The default webots.cloud Docker image already has the tools needed to compile and run C, C++ and Python controllers but currently, the online tester can't compile C or C++ controllers for the participant's controller so only Python controllers are fully supported at the moment. The supervisor can still be in C or C++ if the make command is added to the [root Dockerfile](Dockerfile).
  - If you need a special environment (for example with specific libraries) for your simulation or supervisor controller you can configure the [root Dockerfile](Dockerfile) as needed. Similarly, if participants have special dependencies (like ROS 2, or some specific Python libraries) for their robot controllers, they will be able to configure their [controller Dockerfile](/controllers/Dockerfile) accordingly.
- Replace the three files of the [preview folder](/preview) with an example animation of your competition [recorded from Webots](https://cyberbotics.com/doc/guide/web-animation). Keep the same names for the files: animation.json, scene.x3d and thumbnail.jpg.

### 5. README Update

Some sections from the README file are used to generate the webots.cloud competition page: the title, the description and an information table. Make sure to edit them while keeping them inside their respective \<span\> tags.

Update the [README file](../../edit/main/README.md):

- Change the title and the description section to describe your new scenario. Make them the same as the title and description from the world file to avoid any inconsistencies between webots.cloud's listing and the repository's README.
- Update the different fields of the information section:
  - Difficulty: an idea of the complexity of the competition (for example: Middle School, High School, Bachelor, Master, PhD...)
  - Robot: the name of the robot used in the competition
  - Language: the programming language of the example controller
  - Commitment: an idea of the time required to participate in the competition (a few minutes, a couple of hours, a couple of days, a couple of months...)
- Replace the three occurrences of "ORGANIZER_USERNAME" with your own GitHub username.
- Replace the occurence of "ORGANIZER_REPOSITORY" with the name of your repository.
- Replace the occurence of "robot_programming.wbt" with your own world filename.
- Remove the "Organizer setup" section at the top of the file.
- Don't forget to commit your changes to save them.

### 6. Workflow Update

Edit [trigger.yml](../../edit/main/.github/workflows/trigger.yml) and replace "ORGANIZER_USERNAME/ORGANIZER_REPOSITORY" with your own competition repository, e.g., your GitHub organization name (or username) and your repository name.

### 7. Submission to webots.cloud

You can now submit your competition to [webots.cloud](https://webots.cloud/competition) to share it with other people. On the website, in the "Competition" tab, click on "Add a new competition" and enter the URL to your world file located in the [worlds folder](./worlds/) in the form `https://github.com/ORGANIZER_USERNAME/REPOSITORY/blob/main/worlds/WORLD_FILE.wbt`.

### 8. Final Test and Clean-up

The participants will register by creating a personal repository from this one and by pushing a modification of the robot controller to the main branch of their repository.

If your competition is correctly configured, the registration should work without any errors. If there is any problem, an issue will be opened on your repository with a description of the problem. There is a default timeout time of 10 minutes set in the [run workflow](.github/workflows/run.yml#L52). Typical competitions usually run under 5 minutes, so if there is a "The action has timed out" annotation in the GitHub Actions logs, this might be due to a problem with the supervisor or if the competition is very complex, a default timeout time too low that needs to be increased.

Finally, once you completed all the previous steps, you can delete this file and your competition should be live!

### 9. Sharing the Competition

You can share the [webots.cloud](https://webots.cloud) link which allows people to try the competition online and see the leaderboard or directly the repository link to get the registration instructions. A link to the repository will be also present on the [webots.cloud](https://webots.cloud/competition) site.

### 10. Removing the Competition from webots.cloud

If you want to remove your competition from webots.cloud:

- In the file [webots.yml](../../edit/main/webots.yml) set the "publish" field to false or delete completely this repo.
- On [webots.cloud](https://webots.cloud/competition), look for your competition and click on the synchronization icon in the "Updated" column.
- After a moment there should be message confirming that the competition was deleted from the database.

### 11. [optional] Using a Self-Hosted Runner with GPU Acceleration

It is possible to make the Webots simulations run way faster in the CI compared to GitHub CI machines.
In order to do so, you should set-up a [self-hosted runner](https://docs.github.com/en/actions/hosting-your-own-runners) and replace the [runs-on: ubuntu-20.04](.github/workflows/run.yml#L12) statement with your own runner: `runs-on: self-hosted`.

On the self-host runner machine, you should install a standard Ubuntu Linux distribution and the `jq` and `gh` packages:

```bash
apt install jq gh
```

You should also install docker following the [official instructions](https://docs.docker.com/engine/install/ubuntu/).

To benefit from OpenGL hardware acceleration, you should install the NVIDIA proprietary drivers on your self-hosted runner machine as well as the [nvidia-docker2](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/install-guide.html) package.

Finally, you will have to ensure the self-hosted runner will survive a reboot of the machine.
To do so, the machine should configured to automatically start the graphical user session on startup.
Also the `actions_runner/run.sh` should be started automatically.
This can be set in a `~/.config/autostart/` desktop launcher file for the user.

## Troubleshooting

Do not protect the main branch of your repository, otherwise, the run.yml workflow won't be able to commit back the updated [participants.json](participants.json) file and 3D animations.
