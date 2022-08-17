'use strict';
document.querySelector('#education-work').classList.add('hidden');
let numberCorrect = 0;
document.querySelector('.login').addEventListener('click', function () {
  let loginName = prompt('Please enter your first name to login:');
  if (loginName !== null && loginName !== '') {
    numberCorrect = 0;
    alert(
      `Greetings, ${loginName}! \n\nYou will be asked a series of yes or no questions, to see how much you know about the site owner. Good luck!`
    );
    let scubaAnswer = askQuestion('Does the site owner SCUBA dive?', 'Yes');
    let sailingAnswer = askQuestion('Does he like to sail?', 'Yes');
    let dogAnswer = askQuestion('Has the site owner been a dog trainer?', 'No');
    let sushiAnswer = askQuestion('Does he dislike sushi?', 'No');
    let droneAnswer = askQuestion(
      'Does the site owner have a commercial drone pilots license?',
      'Yes'
    );
    document.querySelector(
      '#about-me'
    ).textContent = `Well, ${loginName}, you've learned a little more about me, the site owner. You were ${
      scubaAnswer[1] ? 'right' : 'wrong'
    }. I like to SCUBA dive (I'm actually a Divemaster). And, you were ${
      sailingAnswer[1] ? 'spot on' : 'a little off'
    }. I actually do like to sail. I've even taught sailing on the San Francisco Bay. You answered ${dogAnswer[0].toLowerCase()} regarding me being a dog trainer. You ${
      dogAnswer[1] ? 'got' : 'missed'
    } that one. On the subject of sushi, you ${
      sushiAnswer[1] ? 'already know me' : "didn't quite get it"
    }. And, last but not least, your answer ${droneAnswer[0].toLowerCase()} was ${
      droneAnswer[1] ? 'correct' : 'not correct'
    }, I do have a commercial drone pilots license. All in all, you got ${numberCorrect} out of 5 answers right. You must ${
      numberCorrect >= 3 ? '' : 'not'
    } know me very well.`;
    document.querySelector('#education-work').classList.remove('hidden');
  } else {
    alert('Please enter a valid login name to continue.');
  }
});

const askQuestion = function (message, correctAnswer) {
  let goodAnswer = false;
  let answerCorrect = false;
  while (!goodAnswer) {
    let answer = prompt(message);
    if (answer != null) {
      answer = answer.toLowerCase();
      if (answer === 'yes' || answer === 'y') answer = 'Yes';
      if (answer === 'no' || answer === 'n') answer = 'No';
      if (answer === 'Yes' || answer === 'No') {
        if (answer === correctAnswer) {
          numberCorrect++;
          answerCorrect = true;
        }
        // console.log(
        //   `The correct answer to '${message}' is ${correctAnswer}. You answered ${answer}, which was ${
        //     answerCorrect ? 'CORRECT' : 'INCORRECT'
        //   }!`
        // );
        alert(
          `The correct answer to '${message}' is ${correctAnswer}. You answered ${answer}, which was ${
            answerCorrect ? 'CORRECT' : 'INCORRECT'
          }!`
        );
        return [answer, answerCorrect];
      }
    }
    alert('Please provide a valid entry of yes, no, y or n.');
  }
};
