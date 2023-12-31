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

window.onload = function() {
    pw2.setAttribute("disabled", "true");
}
/*이벤트 핸들러 연결*/
if (id) {
    id.addEventListener("focusout", checkId);
}
if (pw1) {
    pw1.addEventListener("focusout", checkPw);
    pw1.addEventListener("input", checkPw);
    pw1.addEventListener("input", comparePwOnPw1Change);
}
if (pw2) {
    pw2.addEventListener("focusout", comparePw);
    pw2.addEventListener("input", comparePw);
    pw2.addEventListener("click", function() {
        if (pw2.hasAttribute("disabled")) {
            error[2].innerHTML = "먼저 비밀번호를 입력해주세요.";
            error[2].style.display = "block";
        }
    });
}
userName.addEventListener("focusout", checkName);
email.addEventListener("focusout", isEmailCorrect);
mobile.addEventListener("focusout", checkPhoneNum);





/*콜백 함수*/

// 비밀번호 확인 필드와 비교하는 새로운 함수 추가
function comparePwOnPw1Change() {
    if (pw2.value !== "") {  // 비밀번호 확인 필드가 비어있지 않은 경우만 검사
        comparePw();
    }
}

function checkId() {
    const idPattern = /[a-zA-Z0-9]{5,20}/;
    if(id.value === "") {
        error[0].innerHTML = "필수 정보입니다.";
        error[0].style.display = "block";
    } else if(!idPattern.test(id.value)) {
        error[0].innerHTML = "5~20자의 영문 소문자, 숫자만 사용 가능합니다.";
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
        pwMsg.style.display = "none";
        pwImg1.src = "image/icon_pass.svg";
        togglePasswordConfirmation(false);
    } else if(!pwPattern.test(pw1.value)) {
        error[1].innerHTML = "8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.";
        pwMsg.innerHTML = "사용 불가";
        pwMsgArea.style.paddingRight = "93px";
        error[1].style.display = "block";
        pwMsg.style.display = "block";
        pwMsg.style.color = "Red";
        pwImg1.src = "image/unsafe.png";
        togglePasswordConfirmation(false);
    } else {
        error[1].style.display = "none";
        pwMsg.innerHTML = "안전";
        pwMsg.style.display = "block";
        if (pw1.value.length <= 7) {
            pwMsg.style.color = "Red";
            pwImg1.src = "image/unsafe.png";
        } else {
            pwMsg.style.color = "#03c75a";
            pwImg1.src = "image/safe.png";
        }
        togglePasswordConfirmation(true);
    }
}

function comparePw() {
// 수정된 부분: 중복 선언 제거
    const pw2Value = pw2.value.trim();
    if (pw2Value === pw1.value && pw2Value !== "") {
        pwImg2.src = "image/safe.png";
        error[2].style.display = "none";
    } else if (pw2Value !== pw1.value && pw2Value !== "") {
        pwImg2.src = "image/unsafe.png";
        error[2].innerHTML = "비밀번호가 일치하지 않습니다.";
        error[2].style.display = "block";
    } else {
        // 비밀번호가 비어있을 때 초기화
        pwImg2.src = "image/icon_check_disable.png";
        error[2].innerHTML = "";
        error[2].style.display = "none";
    }
    if (pw2Value === "") {
        error[2].innerHTML = "비밀번호를 먼저 입력해주세요.";
        error[2].style.display = "block";
    }
}
function togglePasswordConfirmation(isEnabled){
     // 비밀번호 확인 필드 활성화 여부 체크
    if(isEnabled) {
        pw2.removeAttribute("disabled");
    } else {
        pw2.setAttribute("disabled", "true");
    }
}

function checkName() {
    const namePattern = /[가-힣]/;
    if(userName.value === "") {
        error[3].innerHTML = "필수 정보입니다.";
        error[3].style.display = "block";
    } else if(!namePattern.test(userName.value) || userName.value.indexOf(" ") > -1) {
        error[3].innerHTML = "한글을 사용해주세요.(특수기호, 공백 사용 불가)";
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
    const isPhoneNum = /([01]{2})(0)([0-9]{4})([0-9]{4})/;

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
