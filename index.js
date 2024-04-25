const questionEl = document.getElementById("question");
const formEl = document.getElementById("question-form");
const scoreEl = document.getElementById("score");
let score = parseInt(localStorage.getItem("score") || 0);

let storedAnswer;

// generate random no.
const randomInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
// generate random question and answer
const generateQuestion = () => {
  let randomno1 = randomInteger(1, 10);
  let randomno2 = randomInteger(1, 10);

  let questionType = randomInteger(1, 4);

  let firstNum;
  let secondNum;

  if (randomno1 > randomno2 && questionType > 2) {
    firstNum = randomno1;
    secondNum = randomno2;
  } else {
    firstNum = randomno2;
    secondNum = randomno1;
  }

  let question;
  let answer;
  switch (questionType) {
    case 1:
      question = `What is ${firstNum} multiply by ${secondNum}?`;
      answer = firstNum * secondNum;
      break;
    case 2:
      question = `What is ${firstNum} added to ${secondNum}?`;
      answer = firstNum + secondNum;
      break;
    case 3:
      question = `What is ${firstNum} divided by ${secondNum}?`;
      answer = firstNum / secondNum;
      break;
    case 4:
      question = `What is ${secondNum} subtracted from ${firstNum}?`;
      answer = firstNum - secondNum;
      break;
    default:
      question = `What is ${secondNum} subtracted from ${firstNum}?`;
      answer = firstNum - secondNum;
      break;
  }
  return { question, answer };
};

const showQuestion = () => {
  const { answer, question } = generateQuestion();

  questionEl.innerText = question;
  scoreEl.innerText = +score;
  storedAnswer = answer;
};

const checkAnswer = (event) => {
  event.preventDefault();
  const formData = new FormData(formEl);
  const userAnswer = +formData.get("answer"); // or put + to convert string into no. i.e. +formData.get("answer")

  if (userAnswer === storedAnswer) {
    score += 1;
    Toastify({
      text: "Your answer is correct",
      className: "info",
      gravity: "bottom",
      position: "center",
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      },
    }).showToast();
  } else {
    score -= 1;
    Toastify({
      text: "Your answer is wrong",
      className: "info",
      gravity: "bottom",
      position: "center",
      style: {
        background: "linear-gradient(to right, #AA4A44, #96c93d)",
      },
    }).showToast();
  }

  scoreEl.innerText = score;

  localStorage.setItem("score", score);
  event.target.reset();
  showQuestion();
};

showQuestion();
