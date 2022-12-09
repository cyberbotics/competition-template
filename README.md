<span id="title">

# Benchmark Organizer Template

</span>

<!-- This is the shield badge where you can replace the webots.cloud link in brackets with your personal webots.cloud page -->
[![webots.cloud - Benchmark](https://img.shields.io/badge/webots.cloud-Benchmark-007ACC)][1]

<!-- TODO: add examples when available
## Benchmark Examples

- <https://github.com/cyberbotics/robot-programming-benchmark-disabled>
- <https://github.com/cyberbotics/inverted-pendulum-benchmark-disabled>
-->
## Organizer Setup

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

## How to Participate

If not already done, [sign in](https://github.com/login) to your GitHub account or [create one](https://github.com/signup) if you don't have any.

### 1. Create your own Participant Repository from this Template

[Click here](../../generate) to create your own repository automatically or do it manually by clicking on the green button "Use this template". If you get a 404 page it's probably because you are not connected to your GitHub account.
- Fill the "Repository name" field with a name for your controller.
- Set the visibility of your repository to "Private" unless you don't care about people looking at your code.
- Finally, click on the green button "Create repository from template".

You should continue reading this document on your **own** repository page and not the benchmark creator's repo. **This is important** in order to be able to use the links in the following sections. Remember that you can open a link in a new tab by middle-clicking the link.

### 2. Add the Organizer as a Collaborator

You can skip this step if you created your repository as "Public" instead of "Private".

- [Click here](../../settings/access) to go to the "Collaborators" setting page. You might need to confirm the access by re-entering your GitHub password.
- You should see a "Manage access" box where you will see the current collaborators of the repo.
Click on the "Add people" and search for "ORGANIZER_NAME". When you found the organizer, add them to the repository.

### 3. Setup your Secret Token

In order to allow your repository to automatically trigger evaluations of your robot controller when you push modifications to the main branch, you will have to setup a secret token:

- [Create a new Personal Access Token](../../../../settings/tokens/new). Give it a name referring to the benchmark to remember what it is for and set its "Expiration" to six months or so. You can always set it to "No expiration" or recreate a token when it expires to allow the automated scripts to continue working. Tick the "public_repo" scope box and scroll down to click on the "Generate token" button. Copy the generated code to your clipboard.
- Go to the repo's [secrets settings](../../settings/secrets/actions/new) to create a new repository secret. Name it "TRIGGER_TOKEN". In the "Secret" text area, paste the Personal Access Token you just created and finally click the "Add secret" button.

### 4. Modify your Robot Controller

You can now modify your [main robot controller file](../../edit/main/controllers/edit_me/edit_me.py) or create new files in this folder and push the modification to the main branch of your repository.
A series of automated actions will take place in a few seconds.
If everything went well, your repository should appear after some time in the [leader board][1] of the benchmark.
If there was a problem, an [issue](../../issues) will be open automatically on your repository by the organizer.
You will have to read it, fix what is wrong and push the changes to your main branch to re-run the automated verification.

## Going Further

### Repository Structure

You repository contains many folders and files. However, you should make modifications only in [your robot controller directory](../../tree/main/controllers/edit_me), as only this directory is taken into consideration during the evaluation process, all the other files being taken from the benchmark organizer repository.

### Supervisor

The [supervisor controller](../../blob/main/controllers/supervisor/supervisor.py) is a special controller that evaluates the performance of your robot controller.
You should inspect its source code to understand more in detail how your controller will be evaluated.

### Webots

It is recommended to install [Webots](https://github.com/cyberbotics/webots/releases/latest) on your computer and to checkout your repository.
This will allow you to work on the robot controller and test immediately your changes by running the world file in Webots.
Once you are statisfied with your changes, you can push them to GitHub to trigger the evaluation of the new version of your robot controller.

*Note:* if you push your changes on a branch which is not the default branch of your repository, no evalution will be triggered.

### Docker

Your controller is evaluated in a [Docker container](https://www.docker.com/resources/what-container/). If your robot controller has dependencies, such as some specific libraries, python modules or a complete ROS framework, be sure to update the [controller_Dockerfile](controller_Dockerfile) to include all these dependencies. The default Webots Docker container includes the tools needed to run and compile simple C, C++ and Python controllers.

[1]: https://benchmark.webots.cloud/run?version=R2022b&url=https%3A%2F%2Fgithub.com%2Fcyberbotics%2Fbenchmark-template%2Fblob%2Fmain%2Fworlds%2Frobot_programming.wbt&type=benchmark "Leader Board"

