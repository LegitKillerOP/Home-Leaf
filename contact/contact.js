function sendEmail() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  const mailtoLink = `mailto:gme3396@gmail.com?subject=Contact%20Us&body=Name:%20${name}%0AEmail:%20${email}%0AMessage:%20${message}`;

  window.location.href = mailtoLink;
}
