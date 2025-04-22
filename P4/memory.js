// Referencias DOM
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const dimSelect = document.getElementById('dimension');
const movesSpan = document.getElementById('moves');
const timerSpan = document.getElementById('timer');

// Referencias audio
const bgMusic = document.getElementById('bgMusic');
const flipSound = document.getElementById('flipSound');
const matchSound = document.getElementById('matchSound');

// Ajuste volumen de música de fondo
bgMusic.volume = 0.5;
matchSound.volume = Math.min(1.0, matchSound.volume + 1.1);

// Fuentes de imágenes
const MAX_IMAGES = 18;
const faceSources = Array.from({ length: MAX_IMAGES }, (_, i) => `images/${i+1}.png`);
const backSource = `images/back.png`;
const boardBgSource = `images/board_bg.jpg`;
let faceImages = [];
let backImage;
let boardBgImage;

// Precarga de imágenes
function preloadImages(callback) {
  let count = 0;
  const total = faceSources.length + 3;

  backImage = new Image(); backImage.src = backSource;
  backImage.onload = backImage.onerror = checkAll;

  boardBgImage = new Image(); boardBgImage.src = boardBgSource;
  boardBgImage.onload = boardBgImage.onerror = checkAll;

  faceSources.forEach(src => {
    const img = new Image(); img.src = src;
    img.onload = img.onerror = () => { faceImages.push(img); checkAll(); };
  });

  function checkAll() {
    count++;
    if (count === total) callback();
  }
}

// Variables del juego
let dimension, totalCards, cellSize;
let boardImages = [];
let flipped = [];
let matchedIndices = [];
let matches = 0;
let moves = 0;
let timerInterval;
let secondsElapsed = 0;
let gameStarted = false;
let animating = false;

dimSelect.disabled = false;

// Eventos
startBtn.addEventListener('click', () => {
  if (faceImages.length === 0) preloadImages(startGame);
  else startGame();
});
resetBtn.addEventListener('click', resetGame);
canvas.addEventListener('click', onCanvasClick);

// Inicia una nueva partida
function startGame() {
  canvas.style.display = 'block';

  dimension = parseInt(dimSelect.value);
  totalCards = dimension * dimension;
  cellSize = canvas.width / dimension;

  bgMusic.currentTime = 0;
  bgMusic.play();

  const pairCount = totalCards / 2;
  const imgs = shuffle(faceImages).slice(0, pairCount);
  boardImages = shuffle([...imgs, ...imgs]);

  flipped = [];
  matchedIndices = [];
  matches = 0;
  moves = 0;
  secondsElapsed = 0;
  movesSpan.textContent = moves;
  timerSpan.textContent = formatTime(0);

  gameStarted = true;
  dimSelect.disabled = true;
  startBtn.disabled = true;
  resetBtn.disabled = false;

  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    secondsElapsed++;
    timerSpan.textContent = formatTime(secondsElapsed);
  }, 1000);

  drawBoard();
}

// Reiniciar partida
function resetGame() {
  canvas.style.display = 'none';

  clearInterval(timerInterval);
  gameStarted = false;
  dimSelect.disabled = false;
  startBtn.disabled = false;
  resetBtn.disabled = true;
  movesSpan.textContent = '0';
  timerSpan.textContent = '00:00';
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  bgMusic.pause();
}

// Maneja clics en canvas con detección precisa
function onCanvasClick(e) {
  if (!gameStarted || animating) return;
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  const x0 = (e.clientX - rect.left) * scaleX;
  const y0 = (e.clientY - rect.top) * scaleY;

  const col = Math.floor(x0 / cellSize);
  const row = Math.floor(y0 / cellSize);
  if (col < 0 || col >= dimension || row < 0 || row >= dimension) return;
  const idx = row * dimension + col;

  const { x, y, w, h } = getCardRect(idx);
  if (x0 < x || x0 > x + w || y0 < y || y0 > y + h) return;
  if (flipped.includes(idx) || matchedIndices.includes(idx)) return;

  animating = true;
  flipSound.currentTime = 0;
  flipSound.play();
  animateFlip(idx, true, 500, () => {
    moves++;
    movesSpan.textContent = moves;
    if (flipped.length === 2) handleMatch();
    else animating = false;
  });
}

