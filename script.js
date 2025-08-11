let score = 0;
let timeLeft = 60;
let timerId;
let currentAnswer;

// Detect if the user is on a mobile device
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
const answerInputField = document.getElementById('answerInput');

// Make readonly on mobile to block native keypad
if (isMobile) {
  answerInputField.setAttribute('readonly', true);
} else {
  answerInputField.removeAttribute('readonly');
}

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
  answerInputField.value = '';
  answerInputField.focus();
}

function checkAnswer() {
  const userAnswer = Number(answerInputField.value.trim());
  const feedback = document.getElementById('feedback');

  if (userAnswer === currentAnswer) {
    score++;
    document.getElementById('score').textContent = `Score: ${score}`;
    feedback.style.color = '#16a34a';
    feedback.textContent = '✔️ Correct!';
    setTimeout(randomQuestion, 500);
  } else {
    feedback.style.color = '#ef4444';
    feedback.textContent = '✖️ Wrong! Try again.';
    answerInputField.select();
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

// --- Event Listeners ---
document.getElementById('startBtn').onclick = startGame;
document.getElementById('submitBtn')?.addEventListener('click', checkAnswer);
answerInputField.onkeydown = e => {
  if (e.key === 'Enter') checkAnswer();
};

// On-screen keypad logic
document.querySelectorAll('#keypad .key').forEach(btn => {
  btn.addEventListener('click', () => {
    const val = btn.textContent;

    if (val === '⏎') {
      checkAnswer();
    } 
    else if (val === '⌫') {
      answerInputField.value = answerInputField.value.slice(0, -1);
    } 
    else if (val === '−') {
      if (answerInputField.value.startsWith('-')) {
        answerInputField.value = answerInputField.value.slice(1);
      } else {
        answerInputField.value = '-' + answerInputField.value;
      }
    } 
    else {
      answerInputField.value += val;
    }
  });
});
