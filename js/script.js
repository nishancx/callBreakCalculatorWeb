var incDecVal = 1;
var round = 0;
var roundPoints = [];

function submitNames() {
  let nameInputs = document.querySelectorAll('.pni');
  nameInputs = Array.apply(null, nameInputs);
  nameInputs.forEach(nameInput => {
    if (nameInput.value == '') {
      boxShadowAlert(nameInput.id, 'red', 500);
    }
  });
  if (nameInputs.every(nameInput => nameInput.value != '')) {
    document.querySelector('#nameInput').style.opacity = '0';
    setTimeout(() => {
      document.querySelector('#nameInput').style.display = 'none';
    }, 200);
    let nameBlocks = document.querySelectorAll('.nameBlock');
    for (let i = 0; i < 4; i++) {
      nameBlocks[i].innerText = nameInputs[i].value
    }
  }
}

function boxShadowAlert(id, color, duration) {
  document.querySelector(`#${id}`).style.boxShadow = `0 0 5px 1px  ${color}`;
  setTimeout(() => {
    document.querySelector(`#${id}`).style.boxShadow = '';
  }, duration);

}

function increment(incrementer, index) {
  if (incDecVal == 1) {
    incrementer.previousElementSibling.innerText = parseInt(incrementer.previousElementSibling.innerText) + incDecVal;
  } else {
    if (incrementer.previousElementSibling.innerText == -Math.abs(roundPoints[index])) {
      incrementer.previousElementSibling.innerText = roundPoints[index];
    } else {
      incrementer.previousElementSibling.innerText = (parseFloat(incrementer.previousElementSibling.innerText) + incDecVal).toFixed(1);
    }
  }
}

function decrement(decrementer, index) {
  let score = decrementer.nextElementSibling.innerText;
  if (parseFloat(score) > 1) {
    if (incDecVal == 1) {
      decrementer.nextElementSibling.innerText = parseInt(score) - incDecVal;
    } else {
      if (score == parseInt(roundPoints[index])) {
        decrementer.nextElementSibling.innerText = -Math.abs(parseInt(roundPoints[index]));
      }
      decrementer.nextElementSibling.innerText = (parseFloat(score) - incDecVal).toFixed(1);
    }
  }
  if (score == parseInt(roundPoints[index]) && incDecVal == .1) {
    decrementer.nextElementSibling.innerText = -Math.abs(parseInt(roundPoints[index]));
  }
}

function startRound() {
  let scoreRow = document.querySelectorAll('.scoreRow')[round];
  let index = 0;
  Array.from(scoreRow.children).forEach(scoreBlock => {
    roundPoints[index++] = parseInt(Array.from(scoreBlock.children)[1].innerText);
    Array.from(scoreBlock.children)[1].innerText = Array.from(scoreBlock.children)[1].innerText + '.0';
  });
  incDecVal = .1;
  if (round == 4) {
    document.querySelector('#startNextRoundButton').innerText = 'Finish';
  }
  flipButtons();
}

function startNextRound() {
  if (round == 5) {
    startNewGame();
    return;
  }
  let scoreRow = document.querySelectorAll('.scoreRow')[round];
  let totalBlocks = document.querySelectorAll('.totalBlock');
  let index = 0;
  Array.from(scoreRow.children).forEach(scoreBlock => {
    Array.from(scoreBlock.children)[0].classList.add('displayNone');
    Array.from(scoreBlock.children)[2].classList.add('displayNone');
    scoreBlock.style.gridTemplateColumns = '1fr';
    if (round == 0) {
      totalBlocks[index].innerText = Array.from(scoreBlock.children)[1].innerText;
    } else {
      totalBlocks[index].innerText = (parseFloat(totalBlocks[index].innerText) + parseFloat(Array.from(scoreBlock.children)[1].innerText)).toFixed(1);
    }
    index++;
  });
  round++;
  if (round != 5) {
    document.querySelectorAll('.scoreRow')[round].style.display = 'grid';
  } else {
    document.querySelector('#startNextRoundButton').innerText = 'Start new game';
    return;
  }
  flipButtons();
  incDecVal = 1;
}

function flipButtons() {
  document.querySelector('#startRoundButton').classList.toggle('buttonInactive');
  document.querySelector('#startNextRoundButton').classList.toggle('buttonInactive');
}

function startNewGame() {
  document.querySelector('#nameInput').style.opacity = '1';

  document.querySelector('#nameInput').style.display = 'block';
  let flag = 0;
  document.querySelectorAll('.scoreRow').forEach(scoreRow => {
    Array.from(scoreRow.children).forEach(scoreBlock => {
      Array.from(scoreBlock.children)[0].classList.remove('displayNone');
      Array.from(scoreBlock.children)[1].innerText = '1';
      Array.from(scoreBlock.children)[2].classList.remove('displayNone');
    scoreBlock.style.gridTemplateColumns = 'auto auto auto';
    });
    if (flag == 0) {
      flag++;
      return;
    }
    scoreRow.style.display = 'none';
  });
  document.querySelectorAll('.totalBlock').forEach(totalBlock => {
    totalBlock.innerText = '-';
  });
  incDecVal = 1;
  round = 0;
  flipButtons();

}