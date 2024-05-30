document.addEventListener("DOMContentLoaded", function() {
    const paymentDetails = document.getElementById("payment-details");

    document.querySelectorAll('input[name="payment_method"]').forEach((elem) => {
        elem.addEventListener("change", function(event) {
            updatePaymentDetails(event.target.value);
        });
    });

    function updatePaymentDetails(paymentMethod) {
        paymentDetails.innerHTML = ""; // Clear previous details
        if (paymentMethod === "credit_card") {
            paymentDetails.innerHTML = `
                <div class="card-details">
                    <div class="cardnumber">
                        <label for="card-number">Card Number:</label>
                        <input type="text" id="card-number" name="card_number" maxlength="12" required>
                        <div id="card-type"></div> <!-- Updated here -->
                    </div><br>
                    
                    <div class="cardexpiry">
                        <label for="card-expiry">Expiry Date:</label>
                        <input type="text" id="card-expiry" name="card_expiry" placeholder="MM/YY" maxlength="5" required>
                    </div><br>
    
                    <div class="cardcvc">
                        <label for="card-cvc">CVC:</label>
                        <input type="text" id="card-cvc" name="card_cvc" maxlength="3" required>
                    </div><br>
                </div>
            `;
    
            document.getElementById("card-number").addEventListener("input", handleCardNumberInput);
            document.getElementById("card-cvc").addEventListener("input", handleCVCInput);
            document.getElementById("card-expiry").addEventListener("input", handleExpiryDateInput);
        } else if (paymentMethod === "paypal") {
            paymentDetails.innerHTML = `
                <p>You will be redirected to PayPal to complete your purchase.</p>
            `;
        } else if (paymentMethod === "cod") {
            paymentDetails.innerHTML = `
                <p>Cash on Delivery is selected. You will pay when the order is delivered.</p>
            `;
        }
    }

    // Set initial payment details
    updatePaymentDetails(document.querySelector('input[name="payment_method"]:checked').value);

    document.getElementById("confirm-payment").addEventListener("click", function() {
        const selectedPaymentMethod = document.querySelector('input[name="payment_method"]:checked').value;
    
        if (selectedPaymentMethod === "credit_card") {
            // Check if the card logo is displayed
            const cardTypeDisplay = document.getElementById("card-type");
            if (!cardTypeDisplay.querySelector("img")) {
                alert("Please enter a valid card number.");
                return;
            }
    
            // Validate card details before proceeding with payment
            const cardNumber = document.getElementById("card-number").value;
            const cardExpiry = document.getElementById("card-expiry").value;
            const cardCVC = document.getElementById("card-cvc").value;
    
            if (!validateCardNumber(cardNumber)) {
                alert("Invalid card number. Please enter 12 digits.");
                return;
            }
    
            if (!validateExpiryDate(cardExpiry)) {
                alert("Invalid expiry date. Use MM/YY format.");
                return;
            }
    
            if (!validateCVC(cardCVC)) {
                alert("Invalid CVC. Please enter 3 digits.");
                return;
            }
    
            // If all validations pass, proceed with payment
            handleCreditCardPayment();
        } else if (selectedPaymentMethod === "paypal") {
            handlePayPalPayment();
        } else if (selectedPaymentMethod === "cod") {
            handleCODPayment();
        }
    });
    
    

    function handleCreditCardPayment() {
        const cardNumber = document.getElementById("card-number").value;
        const cardExpiry = document.getElementById("card-expiry").value;
        const cardCVC = document.getElementById("card-cvc").value;

        alert("Payment successful!");
        // Proceed with payment processing (client-side only)
    }

    function validateCardNumber(cardNumber) {
        return /^\d{12}$/.test(cardNumber);  // Check if the card number is exactly 12 digits
    }

    function validateExpiryDate(expiryDate) {
        return /^\d{2}\/\d{2}$/.test(expiryDate); // Check if the expiry date is in MM/YY format
    }

    function validateCVC(cvc) {
        return /^\d{3}$/.test(cvc);  // Check if the CVC is exactly 3 digits
    }

    function handlePayPalPayment() {
        // Redirect to PayPal for payment
        window.location.href = "https://www.paypal.com/checkoutnow?token=YOUR_PAYPAL_TOKEN";
    }

    function handleCODPayment() {
        alert("Cash on Delivery selected. You will pay when the order is delivered.");
    }

    // Additional input constraints and card type detection
    function handleCardNumberInput() {
        const cardNumberInput = document.getElementById("card-number");
        const cardTypeDisplay = document.getElementById("card-type");
    
        cardNumberInput.value = cardNumberInput.value.replace(/\D/g, '').substring(0, 12);
    
        const cardNumber = cardNumberInput.value;
        const cardType = getCardType(cardNumber);

        if (cardType) {
            // Create an image element for the card logo
            const cardLogo = document.createElement("img");
            cardLogo.src = `${cardType.toLowerCase()}-logo.png`; // Assuming card logo filenames are lowercase
    
            // Create a text node for the card type
            const cardTypeText = document.createTextNode(cardType);
    
            // Clear any previous content
            cardTypeDisplay.innerHTML = "";
    
            // Append the logo and text to the card type display
            cardTypeDisplay.appendChild(cardLogo);
            cardTypeDisplay.appendChild(cardTypeText);
            
            // Remove invalid class if present
            cardNumberInput.classList.remove("invalid");
        } else {
            cardTypeDisplay.innerHTML = "Invalid Card Type"; // Display invalid message
            // Add invalid class to card input
            cardNumberInput.classList.add("invalid");
        }
    }

    function getCardType(cardNumber) {
        const cardPatterns = {
            "Visa": /^4/,
            "MasterCard": /^5[1-5]/,
            "American Express": /^3[47]/,
            "Diners Club": /^3(?:0[0-5]|[68])/,
            "Discover": /^6(?:011|5)/,
            "JCB": /^(?:2131|1800|35)/,
            "Rupay": /^(?:6521|6522)/,
            "Maestro": /^(?:5018|5020|5038|6304|6759|6761|6763)/
        };
        
        for (const [cardType, pattern] of Object.entries(cardPatterns)) {
            if (pattern.test(cardNumber)) {
                return cardType;
            }
        }
        return null;
    }

    function handleCVCInput() {
        const cvcInput = document.getElementById("card-cvc");
        cvcInput.value = cvcInput.value.replace(/\D/g, '').substring(0, 3); // Restrict input to 3 digits
    }

    function validateExpiryDate(expiryDate) {
        if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
            return false;
        }
        const [month, year] = expiryDate.split('/').map(Number);
        if (month < 1 || month > 12) {
            return false;
        }
        const currentYear = new Date().getFullYear() % 100;
        const currentMonth = new Date().getMonth() + 1;
        if (year < currentYear || (year === currentYear && month < currentMonth)) {
            return false;
        }
        return true;
    }
    function handleExpiryDateInput() {
        const expiryInput = document.getElementById("card-expiry");
        expiryInput.value = expiryInput.value
            .replace(/\D/g, '')
            .substring(0, 4)
            .replace(/(\d{2})(\d)/, '$1/$2');
    }
    
});



