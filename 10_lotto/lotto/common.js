// document
const container = document.querySelector('.app-contanier');
const width = container.getClientRects()[0].width
const height = container.getClientRects()[0].height;
const button = document.querySelector('button')
const picker = document.querySelector('.picker');
const message = document.querySelector('.message');

let end = false;
let picking = false;
let ballArray = [];
let count = 0;
let loop = '';

init();

// 시작함수
function init() {
  end = false;
  count = 0;
  container.innerHTML = '';
  ballArray = [];
  createBall();
  movingBall();
  loop = setInterval(movingBall, 125);
  message.innerHTML = '원조 복권은<br> 코인이 아니라 로또였다구'
}

// 숫자볼 생성

function createBall() {
  for(let i = 1; i < 47; i++) {

    let ball = document.createElement('div');
    ball.textContent = i;
    ball.setAttribute('class','ball');

    if(i < 10) {
        ball.classList.add('num');
    } else if( i >= 10 && i < 20) {
        ball.classList.add('num10');
    } else if( i >= 20 && i < 30) {
        ball.classList.add('num20');
    } else if( i >= 30 && i < 40) {
        ball.classList.add('num30');
    } else if(i >= 40 && i < 47) {
        ball.classList.add('num40');
    }
    ballArray.push(ball)
  }
  ballArray.forEach((item, i) => {
    container.appendChild(item);
  });
}
// 숫자볼 랜덤으로 움직이기

function movingBall() {
  const balls = document.querySelectorAll('.ball');
  balls.forEach((item, i) => {
    item.style.transform = `translate(${random(300 - 20,10)}px,${random(300 - 20,10)}px) scale(${random(2.2,0.8)})`;
  });
}

function random(min,max) {
  return Math.floor(Math.random()*(max-min)+min);
}



function pick(e) {

  if(end === false) {
    if(count < 7) {
      picking = true;
      message.innerHTML = count + 1 + `번째 추첨중입니다.`
      const balls = container.querySelectorAll('.ball')
      let num = random(balls.length,0);
      let clone = container.children[num].cloneNode(true);
      clone.removeAttribute('style');
      picker.appendChild(clone);
      container.children[num].remove();
      console.log(1);
      count ++;
      setTimeout(pick,1000);
    } else {
        picking = false;
        message.innerHTML = '추첨이 완료되었습니다.<br>당첨되시면 저한테 수수료 주셔야 됩니다.'
        end = true;
        return;
    }
  } else {
    message.innerHTML = '이미 추첨이 되어있습니다.<br>초기화를 눌러주세요!'
  }

}

function reset(e) {
  if(picking === true) {
    return
  }
  clearInterval(loop);
  end = true;
  picker.innerHTML='';
  message.innerHTML = '공을 다시 넣고 섞는중...'
  init();
}