function handleMatch() {
  const [a, b] = flipped;
  if (boardImages[a] === boardImages[b]) {
    matchedIndices.push(a, b);
    matchSound.currentTime = 0;
    matchSound.play();
    matches++;
    flipped = [];
    animating = false;
    if (matches === totalCards / 2) endGame();
  } else {
    setTimeout(() => {
      animateFlip(a, false, 500, () => {
        animateFlip(b, false, 500, () => { animating = false; });
      });
    }, 800);
  }
}

function endGame() {
  clearInterval(timerInterval);
  setTimeout(() => {
    alert(`¡Has ganado en ${moves} movimientos y ${formatTime(secondsElapsed)}!`);
  }, 200);
}

// Animación flip
function animateFlip(idx, showFace, duration, callback) {
  const start = performance.now();
  let toggled = false;
  function step(time) {
    const t = Math.min((time - start) / duration, 1);
    const scale = t < 0.5 ? 1 - t * 2 : (t - 0.5) * 2;
    if (t >= 0.5 && !toggled) {
      toggled = true;
      if (showFace) flipped.push(idx);
      else flipped = flipped.filter(i => i !== idx);
    }
    drawBoard({ animate: idx, scale });
    if (t < 1) requestAnimationFrame(step);
    else callback();
  }
  requestAnimationFrame(step);
}

// Dibuja tablero
function drawBoard(opts = {}) {
  for (let i = 0; i < totalCards; i++) {
    if (opts.animate === i) drawFlippingCard(i, opts.scale);
    else drawCard(i);
  }
}
// ... resto del código sin cambios ...
function drawCard(idx) {
  const { x, y, w, h } = getCardRect(idx);
  if (flipped.includes(idx) || matchedIndices.includes(idx)) {
    drawRoundedRect(x, y, w, h, 10, null, boardImages[idx]);
  } else {
    drawRoundedRect(x, y, w, h, 10, null, backImage);
  }
}

function drawFlippingCard(idx, scale) {
  const { x, y, w, h } = getCardRect(idx);
  const w2 = w * Math.abs(scale);
  const dx = (w - w2) / 2;
  ctx.save();
  ctx.translate(x + dx, y);
  const isFace = flipped.includes(idx) || matchedIndices.includes(idx);
  const img = isFace ? boardImages[idx] : backImage;
  drawRoundedRect(0, 0, w2, h, 10, null, img);
  ctx.restore();
}

function getCardRect(idx) {
  const col = idx % dimension;
  const row = Math.floor(idx / dimension);
  const cell = cellSize;
  const w = cell * 0.6;
  const h = cell * 0.9;
  const x = col * cell + (cell - w) / 2;
  const y = row * cell + (cell - h) / 2;
  return { x, y, w, h };
}

function drawRoundedRect(x, y, w, h, r, fillColor = null, image = null) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.arcTo(x + w, y, x + w, y + r, r);
  ctx.lineTo(x + w, y + h - r);
  ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
  ctx.lineTo(x + r, y + h);
  ctx.arcTo(x, y + h, x, y + h - r, r);
  ctx.lineTo(x, y + r);
  ctx.arcTo(x, y, x + r, y, r);
  ctx.closePath();
  if (image) {
    ctx.save();
    ctx.clip();
    ctx.drawImage(image, x, y, w, h);
    ctx.restore();
  } else if (fillColor) {
    ctx.fillStyle = fillColor;
    ctx.fill();
  }
}

function getClickIndex(e) {
  const rect = canvas.getBoundingClientRect();
  const col = Math.floor((e.clientX - rect.left) / cellSize);
  const row = Math.floor((e.clientY - rect.top) / cellSize);
  return row * dimension + col;
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function formatTime(sec) {
  const m = String(Math.floor(sec / 60)).padStart(2, '0');
  const s = String(sec % 60).padStart(2, '0');
  return `${m}:${s}`;
}