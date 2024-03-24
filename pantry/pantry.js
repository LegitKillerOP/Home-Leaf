$('.scroll-up-btn').click(function(){
    $('html, body').animate({scrollTop : 0},800);
    return false;
});
function calculatePrice(cardId) {
    var amountDropdown = document.getElementById('amount' + cardId.slice(-1));
    var priceDisplay = document.getElementById('price' + cardId.slice(-1));

    var priceMap = {
        'card1': { '250g': 17, '500g': 34, '1kg': 78 },
        'card2': { '250g': 11, '500g': 22, '1kg': 44 },
        'card3': { '1pc - (approx. 400g to 600g)': 19},
        'card4': { '100g': 12, '250g': 30},
        'card5': { '1L': 116, '2L': 232}
    };

    var selectedAmount = amountDropdown.value;
    priceDisplay.textContent = 'Price: ₹' + priceMap[cardId][selectedAmount];
}
document.addEventListener("DOMContentLoaded", function () {
    const cardContainer = document.querySelector(".smart-basket .card-container");
    const cards = document.querySelectorAll(".smart-basket .card");
    const leftArrow = document.querySelector(".smart-basket .left-arrows");
    const rightArrow = document.querySelector(".smart-basket .right-arrow");
    const cardWidth = cards[0].offsetWidth;
    const numVisibleCards = 4;
    let startIndex = 0;

    function updateVisibility() {
        cards.forEach((card, index) => {
            if (index >= startIndex && index < startIndex + numVisibleCards) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    }

    function updateArrows() {
        leftArrow.style.display = startIndex === 0 ? "none" : "block";
        rightArrow.style.display = startIndex + numVisibleCards >= cards.length ? "none" : "block";
    }

    leftArrow.addEventListener("click", function () {
        if (startIndex > 0) {
            startIndex -= numVisibleCards;
            updateVisibility();
            updateArrows();
        }
    });

    rightArrow.addEventListener("click", function () {
        if (startIndex + numVisibleCards < cards.length) {
            startIndex += numVisibleCards;
            updateVisibility();
            updateArrows();
        }
    });

    updateVisibility();
    updateArrows();
});