const cartTable = document.getElementById("cart");
const removeBtn = document.getElementById("remove-selected");
const buyBtn = document.getElementById("buy");
const cartBody = cartTable.querySelector("tbody");
const cartItems = [ // 임시
    {
        id: 1, // 상품 고유 번호
        name: "에티오피아 원두 커피", // 상품명
        description: "에티오피아 시다모 지역의 아라비카 원두로 만든 프리미엄 커피입니다.", // 상품 설명
        price: 25000, // 가격 (원)
        category: "coffee", // 카테고리 분류
        image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", // 상품 이미지 URL
        amount: 5
    },
    {
        id: 2,
        name: "페루 다크 초콜릿",
        description: "페루 아마존 지역의 유기농 카카오로 만든 70% 다크 초콜릿입니다.",
        price: 18000,
        category: "chocolate",
        image: "https://images.unsplash.com/photo-1481391319762-47dff72954d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        amount: 1
    },
    {
        id: 3,
        name: "스리랑카 세일론 홍차",
        description: "스리랑카 누와라엘리야 고지대에서 재배된 프리미엄 홍차입니다.",
        price: 15000,
        category: "tea",
        image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        amount: 2
    }
]

document.addEventListener("DOMContentLoaded", () => {

    cartItems.forEach((item) => {
        const tr = document.createElement("tr");
    
        // 체크박스
        const tdCheckbox = document.createElement('td');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `item:${item.id}`;
        checkbox.classList.add('selected');
        tdCheckbox.appendChild(checkbox);
    
        // 이미지 + 이름
        const tdImageText = document.createElement('td');
        const img = document.createElement('img');
        const name = document.createElement('p');
        tdImageText.classList.add("item-info");
        img.src = item.image;
        img.alt = item.name;
        name.textContent = item.name;
        tdImageText.append(img, name);
    
        // 수량 조절
        const td3 = document.createElement('td');
        const btnGroup = document.createElement('div');
        btnGroup.classList.add("btn-group");
        const sub = document.createElement('button');
        const amount = document.createElement('span');
        const add = document.createElement('button');
        sub.textContent = '<';
        add.textContent = '>';
        sub.classList.add("sub-button");
        add.classList.add("add-button");
        amount.classList.add('amount');
        amount.textContent = item.amount;
    
        btnGroup.append(sub, amount, add);
        td3.appendChild(btnGroup);
    
        // 가격 표시
        const td4 = document.createElement('td');
        td4.classList.add("price");
        td4.textContent = (item.price * item.amount).toLocaleString() + "₩";
    
        // 배송비
        const td5 = document.createElement('td');
        td5.textContent = '무료';
    
        // 버튼 동작 설정
        function updateDisplay() {
            amount.textContent = item.amount;
            td4.textContent = (item.price * item.amount).toLocaleString() + "₩";
            sub.disabled = item.amount <= 1;
        }
    
        sub.addEventListener('click', () => {
            if (item.amount > 1) {
                item.amount--;
                updateDisplay();
            }
        });
    
        add.addEventListener('click', () => {
            item.amount++;
            updateDisplay();
        });
    
        updateDisplay(); // 초기 상태 반영
    
        // 요소 조립
        tr.appendChild(tdCheckbox);
        tr.appendChild(tdImageText);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        cartTable.appendChild(tr);
    });
    
    
    const allCheckbox = document.getElementById("all-selected");

    // 체크박스 전체 선택/해제
    allCheckbox.addEventListener("change", () => {
        const itemCheckboxes = cartTable.querySelectorAll("input[type='checkbox'].selected");
        itemCheckboxes.forEach(checkbox => {
            checkbox.checked = allCheckbox.checked;
        });
    });

    // 개별 체크 상태 바뀔 때 전체선택 체크박스 상태도 반영
    cartTable.addEventListener("change", (e) => {
        if (e.target.classList.contains("selected")) {
            const itemCheckboxes = cartTable.querySelectorAll("input[type='checkbox'].selected");
            const allChecked = Array.from(itemCheckboxes).every(checkbox => checkbox.checked);
            allCheckbox.checked = allChecked;
        }
    });
});




