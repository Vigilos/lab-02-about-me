'use strict';

// Init DOM onjects and variables
document.querySelector('.reset').classList.add('hidden');
document.querySelector('#more-info').classList.add('hidden');
document.querySelector('#scores-table').classList.add('hidden');
let numberCorrect = 0;
let parksAnswersString = '';

// Initiate login and mandatory questions when button clicked
document.querySelector('.login').addEventListener('click', function () {
  document.querySelector('.login').classList.add('hidden'); // Hide Login button after clicked
  document.querySelector('.reset').classList.remove('hidden');
  let loginName = prompt('Please enter your first name to login:');
  if (loginName !== null && loginName !== '') {
    numberCorrect = 0;
    alert(
      `Greetings, ${loginName}! \n\nYou will be asked a series of yes or no questions, to see how much you know about the site owner. Good luck!`
    );

    // Begin About Me questions
    let scubaAnswer = askQuestion(
      'Does the site owner SCUBA dive?',
      'Yes',
      'yn'
    );
    let sailingAnswer = askQuestion('Does he like to sail?', 'Yes', 'yn');
    let dogAnswer = askQuestion(
      'Has the site owner been a dog trainer?',
      'No',
      'yn'
    );
    let sushiAnswer = askQuestion('Does he dislike sushi?', 'No', 'yn');
    let droneAnswer = askQuestion(
      'Does the site owner have a commercial drone pilots license?',
      'Yes',
      'yn'
    );

    // Setup for and ask random number guessing question
    let aboutMeScore = numberCorrect;
    let randomNumber = Math.floor(Math.random() * 10) + 1;
    let numberGuessScore = askQuestion(
      'I am thinking of a number between 1 and 10. You have a total of four guesses (within the range) to get it right and get a point.  Take a guess at what the number is:',
      randomNumber,
      'num'
    );

    // Setup for and ask question with multiple possible answers
    const parksAnswers = [
      'yosemite',
      'yellowstone',
      'grand canyon',
      'pinnicles',
      'chiricahua',
    ];
    let parksGuessScore = askQuestion(
      "Guess at least one of favorite national parks that I've visited (you have 6 tries):",
      parksAnswers,
      'multi'
    );

    // Display all the correct answers from the multiple answers quetions
    for (let park of parksAnswers) {
      parksAnswersString += '\n' + park;
    }
    alert(`All the possible correct answers were: ${parksAnswersString}`);

    // Create and display the About Me paragraph on DOM
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
    }, I do have a commercial drone pilots license. All in all, you got ${aboutMeScore} out of 5 answers right. You must ${
      numberCorrect >= 3 ? '' : 'not'
    } know me very well.`;

    // Display scores for each quetions section to DOM
    document.querySelector('#about-me-score').textContent = aboutMeScore;
    document.querySelector('#guess-number-score').textContent =
      numberGuessScore;
    document.querySelector('#parks-score').textContent = parksGuessScore;
    document.querySelector('#total-score').textContent =
      aboutMeScore + numberGuessScore + parksGuessScore;
    document.querySelector('#more-info').classList.remove('hidden');
    document.querySelector('#scores-table').classList.remove('hidden');
  } else {
    alert('Please enter a valid login name to continue.');
  }
});

document.querySelector('.reset').addEventListener('click', function () {
  window.location.reload();
});

// Declare fucntion to ask and process all types of questions
const askQuestion = function (message, correctAnswer, questionType) {
  let answerCorrect = false;
  let answerCount = 0;
  let errOccur = false; // Add error handling later
  while (!errOccur) {
    let answer = prompt(message);
    if (answer != null) {
      // Handle for Yes/No questions
      if (questionType === 'yn') {
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

        // Handle for number questions
      } else if (questionType === 'num') {
        if (answer < 1 || answer > 10) {
          alert('Please provide a number between 1 and 10. Try again!');
        } else if (answer < correctAnswer) {
          answerCount++;
          alert("You're guess was too low. Try again!");
        } else if (answer > correctAnswer) {
          answerCount++;
          alert("You're answer was too high. Try again!");
        } else if (answer == correctAnswer) {
          alert('You got it! Nice!');
          numberCorrect++;
          return 1;
        } else {
          alert('Please provide a number for this question. Try again!');
        }
        if (answerCount === 4) {
          alert(
            `I'm sorry you weren't able to guess the right number. The number was ${correctAnswer}. Maybe next time 😉`
          );
          return 0;
        }

        // Handle for multiple answer questions (i.e. array)
      } else if (questionType === 'multi') {
        answer = answer.toLowerCase();
        for (let park of correctAnswer) {
          if (answer === park) {
            numberCorrect++;
            alert('You guessed one of my national park favorites! Great job!');
            return 1;
          }
        }
        answerCount++;
        if (answerCount === 6) {
          alert(
            "I'm sorry you weren't able to guess any of my favorite parks. Maybe next time 😟"
          );
          return 0;
        }
      }
    } else {
      alert('Please provide a valid entry!');
    }
  }
};
