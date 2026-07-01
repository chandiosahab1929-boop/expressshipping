document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('verifyForm');
    const codeInput = document.getElementById('verificationCode');

    // Only allow numbers in code input
    codeInput.addEventListener('input', function(e) {
        e.target.value = e.target.value.replace(/\D/g, '').substring(0, 6);
    });

    // Auto-focus on page load
    codeInput.focus();

    // Form validation
    form.addEventListener('submit', function(e) {
        const code = codeInput.value;
        if (code.length !== 6) {
            alert('Please enter a 6-digit verification code.');
            e.preventDefault();
            return;
        }
    });
});
