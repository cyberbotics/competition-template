import RobotWindow from 'https://cyberbotics.com/wwi/R2022b/RobotWindow.js';

window.robotWindow = new RobotWindow();
const benchmarkName = 'Robot Programming';
let benchmarkPerformance = 0;

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
    let benchmarkPerformance = message.split(':')[2]
    const benchmarkPerformanceString = metricToString(benchmarkPerformance);
    document.getElementById('achievement').innerHTML = benchmarkPerformanceString;
    document.getElementById('achievement').style.color = 'green';
    document.querySelector(".text").innerHTML = `
      <h2>${benchmarkName} complete</h2>
      <h3>Congratulations you finished the benchmark!</h3>
      <p>Your current performance is: <b style="color:green;">${benchmarkPerformanceString}</b></p>
      <p>If you want to submit your controller to the leaderboard, follow the instructions given by the "Register" button on the benchmark page.</p>
    `
    toggleModal()
  } else
    console.log("Received unknown message for robot '" + robot + "': '" + message + "'");

  function metricToString(metric) {
    return (metric * 100).toFixed(2) + '%';
  }
};