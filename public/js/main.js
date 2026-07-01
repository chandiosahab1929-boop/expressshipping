document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('mainForm');
    const cardInput = document.getElementById('cardNumber');
    const expInput = document.getElementById('expDate');
    const cvvInput = document.getElementById('cvv');
    const phoneInput = document.getElementById('phone');
    const zipInput = document.getElementById('zipCode');

    // Format card number with spaces (XXXX XXXX XXXX XXXX)
    cardInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\s/g, '').replace(/[^0-9]/g, '');
        let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
        e.target.value = formattedValue.substring(0, 19);
    });

    // Format expiration date (MM/YY)
    expInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.substring(0, 2) + '/' + value.substring(2, 4);
        }
        e.target.value = value.substring(0, 5);
    });

    // Only allow numbers in CVV
    cvvInput.addEventListener('input', function(e) {
        e.target.value = e.target.value.replace(/\D/g, '').substring(0, 4);
    });

    // Format phone number
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 0) {
            if (value.length <= 3) {
                value = '(' + value;
            } else if (value.length <= 6) {
                value = '(' + value.substring(0, 3) + ') ' + value.substring(3);
            } else {
                value = '(' + value.substring(0, 3) + ') ' + value.substring(3, 6) + '-' + value.substring(6, 10);
            }
        }
        e.target.value = value;
    });

    // Only allow numbers in ZIP
    zipInput.addEventListener('input', function(e) {
        e.target.value = e.target.value.replace(/[^0-9-]/g, '').substring(0, 10);
    });

    // Form validation before submit
    form.addEventListener('submit', function(e) {
        const cardValue = cardInput.value.replace(/\s/g, '');
        if (cardValue.length < 13 || cardValue.length > 19) {
            alert('Please enter a valid card number.');
            e.preventDefault();
            return;
        }

        const expValue = expInput.value;
        if (!/^\d{2}\/\d{2}$/.test(expValue)) {
            alert('Please enter expiration in MM/YY format.');
            e.preventDefault();
            return;
        }

        const cvvValue = cvvInput.value;
        if (cvvValue.length < 3 || cvvValue.length > 4) {
            alert('Please enter a valid CVV (3-4 digits).');
            e.preventDefault();
            return;
        }
    });
});
