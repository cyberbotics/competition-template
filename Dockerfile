# TODO: change to cyberbotics/webots.cloud:R2023a when available
FROM leoduggan/webots.cloud-anim-edit:latest

# Copy all the benchmark files into a project directory (need to have the same name as the theia folder from webots.yml)
RUN mkdir -p /usr/local/webots-project
COPY . /usr/local/webots-project

# The world file path is extracted from webots.yml and is given by the build-arg:
ARG WORLD_PATH
ENV WORLD_PATH=${WORLD_PATH}

# If called with no arguments, launch in headless mode
# (for instance, on the simulation server of webots.cloud, the GUI is launched to stream it to the user and a different command is used)
# - Launching Webots in shell mode to be able to read stdout from benchmark_record_action script
CMD xvfb-run -e /dev/stdout -a webots --stdout --stderr --batch --mode=fast --no-rendering /usr/local/webots-project/${WORLD_PATH}
