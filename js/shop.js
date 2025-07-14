// ========================================
// 공정거래 상품몰 - 상품 목록 및 장바구니 기능
// ========================================

// 상품 데이터 배열 - 실제 상품 정보를 저장
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
    }
];

// ========================================
// 장바구니 관련 변수 및 함수
// ========================================

// 장바구니 배열
let cart = [];

// ========================================
// DOM 요소 참조 - HTML에서 필요한 요소들을 가져옴
// ========================================
const productTableBody = document.getElementById('productTableBody'); // 상품 테이블 본문
const categoryFilter = document.getElementById('categoryFilter'); // 카테고리 필터 드롭다운
const sortFilter = document.getElementById('sortFilter'); // 정렬 필터 드롭다운

// 장바구니 관련 DOM 요소들
const cartModal = document.getElementById('cartModal');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const cartCount = document.getElementById('cartCount');

// ========================================
// 장바구니 관리 함수들
// ========================================

// 로컬스토리지에서 장바구니 로드
const loadCartFromStorage = () => {
    const cartData = localStorage.getItem('cart');
    if (cartData) {
        cart = JSON.parse(cartData);
    }
};

// 장바구니를 로컬스토리지에 저장
const saveCartToStorage = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
};

// 장바구니 카운트 업데이트
const updateCartCount = () => {
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
};

