// helper function that allows customizable behavior of the mousedown event over buttons.
// it will repeatdly apply the action at a faster rate
function createActionButtonHandler(actionButton, action) {
  const DELAY = 300;
  const SPEED = 50;
  const RAMP = 125;

  let timeoutId;
  let intervalId;
  let actionInterval = DELAY; // Initial interval between actions
  const minInterval = SPEED; // Minimum interval between actions

  // Function to perform the action
  function performAction() {
    action();
  }

  // Function to handle button hold (this version prevents event bubbling)
  function handleButtonHold() {
    timeoutId = setTimeout(() => {
      performAction(); // Perform the action immediately
      intervalId = setInterval(performAction, actionInterval); // Set interval for repeated actions
      timeoutId = setTimeout(increaseActionSpeed, DELAY); // Increase action speed after 2 seconds
    }, DELAY);
  }

  // // Function to handle button hold (problem with event bubbling)
  // function handleButtonHold() {
  //   performAction(); // Perform the action immediately
  //   intervalId = setInterval(performAction, actionInterval); // Set interval for repeated actions
  //   timeoutId = setTimeout(increaseActionSpeed, DELAY); // Increase action speed after 2 seconds
  // }

  // Function to increase action speed
  function increaseActionSpeed() {
    clearInterval(intervalId); // Clear previous interval
    actionInterval = Math.max(actionInterval - RAMP, minInterval); // Decrease action interval
    intervalId = setInterval(performAction, actionInterval); // Set new interval
    timeoutId = setTimeout(increaseActionSpeed, DELAY); // Repeat every second to further increase speed
  }

  // Event listeners for button press and release
  actionButton.addEventListener('mousedown', handleButtonHold);
  actionButton.addEventListener('mouseup', stopAction);
  actionButton.addEventListener('mouseleave', stopAction);

  function stopAction() {
    clearInterval(intervalId); // Stop the interval
    clearTimeout(timeoutId); // Clear the timeout
    actionInterval = DELAY; // reset interval
  }

  return performAction;
}

export default createActionButtonHandler;