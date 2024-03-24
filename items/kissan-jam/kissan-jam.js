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
      '200g': { price: 80, mrp: 80 },
      '500g': { price: 150, mrp: 150 },
      '700g': { price: 200, mrp: 200 }
  };

  var selectedAmount = amountDropdown.value;
  var selectedPrice = priceMap[selectedAmount].price;
  var selectedMRP = priceMap[selectedAmount].mrp;

  priceDisplay.textContent = 'Price: ₹' + selectedPrice;
  mrpDisplay.textContent = '₹' + selectedMRP;
}