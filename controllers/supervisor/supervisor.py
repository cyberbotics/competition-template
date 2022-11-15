"""Supervisor of the Robot Programming benchmark."""

from controller import Supervisor
import os

supervisor = Supervisor()

timestep = int(supervisor.getBasicTimeStep())

thymio = supervisor.getFromDef("BENCHMARK_ROBOT")
translation = thymio.getField("translation")

tx = 0
ongoing_benchmark = True
while supervisor.step(timestep) != -1 and ongoing_benchmark:
    t = translation.getSFVec3f()
    if ongoing_benchmark:
        percent = 1 - abs(0.25 + t[0]) / 0.25
        if percent < 0:
            percent = 0
        if t[0] < -0.01 and abs(t[0] - tx) < 0.0001:  # away from starting position and not moving any more
            ongoing_benchmark = False
            name = 'Robot Programming'
            message = f'success:{name}:{percent}:{percent*100:.2f}%'
        else:
            message = f"percent:{percent}"
        supervisor.wwiSendText(message)
        tx = t[0]

print(f"Benchmark complete! Your performance was {message.split(':')[3]}")

# Performance output used by automated CI script
CI = os.environ.get("CI")
if CI:
    print(f"performance_line:{percent}")

supervisor.simulationSetMode(Supervisor.SIMULATION_MODE_PAUSE)
