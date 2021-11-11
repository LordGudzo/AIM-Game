const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const timeGame = document.querySelector('#time');
const board = document.querySelector('#board');
const restart = document.querySelector('.restartGame')
let time = 0;
let points = 0;

/* skip first screen */
startBtn.addEventListener('click', (event) => {
  event.preventDefault();
  screens[0].classList.add('up');
})

/* Choice time and skip second screen */
timeList.addEventListener('click', (event) => {
  if (event.target.classList.contains('time-btn')){
    time = parseInt(event.target.getAttribute('data-time'));
    screens[1].classList.add('up');
    startGame();
  }
})

/* Deletes the circle on click and creates a new one */
board.addEventListener('click', event => {
  if (event.target.classList.contains('circle')) {
    points++;
    event.target.remove();
    createRandomCircle();
  }
})

/* Sets time and create first circle */
function startGame() {  
  setInterval(decreaseTime, 1000);
  createRandomCircle();
  timeGame.innerHTML = `00:${time}`;
}

/* Set actions for setInterval */
function decreaseTime () {
  if (time === 0) {
    finishGame();
  } else {
    let current = --time;
    if (current < 10){           
      timeGame.innerHTML = `00:0${time}`;
    } else {
      timeGame.innerHTML = `00:${time}`;
    }    
  }
}

/* Shows current points and if need reload game */
function finishGame() {
  timeGame.parentNode.style.display = 'none'; 
  board.innerHTML = `<h1>Cчет: <span class ="red">${points}`;  
  restart.style.display = "block";

  restart.addEventListener('click', event => {
    location.reload();
  })
}

/* Create circle with random size in the random place and add to the board */
function createRandomCircle() {
  const circle = document.createElement('div');
  circle.classList.add('circle');
  const size = getRandomNumber(10,60);
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  const {width, height} = board.getBoundingClientRect();
  const x = getRandomNumber(0,width - size);
  const y = getRandomNumber(0, height - size);
  circle.style.top = `${y}px`;
  circle.style.left = `${x}px`;
  board.append(circle);
}

/* Return random number in the range between maximum and minimum values */
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}