// 장바구니 업데이트 (화면에 표시)
const updateCart = () => {
    if (!cartItems) return;
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p>장바구니가 비어있습니다.</p>';
        if (cartTotal) cartTotal.textContent = '0원';
        updateCartCount();
        return;
    }
    
    let total = 0;
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        cartItem.innerHTML = `
            <div class="cart-item-info">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-price">${item.price.toLocaleString()}원 × ${item.quantity}개</div>
            </div>
            <div class="cart-item-quantity">
                <span>${itemTotal.toLocaleString()}원</span>
                <button class="remove-btn" data-product-id="${item.id}">삭제</button>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });
    
    if (cartTotal) cartTotal.textContent = `${total.toLocaleString()}원`;
    updateCartCount();
};

// 장바구니에서 상품 삭제
const removeFromCart = (productId) => {
    cart = cart.filter(item => item.id !== productId);
    saveCartToStorage();
    updateCart();
};

// 장바구니 비우기
const clearCart = () => {
    cart = [];
    saveCartToStorage();
    updateCart();
};

// 장바구니 모달 열기
const openCartModal = () => {
    if (cartModal) {
        updateCart();
        cartModal.style.display = 'block';
    }
};

// 장바구니 모달 닫기
const closeCartModal = () => {
    if (cartModal) {
        cartModal.style.display = 'none';
    }
};

// 체크아웃 페이지로 이동
const goToCheckout = () => {
    if (cart.length === 0) {
        alert('장바구니가 비어있습니다.');
        return;
    }
    window.location.href = 'checkout.html';
};

// ========================================
// 상품 렌더링 함수 - 상품 목록을 테이블에 표시
// ========================================
const renderProducts = (productsToRender = products) => {
    console.log('renderProducts 호출됨'); // 디버깅용 로그
    console.log('productsToRender:', productsToRender); // 렌더링할 상품 데이터 출력
    console.log('productTableBody:', productTableBody); // 테이블 요소 확인
    
    // 테이블 요소가 없으면 함수 종료
    if (!productTableBody) {
        console.error('productTableBody를 찾을 수 없습니다!');
        return;
    }
    
    // 테이블 내용 초기화 (기존 상품 목록 삭제)
    productTableBody.innerHTML = '';
    console.log('테이블 내용 초기화됨');
    
    // 각 상품을 순회하면서 테이블 행 생성
    productsToRender.forEach((product, index) => {
        console.log(`상품 ${index + 1} 렌더링:`, product); // 각 상품 렌더링 로그
        
        // 새로운 테이블 행 요소 생성
        const row = document.createElement('tr');
        
        // 행 내용을 HTML로 설정
        row.innerHTML = `
            <td class="product-image-cell">
                <img src="${product.image}" alt="${product.name}" class="product-table-image">
            </td>
            <td data-label="상품명" class="product-title">${product.name}</td>
            <td data-label="설명" class="product-description">${product.description}</td>
            <td data-label="가격" class="product-price">${product.price.toLocaleString()}원</td>
            <td data-label="수량" class="quantity-controls">
                <button class="quantity-btn" data-product-id="${product.id}" data-change="-1">-</button>
                <span class="quantity-display" id="quantity-${product.id}">1</span>
                <button class="quantity-btn" data-product-id="${product.id}" data-change="1">+</button>
            </td>
            <td data-label="장바구니">
                <button class="add-to-cart-btn" data-product-id="${product.id}">장바구니 담기</button>
            </td>
        `;
        
        // 생성된 행을 테이블에 추가
        productTableBody.appendChild(row);
    });
    
    console.log('모든 상품 렌더링 완료'); // 렌더링 완료 로그
};

// ========================================
// 수량 변경 함수 - +/- 버튼으로 상품 수량 조절
// ========================================
const changeQuantity = (productId, change) => {
    // 해당 상품의 수량 표시 요소 찾기
    const quantityDisplay = document.getElementById(`quantity-${productId}`);
    if (!quantityDisplay) return; // 요소가 없으면 함수 종료
    
    // 현재 수량을 숫자로 변환
    let currentQuantity = parseInt(quantityDisplay.textContent);
    
    // 새로운 수량 계산
    let newQuantity = currentQuantity + change;
    
    // 수량 범위 제한 (1~99개)
    if (newQuantity < 1) newQuantity = 1;
    if (newQuantity > 99) newQuantity = 99;
    
    // 화면에 새로운 수량 표시
    quantityDisplay.textContent = newQuantity;
};

// ========================================
// 장바구니 추가 함수 - 선택한 상품을 장바구니에 담기
// ========================================
const addToCart = (productId) => {
    // 상품 데이터에서 해당 상품 찾기
    const product = products.find(p => p.id === productId);
    
    // 현재 선택된 수량 가져오기
    const quantity = parseInt(document.getElementById(`quantity-${productId}`).textContent);
    
    // 장바구니에 상품 추가
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ ...product, quantity });
    }
    
    // 로컬스토리지에 저장하고 화면 업데이트
    saveCartToStorage();
    updateCart();
    
    // 성공 메시지 표시
    alert(`${product.name} ${quantity}개가 장바구니에 추가되었습니다!`);
    
    // 수량을 1로 초기화
    document.getElementById(`quantity-${productId}`).textContent = '1';
};

// ========================================
// 필터링 함수 - 카테고리별로 상품 필터링
// ========================================
const filterProducts = () => {
    // 선택된 카테고리 값 가져오기
    const selectedCategory = categoryFilter.value;
    let filteredProducts = products; // 기본값은 모든 상품
    
    // 카테고리가 선택된 경우 해당 카테고리 상품만 필터링
    if (selectedCategory) {
        filteredProducts = products.filter(product => product.category === selectedCategory);
    }
    
    // 필터링된 상품 목록으로 다시 렌더링
    renderProducts(filteredProducts);
};

// ========================================
// 정렬 함수 - 상품을 이름순, 가격순으로 정렬
// ========================================
const sortProducts = () => {
    // 선택된 정렬 방식 가져오기
    const sortType = sortFilter.value;
    let sortedProducts = [...products]; // 상품 배열 복사 (원본 배열 변경 방지)
    
    // 정렬 방식에 따라 상품 정렬
    switch (sortType) {
        case 'name': // 이름순 정렬 (가나다순)
            sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'price-low': // 가격 낮은순 정렬
            sortedProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high': // 가격 높은순 정렬
            sortedProducts.sort((a, b) => b.price - a.price);
            break;
    }
    
    // 정렬된 상품 목록으로 다시 렌더링
    renderProducts(sortedProducts);
};

// ========================================
// 이벤트 리스너 설정 - 페이지 로드 시 실행
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM이 로드되었습니다.'); // 페이지 로드 확인
    console.log('상품 데이터:', products); // 상품 데이터 확인
    console.log('productTableBody:', productTableBody); // 테이블 요소 확인
    
    // 장바구니 초기화
    loadCartFromStorage();
    updateCartCount();
    
    // 상품 목록 렌더링 (페이지 로드 시 초기 표시)
    renderProducts();
    
    // ========================================
    // 필터 이벤트 리스너 설정
    // ========================================
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterProducts); // 카테고리 변경 시 필터링
        console.log('카테고리 필터 이벤트 리스너 추가됨');
    }
    
    if (sortFilter) {
        sortFilter.addEventListener('change', sortProducts); // 정렬 변경 시 정렬
        console.log('정렬 필터 이벤트 리스너 추가됨');
    }
    
    // ========================================
    // 상품 테이블 이벤트 리스너 설정
    // ========================================
    if (productTableBody) {
        productTableBody.addEventListener('click', (e) => {
            const target = e.target; // 클릭된 요소
            
            // 수량 조절 버튼 클릭 시
            if (target.classList.contains('quantity-btn')) {
                const productId = parseInt(target.dataset.productId); // 상품 ID
                const change = parseInt(target.dataset.change); // 변경량 (-1 또는 1)
                changeQuantity(productId, change); // 수량 변경 함수 호출
            } 
            // 장바구니 담기 버튼 클릭 시
            else if (target.classList.contains('add-to-cart-btn')) {
                const productId = parseInt(target.dataset.productId); // 상품 ID
                addToCart(productId); // 장바구니 추가 함수 호출
            }
        });
        console.log('상품 테이블 이벤트 리스너 추가됨');
    }
    
    // ========================================
    // 장바구니 관련 이벤트 리스너 설정
    // ========================================
    const cartBtn = document.getElementById('cartBtn'); // 장바구니 버튼
    const closeCart = document.getElementById('closeCart'); // 장바구니 닫기 버튼
    const checkoutBtn = document.getElementById('checkoutBtn'); // 구매하기 버튼
    
    // 장바구니 버튼 클릭 시 모달 표시
    if (cartBtn) {
        cartBtn.addEventListener('click', openCartModal);
    }
    
    // 장바구니 닫기 버튼 클릭 시 모달 숨김
    if (closeCart) {
        closeCart.addEventListener('click', closeCartModal);
    }
    
    // 구매하기 버튼 클릭 시 구매 페이지로 이동
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', goToCheckout);
    }
    
    // 장바구니 아이템 삭제 이벤트
    if (cartItems) {
        cartItems.addEventListener('click', (e) => {
            if (e.target.classList.contains('remove-btn')) {
                const productId = parseInt(e.target.dataset.productId);
                removeFromCart(productId);
            }
        });
    }
    
    // 장바구니 모달 외부 클릭 시 모달 닫기
    window.addEventListener('click', function(event) {
        if (event.target === cartModal) {
            closeCartModal();
        }
    });
    
    console.log('모든 이벤트 리스너가 설정되었습니다.'); // 설정 완료 확인
}); 