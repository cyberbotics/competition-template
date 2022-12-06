<span id="title">

# Benchmark Organizer Template

</span>

<!-- This is the shield badge where you can replace the webots.cloud link in brackets with your personal webots.cloud page -->
[![webots.cloud - Benchmark](https://img.shields.io/badge/webots.cloud-Benchmark-007ACC)](https://benchmark.webots.cloud/run?version=R2022b&url=https%3A%2F%2Fgithub.com%2Fcyberbotics%2Fbenchmark-template%2Fblob%2Fmain%2Fworlds%2Frobot_programming.wbt&type=benchmark)

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

First of all, sign in to your GitHub account or [create one](https://github.com/signup) if you don't have any.

### Summary

- Create your own participant repository from this template.
- If you set your repository as private, add this repository's creator as a collaborator.
- Push some modification on the main branch of your repository to automatically register and appear in the leader board.

### Create your own Participant Repository from this Template

1. [Click here](../../generate) to create your own repository automatically or do it manually by clicking on the green button "Use this template". If you get a 404 page it's probably because you are not connected to your GitHub account.
  - Fill the "Repository name" field with a name for your controller.
  - Choose the visibility of your controller, keep it "Public" if you don't care about people looking at your controller code otherwise set it to "Private".
  - Finally, click on the green button "Create repository from template".

You should continue reading this document on your **own** repository page and not the benchmark creator's repo. **This is important** in order to be able to use the links in the following sections.

#### If you set your Repository as Private, add the Organizer as a Collaborator

1. [Click here](../../settings/access) to go to the "Collaborators" setting page. You might need to confirm the access by re-entering your GitHub password.
1. You should see a "Manage access" box where you will see the current collaborators of the repo.
Click on the "Add people" and search for "ORGANIZER_NAME". When you found the organizer, add them to the repository.

#### Register

1. [Create a new Personal Access Token](../../../../settings/tokens/new). Give it a name referring to the benchmark to remember what it is for and set its "Expiration" to six months or so. You can always set it to "No expiration" or recreate a token when it expires to allow the automated scripts to continue working. Tick the "repo" scope box, scroll down to the "Generate token" button and click it. Copy the generated code to your clipboard.
1. Go to the repo's [secrets settings](../../settings/secrets/actions/new) to create a new repository secret. Name it "REPO_TOKEN". In the "Secret" text area, paste the Personal Access Token you just created and finally click the "Add secret" button.
1. Modify any file and push the modification to the main branch of your repository. A series of automated actions will take place in a few seconds. If everything went well, your repository should appear after some time in the leader board of the benchmark. If there was a problem, an issue will be open automatically on your repository by the organizer. You will have to read it, fix what is wrong and push the changes to your main branch to re-run the automated verification.

### Modify the Template Controller and/or Create your Own

Everything should be good to go, you can modify the main robot controller files in the controllers folder.

The supervisor controller is the special controller that is used to evaluate your controller's performance.
You can look at its source code to understand more in detail how your controller will be evaluated.
However, you should make modifications only in the main robot controller directory, as only this directory is taken into consideration during the evaluation process, all the other files being taken from the benchmark organizer repository.

Your controller is evaluated in a [Docker container](https://www.docker.com/resources/what-container/). If your robot controller has dependencies, such as some specific libraries, python modules or a complete ROS framework, be sure to update the [controller_Dockerfile](controller_Dockerfile) to include all these dependencies. The default Webots Docker container includes the tools needed to run and compile simple C, C++ and Python controllers.
