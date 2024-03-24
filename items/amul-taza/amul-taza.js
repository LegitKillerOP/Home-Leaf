$('.scroll-up-btn').click(function(){
    $('html, body').animate({scrollTop : 0},800);
    return false;
});

function calculatePrice(cardId) {
  var amountDropdown = document.getElementById('amount1');
  var priceDisplay = document.getElementById('price1');
  var mrpDisplay = document.getElementById('mrp1');

  var priceMap = {
      '200ml': { price: 16, mrp: 16 },
      '500ml': { price: 38, mrp: 38 },
      '1L': { price: 74, mrp: 74 }
  };

  var selectedAmount = amountDropdown.value;
  var selectedPrice = priceMap[selectedAmount].price;
  var selectedMRP = priceMap[selectedAmount].mrp;

  priceDisplay.textContent = 'Price: ₹' + selectedPrice;
  mrpDisplay.textContent = '₹' + selectedMRP;
}