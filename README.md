<span id="title">

# Benchmark organizer template

</span>

<!-- This is the shield badge where you can replace the webots.cloud link in brackets with your personal webots.cloud page -->
[![webots.cloud - Benchmark](https://img.shields.io/badge/webots.cloud-Benchmark-007ACC)](https://benchmark.webots.cloud/run?version=R2022b&url=https%3A%2F%2Fgithub.com%2Fcyberbotics%2Fbenchmark-template%2Fblob%2Fmain%2Fworlds%2Frobot_programming.wbt&type=benchmark)

<!-- TODO: add examples when available
## Benchmark examples

- <https://github.com/cyberbotics/robot-programming-benchmark-disabled>
- <https://github.com/cyberbotics/inverted-pendulum-benchmark-disabled>
-->
## Organizer setup

To organize your own benchmark, follow the instructions in the [ORGANIZER.md](../../blob/main/ORGANIZER.md) file.

---

## Description

<span id="description">

Write here a short description of your benchmark.

</span>

<img src="./preview/thumbnail.jpg" width="75%">

## Information

<span id="information">

- Difficulty: Middle School, High School, Bachelor, Master or PhD
- Robot: robot name
- Language: programming language of the controller template
- Commitment: amount of time needed to finish the benchmark

</span>

---

## How to participate

### Create your own entry repository from the template

1. ![Click here](../../generate) to create your own repository automatically or do it manually by clicking on the green button "Use this template":
   1. Fill the "Repository name" field with a name for your controller.
   1. Choose the visibility of your controller, keep it "Public" if you don't care about people looking at your controller code otherwise set it to "Private".
   1. Finally, click on the green button "Create repository from template".

You should now be on your **own** repository page and not the benchmark creator's repo. **This is important** in order to be able to use the links in the following chapters.

#### If you set your repository as private, add the organizer as collaborator

1. ![Click here](../../settings/access) to go to the "Collaborators" setting page
   1. You might need to confirm the access by re-entering your GitHub password.
1. You should see a "Manage access" box where you will see the current collaborators of the repo.
Click on the "Add people" and search for "ORGANIZER_NAME". When you found the organizer, add them to the repository.

### Register by posting an issue

1. Go back to the main page of your repository if that is not the case and copy the repository URL from the address bar to your clipboard.
1. ![Click here](https://github.com/ORGANIZER_NAME/ORGANIZER_REPOSITORY/issues/new?assignees=&labels=registration&template=registration_form.yml&title=Registration+to+benchmark) to go to the organizer repository and start your registration. If it doesn't work, you can do it manually by going to the organizer's repository, then to the "Issues" tab, creating a new issue and choosing "Registration to benchmark".
1. Paste your repository URL in the URL field and click the "Submit new issue" button.

A series of automated actions will take place in a few seconds. If everything went well, you should get a message saying that you are successfully registered to the benchmark. If there was a problem, read the feedback message, fix what is wrong and post a **"retry"** comment on the registration issue to re-run the automated verification.

This issue page is important, as it will allow you to post commands to interact with the evaluation bot, mainly to update your score with a **"run"** command. To save this link somewhere, you can edit this [README file](../../edit/main/README.md) and change the following line with your link:

INSERT YOUR LINK HERE

The available commands are:

- **"run"**: this will execute an automated test of your controller and update the leaderboard with its performance and the animation files.
- **"unregister"**: use this command if you want to unregister your controller from the leaderboard.

### Modify the template controller and/or create your own one

Everything should be good to go, you can modify the main controller files in the controllers folder.

The supervisor controller is the special controller that is used to evaluate your controller's performance. You can look at its source code to understand more in detail how your controller will be evaluated but changing it won't influence your final performance in the leaderboard.

Your controller is evaluated in a [Docker container](https://www.docker.com/resources/what-container/). If your robot controller has dependencies, such as some specific libraries, python modules or a complete ROS framework, be sure to update the [controller_Dockerfile](controller_Dockerfile) to include all these dependencies. The default Webots Docker container includes the tools needed to run and compile simple C, C++ and Python controllers.
