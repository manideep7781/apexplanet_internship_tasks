document.getElementById("contactForm").addEventListener("submit", function(event) {
  event.preventDefault(); // stop refresh

  let name = document.getElementById("name").value.trim();
  let email = document.getElementById("email").value.trim();
  let message = document.getElementById("message").value.trim();
  let formMessage = document.getElementById("formMessage");

  if (name.length < 3) {
    formMessage.textContent = "Name must be at least 3 characters.";
    formMessage.style.color = "red";
    return;
  }

  let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    formMessage.textContent = "Enter a valid email.";
    formMessage.style.color = "red";
    return;
  }

  if (message.length < 10) {
    formMessage.textContent = "Message must be at least 10 characters.";
    formMessage.style.color = "red";
    return;
  }

  formMessage.textContent = "Form submitted successfully ✅";
  formMessage.style.color = "green";
  document.getElementById("contactForm").reset();
});
