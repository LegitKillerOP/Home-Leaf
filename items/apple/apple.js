$('.scroll-up-btn').click(function(){
    $('html, body').animate({scrollTop : 0},800);
    return false;
});

$('.icons .img2').click(function(){
  const icons = document.querySelectorAll('.icons img');
  const mainImages = document.querySelectorAll('.main-img img');
  
  icons[0].classList.remove('active');
  icons[0].style.border = 'none';
  icons[1].style.border = '2px solid #ffe9b8';
  mainImages[0].style.display = 'none';
  mainImages[1].style.display = 'block';
});

$('.icons .img1').click(function(){
  const icons = document.querySelectorAll('.icons img');
  const mainImages = document.querySelectorAll('.main-img img');
  
  icons[1].classList.remove('active');
  icons[1].style.border = 'none';
  icons[0].style.border = '2px solid #ffe9b8';
  mainImages[1].style.display = 'none';
  mainImages[0].style.display = 'block';
});

function calculatePrice(cardId) {
  var amountDropdown = document.getElementById('amount1');
  var priceDisplay = document.getElementById('price1');
  var mrpDisplay = document.getElementById('mrp1');

  var priceMap = {
      '500g': { price: 126, mrp: 150 },
      '1kg': { price: 252, mrp: 280 },
      '2kg': { price: 304, mrp: 340 }
  };

  var selectedAmount = amountDropdown.value;
  var selectedPrice = priceMap[selectedAmount].price;
  var selectedMRP = priceMap[selectedAmount].mrp;

  priceDisplay.textContent = 'Price: ₹' + selectedPrice;
  mrpDisplay.textContent = '₹' + selectedMRP;
}