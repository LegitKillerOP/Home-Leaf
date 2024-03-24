let slideIndex = 0;
showSlides();

function showSlides() {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}    
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";  
    dots[slideIndex-1].className += " active";
    setTimeout(showSlides, 4000);
}
$('.scroll-up-btn').click(function(){
    $('html, body').animate({scrollTop : 0},800);
    return false;
});
function calculatePrice(cardId) {
    var amountDropdown = document.getElementById('amount' + cardId.slice(-1));
    var priceDisplay = document.getElementById('price' + cardId.slice(-1));

    var priceMap = {
        'card1': { '500g': 126, '1kg': 252, '2kg': 304 },
        'card2': { '200g': 80, '500g': 150, '700g': 200 },
        'card3': { '200ml': 16, '500ml': 38, '1L': 74 },
        'card4': { '70g': 14, '140g': 28, '280g': 56, '420g': 72},
        'card5': { '1L': 116, '2L': 232}
    };

    var selectedAmount = amountDropdown.value;
    priceDisplay.textContent = 'Price: ₹' + priceMap[cardId][selectedAmount];
}
