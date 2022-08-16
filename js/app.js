'use strict';
document.querySelector('.login').addEventListener('click', function () {
  let loginName = prompt('Please enter your first name to login:');
  if (loginName !== null && loginName !== '') {
    alert(
      `Greetings, ${loginName}! \n\nYou will be asked a series of yes or no questions, to see how much you know about me. Good luck!`
    );
    let answer1 = askQuestion('Answer yes or no:', 'Yes');
  } else {
    alert('Please enter a valid login name to continue.');
  }
});

const askQuestion = function (message, correctAnswer) {
  let goodAnswer = false;
  while (!goodAnswer) {
    let answer = prompt(message);
    if (answer != null) {
      answer = answer.toLowerCase();
      if (answer === 'yes' || answer === 'y') answer = 'Yes';
      if (answer === 'no' || answer === 'n') answer = 'No';
      if (answer === 'Yes' || answer === 'No') {
        console.log(
          `The answer to '${message}' is ${correctAnswer}. You were ${
            answer === correctAnswer ? 'CORRECT' : 'INCORRECT'
          }!`
        );
        return answer;
      }
    }
    alert('Please provide a valid entry of yes, no, y or n.');
  }
};
