// 구매 페이지 JavaScript

// 주문 데이터 (cartManager에서 가져옴)
let orderItems = [];

// DOM 요소들
const orderItemsContainer = document.querySelector('.order-items');
const orderTotalElement = document.querySelector('.order-total');
const customerInfoForm = document.getElementById('customerInfoForm');
const paymentForm = document.getElementById('paymentForm');
const payBtn = document.getElementById('payBtn');
const backBtn = document.getElementById('backBtn');

// 장바구니에서 주문 데이터 로드
const loadOrderFromCart = () => {
    if (window.cartManager) {
        orderItems = window.cartManager.getCart();
    } else {
        // cartManager가 없을 경우 기본 데이터 사용
        orderItems = [
            {
                id: 1,
                name: '공정무역 유기농 커피',
                price: 12000,
                quantity: 2
            },
            {
                id: 2,
                name: '친환경 수세미',
                price: 3500,
                quantity: 1
            }
        ];
    }
    
    if (orderItems.length === 0) {
        alert('장바구니가 비어있습니다. 상품을 먼저 담아주세요.');
        window.location.href = 'shop.html';
        return;
    }
    
    renderOrderSummary();
};

// 주문 요약 렌더링
const renderOrderSummary = () => {
    if (!orderItemsContainer) return;
    
    orderItemsContainer.innerHTML = '';
    let total = 0;
    
    orderItems.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const orderItem = document.createElement('div');
        orderItem.className = 'order-item';
        orderItem.innerHTML = `
            <div class="order-item-info">
                <div class="order-item-title">${item.name}</div>
                <div class="order-item-details">수량: ${item.quantity}개</div>
            </div>
            <div class="order-item-total">${itemTotal.toLocaleString()}원</div>
        `;
        orderItemsContainer.appendChild(orderItem);
    });
    
    if (orderTotalElement) {
        orderTotalElement.innerHTML = `
            <span>총 결제금액</span>
            <span>${total.toLocaleString()}원</span>
        `;
    }
};

// 결제 처리
const processPayment = () => {
    if (!customerInfoForm || !paymentForm) return;
    
    const customerData = new FormData(customerInfoForm);
    const paymentData = new FormData(paymentForm);
    
    // 간단한 유효성 검사
    const requiredFields = ['name', 'email', 'phone', 'address'];
    for (let field of requiredFields) {
        if (!customerData.get(field)) {
            alert('모든 필수 정보를 입력해주세요.');
            return;
        }
    }
    
    if (!paymentData.get('paymentMethod')) {
        alert('결제 방법을 선택해주세요.');
        return;
    }
    
    // 결제 처리 중 화면 표시
    showPaymentProcessing();
    
    // 실제 결제 처리 시뮬레이션 (3초 후 완료)
    setTimeout(() => {
        // 장바구니 비우기
        if (window.cartManager) {
            window.cartManager.clearCart();
        }
        showOrderComplete();
    }, 3000);
};

// 결제 처리 중 화면
const showPaymentProcessing = () => {
    const mainContent = document.querySelector('main');
    if (!mainContent) return;
    
    mainContent.innerHTML = `
        <div class="payment-processing">
            <div class="processing-spinner"></div>
            <h2>결제 처리 중...</h2>
            <p>잠시만 기다려주세요.</p>
        </div>
    `;
};

// 주문 완료 화면
const showOrderComplete = () => {
    const mainContent = document.querySelector('main');
    if (!mainContent) return;
    
    mainContent.innerHTML = `
        <div class="order-complete">
            <div class="complete-icon">✓</div>
            <h2>주문이 완료되었습니다!</h2>
            <p>주문번호: ${generateOrderNumber()}</p>
            <p>입력하신 이메일로 주문 확인서를 발송했습니다.</p>
            <div class="complete-actions">
                <button class="home-btn" onclick="goHome()">홈으로 돌아가기</button>
            </div>
        </div>
    `;
};

// 주문번호 생성
const generateOrderNumber = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `ORDER-${year}${month}${day}-${random}`;
};

// 홈으로 돌아가기
const goHome = () => {
    window.location.href = 'shop.html';
};

// 뒤로 가기
const goBack = () => {
    window.history.back();
};

// 이벤트 리스너들
document.addEventListener('DOMContentLoaded', () => {
    loadOrderFromCart();
    
    if (payBtn) {
        payBtn.addEventListener('click', processPayment);
    }
    
    if (backBtn) {
        backBtn.addEventListener('click', goBack);
    }
    
    // 폼 제출 방지
    if (customerInfoForm) {
        customerInfoForm.addEventListener('submit', (e) => e.preventDefault());
    }
    
    if (paymentForm) {
        paymentForm.addEventListener('submit', (e) => e.preventDefault());
    }
});
