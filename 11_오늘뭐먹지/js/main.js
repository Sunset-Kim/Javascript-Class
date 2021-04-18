// dom selector
const lists = document.querySelectorAll('.type-list');
const message = document.querySelector('.message');
const btnRandom = document.querySelector('.btn-random');
const btnReset = document.querySelector('.btn-reset');
const optFood = document.querySelector('#opt-food');

// common value
let isSelecting = false;
let autoPlay = false;
const keyword = {
    food: '',
    randomFood: true,
    spicy: '',
    randomSpicy: false,
    shape: '',
    randomShape: false,
    hot: '',
    randomHot: false,
}
const opt = {
    food: false,
    spicy: false,
    shape: false,
    hot: false,
    duration: 5000,
}


// title
const title = document.querySelector('.app-title-effect-container')
const letters = title.querySelectorAll('span');

activeTitle();
const titleloop = setInterval(activeTitle, 3000);
function activeTitle() {
    for(let i = 0; i < letters.length; i++) {
        letters[i].classList.add('uptodown');
        letters[i].style.animationDelay = i*0.1 + 's'
    }
    setTimeout(()=>{
        letters.forEach(element => {
            element.classList.remove('uptodown');
        })
    },2000)
}



// list
lists.forEach(list => {
    list.addEventListener('click',(e)=>{
        selectArrow(e.target);
        displayKeyword();
    });  
})
function selectArrow(item) {
    let defalutX = item.parentNode.getBoundingClientRect().x;
    let arrow = item.parentNode.parentNode.children[1].children[0];
    let posCenter = item.getBoundingClientRect().x +  item.getBoundingClientRect().width/2 - defalutX - arrow.getBoundingClientRect().width/2;
    arrow.style.transform = `translateX(${posCenter}px)`;

    clearActive(item);
    addActive();
}

function clearActive(item){
    let currentActiveNode = Array.prototype.filter.call(item.parentNode.children, isActive);
    currentActiveNode.forEach(node => node.classList.remove('active'));
}

function addActive() {
    const arrows = document.querySelectorAll('.arrow');
    arrows.forEach(element => {
        checkPos(element)
    });
    sendActive();

    
}

function checkPos(arrow) {
    const ul = arrow.parentNode.previousElementSibling;
    const offsetX = ul.getBoundingClientRect().x
    const items = ul.children;
    const itemWidth = items[0].getBoundingClientRect().width;
    posX = arrow.getBoundingClientRect().x + (arrow.getBoundingClientRect().width / 2);
    posX = Math.floor(posX);
    
    if(posX >= offsetX && posX <= offsetX + itemWidth ) {
        items[0].classList.add('active');
    } else if (posX > offsetX + itemWidth && posX <= offsetX + itemWidth*2 ) {
        items[1].classList.add('active');
    } else if (posX > offsetX + itemWidth*2 && posX <= offsetX + itemWidth*3 ) {
        items[2].classList.add('active');
    } else if (posX > offsetX + itemWidth*3 && posX <= offsetX + itemWidth*4 ) {
        items[3].classList.add('active');
    }
}

function isActive(node){
    return node.classList.contains('active');
}

function sendActive() {
    const activeItems = document.querySelectorAll('.active');
    activeItems.forEach(element => {
        if(element.classList.contains('food-item')) {
            keyword.food = element.textContent;
        } else if(element.classList.contains('spicy-item')) {
            keyword.spicy = element.textContent;
        } else if(element.classList.contains('hot-item')) {
            keyword.hot = element.textContent;
        }else if(element.classList.contains('shape-item')) {
            keyword.shape = element.textContent;
        }
    })

    
}
function displayKeyword() {
    message.innerHTML = `오늘은 <span>${keyword.spicy}</span> <span>${keyword.food}</span> <span>${keyword.hot}</span> <span>${keyword.shape}</span> 먹는날!`;
    message.innerHTML += `<br>근데, 어짜피 내가 정해준 거 안먹을거 잖아.`
}

// btn
btnRandom.addEventListener('click', () => {
    selectRandom();
});
// 랜덤버튼 누리기
function selectRandom() {
    checkOpt();
    if(!isSelecting) {
        isSelecting = true;
        const arrows = document.querySelectorAll('.arrow');
        if(opt.food) {
            moveArrow(arrows[0]);
        }
        if(opt.spicy) {
            moveArrow(arrows[1]);
        }
        if(opt.shape) {
            moveArrow(arrows[2]);
        }
        if(opt.hot) {
            moveArrow(arrows[3]);
        }
        if(!opt.food && !opt.spicy && !opt.shape && !opt.hot ) {
            isSelecting = false;
            message.innerHTML = `답정너 금지!<br>고정부터 풀고 돌리라구!`
        }
    } else {
        return;
    }
    
    function moveArrow(arrow) {
        let x = 0;
        let xDirection = 1;
        let offsetX = arrow.parentNode.parentNode.children[0].getBoundingClientRect().x;
        let containerWidth = arrow.parentNode.getBoundingClientRect().width;
        let arrowWidth = arrow.getBoundingClientRect().width
        let speed = Math.random();
        let loop = setInterval(() => {

            x += (Math.floor(Math.random()*10) + 5 * speed )* xDirection;

            if(x > containerWidth - arrowWidth/2) {
                x = containerWidth - arrowWidth / 2;
                xDirection *= -1; 
            } else if (x < 0) {
                x = 0;
                xDirection *= -1;
            }
            arrow.style.transform = `translateX(${x}px)`;

            clearActive(arrow.parentNode.parentNode.children[0].children[0]);
            addActive();
            sendActive();
            displayKeyword();
        },1)        
        setTimeout(() => {
            clearInterval(loop);
            isSelecting = false;
        },opt.duration)
    }

    function checkOpt() {
        let input = document.querySelectorAll('.option-group input');
        console.log(input[4].value);
        opt.food = !input[0].checked;
        opt.spicy = !input[1].checked;
        opt.shape = !input[2].checked;
        opt.hot = !input[3].checked;
        opt.duration = input[4].value * 1000 ;
    }
}
// audio
const btnAudio = document.querySelector('.opt-group.audio');
const audio = new Audio('./asset/sound/song.mp3');
audio.currentTime = 12.5;
audio.loop = true;
btnAudio.addEventListener('click', () => {
    btnAudio.classList.toggle('on');
    if(!autoPlay) {
        audio.play();
    } else {
        audio.pause();
        audio.currentTime = 12.5;
    }
});