document.addEventListener("DOMContentLoaded", function() {
    displayCartItems();
});

function displayCartItems() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartContainer = document.getElementById('cart-items');
    const reviewTotalPriceContainer = document.getElementById('review-total-price');
    const summaryTotalPriceContainer = document.getElementById('summary-total-price');
    const orderTotalPriceContainer = document.getElementById('order-total-price');
    
    cartContainer.innerHTML = '';
  
    let totalPrice = 0;
  
    cartItems.forEach(item => {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.classList.add('cart-item');
        
        const img = document.createElement('img');
        img.src = item.imgSrc;
        img.alt = item.name;
        cartItemDiv.appendChild(img);
  
        const details = document.createElement('div');
        details.classList.add('item-details');
        
        // Display item name with quantity
        const name = document.createElement('h3');
        name.textContent = `${item.quantity}x ${item.name}`;
        details.appendChild(name);
  
        const amount = document.createElement('p');
        amount.textContent = `Amount: ${item.amount}`;
        details.appendChild(amount);
  
        const price = document.createElement('p');
        price.textContent = `Price: ₹${item.price * item.quantity}`;
        details.appendChild(price);
  
        cartItemDiv.appendChild(details);
        cartContainer.appendChild(cartItemDiv);
  
        totalPrice += item.price * item.quantity;
    });
  
    const totalPriceText = `₹${totalPrice}`;
    reviewTotalPriceContainer.textContent = totalPriceText;
    summaryTotalPriceContainer.textContent = totalPriceText;
    orderTotalPriceContainer.textContent = totalPriceText;
}
