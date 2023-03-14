FROM cyberbotics/webots.cloud:R2023b-ubuntu22.04-09.03.2023

# Copies all the files of the controllers folder into the docker container
RUN mkdir -p /usr/local/webots-project/controllers
COPY . /usr/local/webots-project/controllers

# Various setup commands
ENV PORT=1234
ARG WEBOTS_CONTROLLER_URL
ENV WEBOTS_CONTROLLER_URL=${WEBOTS_CONTROLLER_URL}
WORKDIR /usr/local/webots-project/controllers/participant

# We run the controller using the extern controller launcher
# https://cyberbotics.com/doc/guide/running-extern-robot-controllers?version=develop&tab-os=linux
# (In shell form to allow variable expansion)
ENTRYPOINT /usr/local/webots/webots-controller --robot-name="${WEBOTS_CONTROLLER_URL}" --port="${PORT}" participant.py
