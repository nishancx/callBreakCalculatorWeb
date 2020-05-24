var incDecVal = 1;
var round = 0;
var roundPoints = [];

updateScores();

Array.from(document.querySelectorAll('.nameBlock')).forEach((nameBlock, index) => {
  if (nameBlock.value == '') {
    nameBlock.value = `Player ${index + 1}`;
  }
})

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
  } else if (round == 4) {
    saveData();
    updateScores();
  }
  let scoreRow = document.querySelectorAll('.scoreRow')[round];
  let totalBlocks = document.querySelectorAll('.totalBlock');
  let index = 0;
  Array.from(scoreRow.children).forEach(scoreBlock => {
    Array.from(scoreBlock.children)[0].classList.add('displayNone');
    Array.from(scoreBlock.children)[2].classList.add('displayNone');
    scoreBlock.classList.add('scoreBlockInactive');
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

function saveData() {
  let name, totalScore, data = [];
  document.querySelectorAll('.nameBlock').forEach((nameBlock, index) => {
    name = nameBlock.value;
    totalScore = document.querySelectorAll('.totalBlock')[index].innerText;
    data.push({
      name,
      totalScore
    });
  });
  let savedData;
  if (localStorage.length > 0) {
    savedData = JSON.parse(localStorage.getItem('savedData'));
    savedData.push(data);
  } else {
    savedData = [data];
  }
  if (savedData.length == 11) {
    savedData.shift();
  }
  savedData = JSON.stringify(savedData);
  localStorage.setItem('savedData', savedData)
}

function startNewGame() {
  let flag = 0;
  document.querySelectorAll('.scoreRow').forEach(scoreRow => {
    Array.from(scoreRow.children).forEach(scoreBlock => {
      Array.from(scoreBlock.children)[0].classList.remove('displayNone');
      Array.from(scoreBlock.children)[1].innerText = '1';
      Array.from(scoreBlock.children)[2].classList.remove('displayNone');
      scoreBlock.classList.remove('scoreBlockInactive');
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
  document.querySelector('#startNextRoundButton').innerText = 'Start Next Round';
  flipButtons();
}

function updateScores() {
  if (localStorage.length > 0) {
    document.querySelector('#scoreRows').innerHTML = '';
    let savedData = JSON.parse(localStorage.getItem('savedData'));
    savedData.reverse();
    savedData.forEach((data, index) => {
      let scoreTableRow = document.createElement('DIV');
      scoreTableRow.classList.add('scoreTableRow');
      data.forEach((item, indexMini) => {
        let scoreTableBlock = document.createElement('DIV');
        scoreTableBlock.classList.add('scoreTableBlock');
        let scoreTableName = document.createElement('DIV');
        scoreTableName.classList.add('scoreTableName');
        let scoreTableScore = document.createElement('DIV');
        scoreTableScore.classList.add('scoreTableScore');
        scoreTableName.innerText = item.name;
        scoreTableName.id = "scoreTableNameR" + index + "c" + indexMini;
        scoreTableScore.innerText = item.totalScore;
        scoreTableName.id = "scoreTableNameR" + index + "c" + indexMini;
        scoreTableScore.id = "scoreTableScoreR" + index + "c" + indexMini;
        scoreTableBlock.id = "scoreTableBlockR" + index + "c" + indexMini;
        scoreTableBlock.appendChild(scoreTableName);
        scoreTableBlock.appendChild(scoreTableScore);
        scoreTableRow.appendChild(scoreTableBlock);
      });
      document.querySelector('#scoreTable').appendChild(scoreTableRow);
      document.querySelector('#scoreRows').appendChild(scoreTableRow);
    });
  }
}