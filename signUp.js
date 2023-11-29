/*변수 선언*/
const id = document.querySelector('#id');
const pw1 = document.querySelector('#password1');
const pwMsg = document.querySelector('#alertTxt');
const pwImg1 = document.querySelector('#password1_img');
const pw2 = document.querySelector('#password2');
const pwImg2 = document.querySelector('#password2_img');
const pwMsgArea = document.querySelector('.int_pass');
const userName = document.querySelector('#name');
const email = document.querySelector('#email');
const mobile = document.querySelector('#mobile');
const error = document.querySelectorAll('.error_next_box');


/*이벤트 핸들러 연결*/
if (id) {
    id.addEventListener("focusout", checkId);
}
if (pw1) {
    pw1.addEventListener("focusout", checkPw);
    pw1.addEventListener("input",function(){
        hidePasswordInput(pw1);
        checkPw();
    })
}
if (pw2) {
    pw2.addEventListener("focusout", comparePw);
    pw2.addEventListener("input",function(){
        hidePasswordInput(pw2);
        comparePw();
    })
}
userName.addEventListener("focusout", checkName);

email.addEventListener("focusout", isEmailCorrect);
mobile.addEventListener("focusout", checkPhoneNum);





/*콜백 함수*/


function checkId() {
    const idPattern = /[a-zA-Z0-9_-]{5,20}/;
    if(id.value === "") {
        error[0].innerHTML = "필수 정보입니다.";
        error[0].style.display = "block";
    } else if(!idPattern.test(id.value)) {
        error[0].innerHTML = "5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.";
        error[0].style.display = "block";
    } else {
        error[0].innerHTML = "멋진 아이디네요!";
        error[0].style.color = "#08A600";
        error[0].style.display = "block";
    }
}

function checkPw() {
    const pwPattern = /[a-zA-Z0-9~!@#$%^&*()_+|<>?:{}]{8,16}/;
    if(pw1.value === "") {
        error[1].innerHTML = "필수 정보입니다.";
        error[1].style.display = "block";
    } else if(!pwPattern.test(pw1.value)) {
        error[1].innerHTML = "8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.";
        pwMsg.innerHTML = "사용불가";
        pwMsgArea.style.paddingRight = "93px";
        error[1].style.display = "block";
        
        pwMsg.style.display = "block";
        pwImg1.src = "image/unsafe.png";
    } else {
        error[1].style.display = "none";
        pwMsg.innerHTML = "안전";
        pwMsg.style.display = "block";
        pwMsg.style.color = "#03c75a";
        pwImg1.src = "image/safe.png";
    }
}

function comparePw() {
    if (pw2.value === pw1.value && pw2.value !== "") {
        pwImg2.src = "image/safe.png";
        error[2].style.display = "none";
    } else if (pw2.value !== pw1.value && pw2.value !== "") {
        pwImg2.src = "image/unsafe.png";
        error[2].innerHTML = "비밀번호가 일치하지 않습니다.";
        error[2].style.display = "block";
    } else {
        // 비밀번호가 비어있을 때 초기화
        pwImg2.src = "";
        error[2].innerHTML = "";
        error[2].style.display = "none";
    }

    if (pw2.value === "") {
        error[2].innerHTML = "필수 정보입니다.";
        error[2].style.display = "block";
    }
}

function hidePasswordInput(inputElement) {
    inputElement.value = Array(inputElement.value.length + 1).join('*');
}
function checkName() {
    const namePattern = /[가-힣]/;
    if(userName.value === "") {
        error[3].innerHTML = "필수 정보입니다.";
        error[3].style.display = "block";
    } else if(!namePattern.test(userName.value) || userName.value.indexOf(" ") > -1) {
        error[3].innerHTML = "한글을 사용해주세요. (특수기호, 공백 사용 불가)";
        error[3].style.display = "block";
    } else {
        error[3].style.display = "none";
    }
}



function isEmailCorrect() {
    const emailPattern = /[a-z0-9]{2,}@[a-z0-9-]{2,}\.[a-z0-9]{2,}/;

    if(email.value === ""){ 
        error[4].style.display = "none"; 
    } else if(!emailPattern.test(email.value)) {
        error[4].style.display = "block";
    } else {
        error[4].style.display = "none"; 
    }

}

function checkPhoneNum() {
    const isPhoneNum = /([01]{2})([0]{1})([0-9]{4})([0-9]{4})/;

    if(mobile.value === "tel") {
        error[5].innerHTML = "필수 정보입니다.";
        error[5].style.display = "block";
    } else if(!isPhoneNum.test(mobile.value)) {
        error[5].innerHTML = "형식에 맞지 않는 번호입니다.";
        error[5].style.display = "block";
    } else {
        error[5].style.display = "none";
    }    
}

function scrollDisable(){
    $('html, body').addClass('hidden');
}
