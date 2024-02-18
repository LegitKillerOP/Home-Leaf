function redirectToRecipe(recipePage) {
  window.location.href = recipePage;
}

$(window).scroll(function(){
  if ($(this).scrollTop() > 1000) {
      $('.scroll-up-btn').addClass(" show");
      console.log('test1');
  }
});
$('.scroll-up-btn').click(function(){
  $('html, body').animate({scrollTop : 0},800);
  return false;
});