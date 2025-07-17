document.addEventListener('DOMContentLoaded', () => {
    const customRadio = document.getElementById('amount-custom');
    const customInput = document.getElementById('custom-amount-input');
    const donationRadios = document.querySelectorAll('input[name="donation-amount"]');

    function toggleCustomInput() {
        if (customRadio.checked) {
            customInput.disabled = false;
            customInput.focus();
        } else {
            customInput.disabled = true;
            customInput.value = '';
        }
    }

    donationRadios.forEach(radio => {
        radio.addEventListener('change', toggleCustomInput);
    });

    toggleCustomInput(); // 초기 상태 설정
});
