const itemContainer = document.querySelector(".items");
const products = [
    {
        id: 1, // 상품 고유 번호
        name: "에티오피아 원두 커피", // 상품명
        description: "에티오피아 시다모 지역의 아라비카 원두로 만든 프리미엄 커피입니다.", // 상품 설명
        price: 25000, // 가격 (원)
        category: "coffee", // 카테고리 분류
        image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" // 상품 이미지 URL
    },
    {
        id: 2,
        name: "페루 다크 초콜릿",
        description: "페루 아마존 지역의 유기농 카카오로 만든 70% 다크 초콜릿입니다.",
        price: 18000,
        category: "chocolate",
        image: "https://images.unsplash.com/photo-1481391319762-47dff72954d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 3,
        name: "스리랑카 세일론 홍차",
        description: "스리랑카 누와라엘리야 고지대에서 재배된 프리미엄 홍차입니다.",
        price: 15000,
        category: "tea",
        image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 4,
        name: "네팔 산꿀",
        description: "네팔 히말라야 지역의 야생화에서 채집한 천연 산꿀입니다.",
        price: 22000,
        category: "honey",
        image: "https://images.unsplash.com/photo-1587049352851-8d4e89133924?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8JUVBJUJGJTgwfGVufDB8fDB8fHww"
    },
    {
        id: 5,
        name: "과테말라 안티구아 커피",
        description: "과테말라 안티구아 지역의 화산재 토양에서 재배된 커피입니다.",
        price: 28000,
        category: "coffee",
        image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 6,
        name: "가나 밀크 초콜릿",
        description: "가나의 유기농 카카오와 유기농 우유로 만든 밀크 초콜릿입니다.",
        price: 16000,
        category: "chocolate",
        image: "https://images.unsplash.com/photo-1511381939415-e44015466834?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    // 기존 상품 (1~6번) 생략...

    {
        id: 7,
        name: "인도 아삼 홍차",
        description: "인도 아삼 지역에서 재배된 진한 맛의 프리미엄 홍차입니다.",
        price: 17000,
        category: "tea",
        image: "https://images.unsplash.com/photo-1607619056574-d0e77b6b4556?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 8,
        name: "볼리비아 고산 꿀",
        description: "볼리비아 고산지대의 야생화에서 채집한 천연 유기농 꿀입니다.",
        price: 24000,
        category: "honey",
        image: "https://images.unsplash.com/photo-1514997130083-40d31e734b33?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 9,
        name: "콜롬비아 수프리모 커피",
        description: "콜롬비아 안데스 고지대에서 재배된 수프리모 등급의 원두 커피입니다.",
        price: 26000,
        category: "coffee",
        image: "https://images.unsplash.com/photo-1524592480312-c5fbc3c4c34c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 10,
        name: "베트남 로부스타 커피",
        description: "강한 바디감과 쌉싸름한 맛이 특징인 베트남 로부스타 원두입니다.",
        price: 19000,
        category: "coffee",
        image: "https://images.unsplash.com/photo-1573322477394-4aa1e7272797?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 11,
        name: "마다가스카르 바닐라 초콜릿",
        description: "마다가스카르산 바닐라를 넣은 프리미엄 다크 초콜릿입니다.",
        price: 20000,
        category: "chocolate",
        image: "https://images.unsplash.com/photo-1590080876072-f11d1c6bb75e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 12,
        name: "케냐 블랙티",
        description: "케냐 고원지대에서 재배된 향이 풍부한 블랙티입니다.",
        price: 14000,
        category: "tea",
        image: "https://images.unsplash.com/photo-1611688003907-93cf84a28b5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    }
];
    

products.forEach(pro => {
    const item = document.createElement("div");
    item.className = "item";
    
    const imgContainer = document.createElement("div");
    imgContainer.className = "img-container";
    const img = document.createElement("img");
    img.src = pro.image;
    imgContainer.append(img)
    
    const name = document.createElement("p");
    name.className = "name";
    name.textContent = pro.name;

    const desc = document.createElement("p");
    desc.className = "desc";
    desc.textContent = pro.description;

    const price = document.createElement("p");
    price.className = "price";
    price.textContent = pro.price.toLocaleString() + "₩";

    const btn = document.createElement("button");
    btn.textContent = "장바구니에 담기";

    item.append(imgContainer, name, desc, price, btn);
    itemContainer.appendChild(item);
});