let score = 0;
let timeLeft = 60;
let timerId;
let currentAnswer;

function randomQuestion() {
  const a = Math.floor(Math.random() * 20);
  const b = Math.floor(Math.random() * 20);
  const operations = ['+', '-', '×'];
  const op = operations[Math.floor(Math.random() * operations.length)];

  if (op === '+') currentAnswer = a + b;
  else if (op === '-') currentAnswer = a - b;
  else currentAnswer = a * b;

  document.getElementById('question').textContent = `${a} ${op} ${b} = ?`;
  document.getElementById('feedback').textContent = '';
  const answerInput = document.getElementById('answerInput');
  answerInput.value = '';
  answerInput.focus();
}

function checkAnswer() {
  const userAnswer = Number(document.getElementById('answerInput').value);
  const feedback = document.getElementById('feedback');

  if (userAnswer === currentAnswer) {
    score++;
    document.getElementById('score').textContent = `Score: ${score}`;
    feedback.style.color = '#16a34a'; // green
    feedback.textContent = '✔️ Correct!';
    // Wait briefly to let player see feedback before next question
    setTimeout(randomQuestion, 500);
  } else {
    feedback.style.color = '#ef4444'; // red
    feedback.textContent = '✖️ Wrong! Try again.';
    document.getElementById('answerInput').select();
  }
}

function startGame() {
  score = 0;
  timeLeft = 60;
  document.getElementById('score').textContent = `Score: ${score}`;
  document.getElementById('startBtn').style.display = 'none';
  randomQuestion();
  document.getElementById('timer').textContent = `Time: ${timeLeft}s`;

  timerId = setInterval(() => {
    timeLeft--;
    document.getElementById('timer').textContent = `Time: ${timeLeft}s`;
    if (timeLeft <= 0) endGame();
  }, 1000);
}

function endGame() {
  clearInterval(timerId);
  document.getElementById('question').textContent = 'Game Over!';
  const feedback = document.getElementById('feedback');
  feedback.style.color = '#3b82f6';
  feedback.textContent = `Final Score: ${score}`;
  document.getElementById('timer').textContent = '';
  document.getElementById('startBtn').style.display = 'inline';
}

document.getElementById('submitBtn').onclick = checkAnswer;
document.getElementById('answerInput').onkeydown = e => {
  if (e.key === 'Enter') checkAnswer();
};
document.getElementById('startBtn').onclick = startGame;
