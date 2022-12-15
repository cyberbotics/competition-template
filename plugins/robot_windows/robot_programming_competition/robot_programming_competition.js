import RobotWindow from 'https://cyberbotics.com/wwi/R2022b/RobotWindow.js';

window.robotWindow = new RobotWindow();
const competitionName = 'Robot Programming';
let competitionPerformance = 0;

const modal = document.querySelector(".modal");
const closeButton = document.querySelector(".close-button");

function toggleModal() {
  modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
  if (event.target === modal) {
    toggleModal();
  }
}

closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);

window.robotWindow.receive = function(message, robot) {
  if (message.startsWith('percent:'))
    document.getElementById('achievement').innerHTML = metricToString(parseFloat(message.substr(8)));
  else if (message.startsWith('success:')) {
    let competitionPerformance = message.split(':')[2]
    const competitionPerformanceString = metricToString(competitionPerformance);
    document.getElementById('achievement').innerHTML = competitionPerformanceString;
    document.getElementById('achievement').style.color = 'green';
    document.querySelector(".text").innerHTML =
      `
      <h2>${competitionName} complete</h2>
      <h3>Congratulations you finished the competition!</h3>
      <p>Your current performance is: <b style="color:green;">${competitionPerformanceString}</b></p>
      <p>If you want to submit your controller to the leaderboard, follow the instructions given by the "Register" button on the competition page.</p>
    `
    toggleModal()
  } else
    console.log("Received unknown message for robot '" + robot + "': '" + message + "'");

  function metricToString(metric) {
    return (metric * 100).toFixed(2) + '%';
  }
};
