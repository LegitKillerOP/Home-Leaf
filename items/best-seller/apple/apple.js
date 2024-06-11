$('.scroll-up-btn').click(function(){
    $('html, body').animate({scrollTop : 0},800);
    return false;
});

$('.icons .img2').click(function(){
  const icons = document.querySelectorAll('.icons img');
  const mainImages = document.querySelectorAll('.main-img img');
  
  icons[0].classList.remove('active');
  icons[0].style.border = '#e0e0e0 2px solid';
  icons[1].style.border = '2px solid #ffe9b8';
  mainImages[0].style.display = 'none';
  mainImages[1].style.display = 'block';
});

$('.icons .img1').click(function(){
  const icons = document.querySelectorAll('.icons img');
  const mainImages = document.querySelectorAll('.main-img img');
  
  icons[1].classList.remove('active');
  icons[1].style.border = '#e0e0e0 2px solid';
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
function addToCart(button) {
  const item = button.closest('.item');
  const name = item.querySelector('.heading h3').textContent;
  const amount = item.querySelector('.amount select').value;
  const price = parseFloat(item.querySelector('.price p').textContent.split('₹')[1]);
  const imgSrc = item.querySelector('.img1.active img').src; // Get the image URL

  let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  let existingItem = cartItems.find(cartItem => cartItem.name === name && cartItem.amount === amount);

  if (existingItem) {
      // If the item already exists in the cart, increment its quantity
      existingItem.quantity += 1;
  } else {
      // Otherwise, add a new item to the cart
      const cartItem = { name, amount, price, imgSrc, quantity: 1 };
      cartItems.push(cartItem);
  }
  
  // Store updated cart in localStorage
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  
  alert('Item added to cart!');
}