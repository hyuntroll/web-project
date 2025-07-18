const menuButton = document.querySelector('.menu-toggle');
const mobile_nav = document.querySelector('#mobile-nav');
const overlay = document.querySelector('.overlay');
const sub_list = document.querySelectorAll("nav#top_menu ul li")

// console.log(sub_list)

// 햄버거 바 눌렀을 때 메뉴 목록
menuButton.addEventListener('click', () => {
    mobile_nav.classList.toggle("hide"); // hide가 있으면 삭제, 없으면 추가함
    overlay.classList.toggle("hide");
});

overlay.addEventListener('click', () => {
    mobile_nav.classList.add("hide");
    overlay.classList.add("hide");
});

sub_list.forEach(element => {
    element.addEventListener('click', (event) => {
        // console.log(event?.target.firstChild?.href)
        let url =  event?.target.firstChild?.href;
        window.location.href = (url) ? url : "index.html";
    });
});

function openLoginForm() {
    // 팝업창을 웹페이지 안쪽에 띄움
    let newWin = window.open("login.html", "Login", `width=400px, height=500px, left=${window.screenX+100}, top=${window.screenY+100}`);
    if ( newWin == null) {
        alert("팝업이 차단되었습니다. 팝업차단을 해제해 주세요.")
    }
}
function openSingUpForm() {
    // 팝업창을 웹페이지 안쪽에 띄움
    let newWin = window.open("singup.html", "Login", `width=400px, height=500px, left=${window.screenX+100}, top=${window.screenY+100}`);
    if ( newWin == null) {
        alert("팝업이 차단되었습니다. 팝업차단을 해제해 주세요.")
    }
}

