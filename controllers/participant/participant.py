"""Simple robot controller."""

from controller import Robot
import sys

# Define the target motor position in radians.
target = 1

# Get pointer to the robot.
robot = Robot()

# Print the program output on the console
print("Move the motors of the Thymio II to position " + str(target) + ".")

# Set the target position of the left and right wheels motors.
robot.getDevice("motor.left").setPosition(target)
robot.getDevice("motor.right").setPosition(target)

# Run the simulation for 10 seconds
robot.step(10000)

# This is the simplest controller that works for this competition
# If you want to experiment with more complex functions, you can read the programming guide here:
# https://www.cyberbotics.com/doc/guide/controller-programming?tab-language=python
# or the Robot() documentation here:
# https://cyberbotics.com/doc/reference/robot?tab-language=python
