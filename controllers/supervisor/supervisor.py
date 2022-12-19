"""Supervisor of the Robot Programming Competition."""

from controller import Supervisor
import os

supervisor = Supervisor()

timestep = int(supervisor.getBasicTimeStep())

thymio = supervisor.getFromDef("COMPETITION_ROBOT")
translation = thymio.getField("translation")

tx = 0
ongoing_competition = True
while supervisor.step(timestep) != -1 and ongoing_competition:
    t = translation.getSFVec3f()
    if ongoing_competition:
        percent = 1 - abs(0.25 + t[0]) / 0.25
        if percent < 0:
            percent = 0
        if t[0] < -0.01 and abs(t[0] - tx) < 0.0001:  # away from starting position and not moving any more
            ongoing_competition = False
            name = 'Robot Programming'
            message = f'success:{name}:{percent}:{percent*100:.2f}%'
        else:
            message = f"percent:{percent}"
        supervisor.wwiSendText(message)
        tx = t[0]

print(f"Competition complete! Your performance was {message.split(':')[3]}")

# Performance output used by automated CI script
CI = os.environ.get("CI")
if CI:
    print(f"performance:{percent}")

supervisor.simulationSetMode(Supervisor.SIMULATION_MODE_PAUSE)
