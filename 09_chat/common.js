const app = document.querySelectorAll('.app');
const main = document.querySelectorAll('.app-main');

const appForm = document.querySelectorAll('form');
const appInput = document.querySelectorAll('.app-input-text');
const appSubmit = document.querySelectorAll('.app-input-submit');

let info = '';

for(let i = 0; i < app.length; i++) {
    appForm[i].addEventListener('submit', (event)=> {
        // 기존 이벤트를 막는다
        event.preventDefault();
        // 인풋벨류를 체크한다
        if(!appInput[i].value) {
            return
        }
        info = {
            id : i,
            msg : appInput[i].value,
        };
        console.log(info);
        // 메세지를 만든다.
        createMsg();
        // 메세지를 등록한다.
        displayMsg();
        // 메세지를 초기화한다
        appInput[i].value = '';
    })
}
    



function createMsg() {

    const chat = document.createElement('div');
    chat.setAttribute('class', 'app-chat');
    const chatImg = document.createElement('div');
    chatImg.setAttribute('class', 'chat-img');
    const img = document.createElement('img');
    const chatText = document.createElement('span');
    chatText.textContent = info.msg;
    chatText.setAttribute('class','chat-msg');

    chatImg.appendChild(img);
    chat.appendChild(chatImg);
    chat.appendChild(chatText);

    info.chat = chat;
}

function displayMsg() {
    if(!info.chat) {
        return
    }

    for(let i = 0; i < main.length; i++) {
        let msg = info.chat.cloneNode(true)
        if(info.id == i) {
            msg.classList.add('user')
            
            console.log(msg.children[0]);
        } else {
            msg.classList.add('customer')
            msg.children[0].children[0].src = `./img${info.id}.jpg`;
            msg.children[0].children[0].alt = `사용자 ${info.id}의 이미지입니다.`
        }
        main[i].appendChild(msg);
        msg.scrollIntoView();
    }
    
}

