const quizData = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Text Markup Language",
      "Hyper Tabular Markup Language",
      "None of these",
    ],
    correctOptionIndex: 0,
    attemptedOptionIndex: -1,
  },
  {
    question: "Which language runs in a web browser?",
    options: ["Java", "C", "Python", "JavaScript"],
    correctOptionIndex: 3,
    attemptedOptionIndex: -1,
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Cascading Style Sheets",
      "Colorful Style Sheets",
      "Creative Style Sheets",
      "Computer Style Sheets",
    ],
    correctOptionIndex: 0,
    attemptedOptionIndex: -1,
  },
  {
    question:
      "What is the correct syntax for referring to an external script called 'xxx.js'?",
    options: [
      "<script href='xxx.js'>",
      "<script name='xxx.js'>",
      "<script src='xxx.js'>",
      "<script file-'xxx.js'>",
    ],
    correctOptionIndex: 2,
    attemptedOptionIndex: -1,
  },
  {
    question: "Which HTML attribute is used to define inline styles?",
    options: ["class", "style", "font", "styles"],
    correctOptionIndex: 1,
    attemptedOptionIndex: -1,
  },
  {
    question: "Which is the correct CSS syntax?",
    options: [
      "body:color=black;",
      "{body;color:black}",
      "body{color:black;}",
      "{body:color=black;)",
    ],
    correctOptionIndex: 2,
    attemptedOptionIndex: -1,
  },
];

let currentQuestionIndex = 0;
let timeLeft = 30; //initializing timer to 30 seconds
let timer; //to store the timer reference
const options = document.querySelectorAll(".option");
const optionsContainer = document.querySelector(".options");
const navButtons = document.querySelector(".nav-buttons");
const navButton = document.querySelectorAll(".nav-button");
const message = document.querySelector(".message");
let score = 0; //initializing score to 0
let correct = 0;
let incorrect = 0;
document.querySelector(".score").innerText = score;

showQuestion();

//calling show question based on button pressed
navButtons.addEventListener("click", (e) => {
  if (e.target.classList.contains("nav-button")) {
    navButton[currentQuestionIndex].classList.remove("active");
    currentQuestionIndex = e.target.innerText - 1;
    showQuestion();
  }
});

//showing thw question when page loads
function showQuestion() {
  startTimer(); //starting the timer for each new question
  navButton[currentQuestionIndex].classList.add("active");
  const question = document.querySelector(".question");
  question.textContent = quizData[currentQuestionIndex].question;

  options.forEach((option, index) => {
    option.textContent = quizData[currentQuestionIndex].options[index];
  });
}

//adding timer to the question
function startTimer() {
  clearInterval(timer);
  timeLeft = 30;
  timer = setInterval(() => {
    document.querySelector(".time").innerText = timeLeft;
    timeLeft--;
    if (timeLeft <= 0) {
      clearInterval(timer);
      handleTimeout();
    }
  }, 1000);
}

//handling timeout
function handleTimeout() {
  message.innerText = "Time's up!";
  message.classList.add("incorrect");
  calculateScore(4);
  nextStep(); //calling next function to display next question or final message if all questions are attempted
}

//calling calculatescore according to the option chosen
optionsContainer.addEventListener("click", (e) => {
  //below check ensures each question is evaluated only once
  if (quizData[currentQuestionIndex].attemptedOptionIndex === -1) {
    if (e.target.classList.contains("option")) {
      const answeredIndex = quizData[currentQuestionIndex].options.indexOf(
        e.target.textContent
      );
      //   navButtons[currentQuestionIndex + 1].classList.add("attempted");
      calculateScore(answeredIndex, currentQuestionIndex);
    }
  }
});

//calculating score
function calculateScore(answeredIndex) {
  quizData[currentQuestionIndex].attemptedOptionIndex = answeredIndex; //updating the attempted option index
  navButton[currentQuestionIndex].classList.add("attempted");

  if (answeredIndex === 4) {
    score += 0;
  } else if (
    answeredIndex === quizData[currentQuestionIndex].correctOptionIndex
  ) {
    correct++;
    score += 4;
    message.innerText = "Correct Answer!";
    message.classList.add("correct");
    options[answeredIndex].classList.add("correct");
  } else {
    incorrect++;
    score--;
    message.innerText = "Incorrect Answer!";
    message.classList.add("incorrect");
    options[answeredIndex].classList.add("incorrect");
  }

  document.querySelector(".score").innerText = score; //updating score

  nextStep(); //calling next function to display next question or final message if all questions are attempted
}

//bringing control to next question and resetting required fields
function nextStep() {
  //checking if all questions are attempted or not
  if (quizData.every((q) => q.attemptedOptionIndex !== -1)) {
    //hiding previous elements
    document.querySelector(".question-container").style.display = "none";
    navButtons.style.display = "none";
    message.style.display = "none";
    document.querySelector(".time").innerText = "0";
    clearInterval(timer);
    displayFinalMessage();
  }

  //calling the next function

  setTimeout(() => {
    //resetting previous values
    navButton[currentQuestionIndex].classList.remove("active");
    message.classList.remove("incorrect", "correct");
    const answeredIndex = quizData[currentQuestionIndex].attemptedOptionIndex;
    if (answeredIndex < 4)
      options[answeredIndex].classList.remove("incorrect", "correct");
    document.querySelector(".message").innerText = ""; //clearing the message when new question is shown
    if (currentQuestionIndex + 1 < quizData.length) {
      currentQuestionIndex++;
      showQuestion();
    }
  }, 700); //delays the calling of next function to display message properly
}

//displaying final message
function displayFinalMessage() {
  //displaying the result elements
  document.querySelector(".result-container").classList.add("active");
  document.querySelector("#final-score").innerText = score;
  document.querySelector("#attempted-count").innerText = correct + incorrect;
  document.querySelector("#correct-count").innerText = correct;
  document.querySelector("#incorrect-count").innerText = incorrect;
}

const restart = document.querySelector("#restart-button");
//restart the quiz
restart.addEventListener("click", () => {
  location.reload();
});
