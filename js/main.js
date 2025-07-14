const menuButton = document.querySelector('.menu-toggle');
const topMenu = document.querySelector('#top_menu');
const overlay = document.querySelector('.overlay');
const sub_list = document.querySelectorAll("nav#top_menu ul li")

// console.log(sub_list)

// 햄버거 바 눌렀을 때 메뉴 목록
menuButton.addEventListener('click', () => {
    if (topMenu.style.display === 'block') {
        topMenu.style.display = 'none';
        overlay.style.display = 'none';

    } else {
        topMenu.style.display = 'block';
        overlay.style.display = 'block';
    }
});

overlay.addEventListener('click', () => {
    if ( overlay.style.display === 'block') { 
        topMenu.style.display = 'none';
        overlay.style.display = 'none';
    };
});

sub_list.forEach(element => {
    element.addEventListener('click', (event) => {
        // console.log(event?.target.firstChild?.href)
        let url =  event?.target.firstChild?.href;
        window.location.href = (url) ? url : "index.html";
    });
});

// 화면 사이즈가 변경되었을 때 메뉴 띄우기
window.addEventListener('resize', () => {
    if ( window.innerWidth > 768 ) {
        topMenu.style.display = 'block';
        overlay.style.display = 'none';
    }
    // 화면 사이즈가 작아졌을 때 top이 켜져있는데 overlay가 꺼져있다면 top도 꺼줌
    else if (topMenu.style.display == 'block' && overlay.style.display == 'none' ) {
        topMenu.style.display = 'none';
    }

})


function loadPage(page) {
    if ( window.innerWidth <= 768 ) { // 최대크기가 768 이하라면 ( 모바일 화면일 때 ) nav를 꺼줌
        topMenu.style.display = 'none';
        overlay.style.display = 'none';
    }


}

function openLoginForm() {
    // 팝업창을 웹페이지 안쪽에 띄움
    let newWin = window.open("login.html", "Login", `width=400px, height=500px, left=${window.screenX+100}, top=${window.screenY+100}`);
    if ( newWin == null) {
        alert("팝업이 차단되었습니다. 팝업차단을 해제해 주세요.")
    }
}
