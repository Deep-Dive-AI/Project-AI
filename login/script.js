// Schakelen tussen de inlog- en registratieformulieren
const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const forgotPasswordForm = document.getElementById("forgotPasswordForm");

loginBtn.addEventListener("click", () => {
  showLogin();
});

registerBtn.addEventListener("click", () => {
  registerForm.classList.add("active");
  loginForm.classList.remove("active");
  forgotPasswordForm.classList.remove("active");
  registerBtn.classList.add("active");
  loginBtn.classList.remove("active");
});

// Functie om inlogformulier weer te geven
function showLogin() {
  loginForm.classList.add("active");
  registerForm.classList.remove("active");
  forgotPasswordForm.classList.remove("active");
  loginBtn.classList.add("active");
  registerBtn.classList.remove("active");
}

// Functie om wachtwoord vergeten formulier weer te geven
function showForgotPassword() {
  forgotPasswordForm.classList.add("active");
  loginForm.classList.remove("active");
  registerForm.classList.remove("active");
  loginBtn.classList.remove("active");
  registerBtn.classList.remove("active");
}

// Inloggen functie
function handleLogin(event) {
  event.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;
  
  if (email && password) {
    alert(`Inloggen succesvol voor ${email}`);
  } else {
    alert("Vul alstublieft alle velden in.");
  }
}

// Registreren functie
function handleRegister(event) {
  event.preventDefault();
  const username = document.getElementById("registerUsername").value;
  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;
  
  if (username && email && password) {
    alert(`Registratie succesvol voor ${username}`);
  } else {
    alert("Vul alstublieft alle velden in.");
  }
}

// Wachtwoord vergeten functie
function handleForgotPassword(event) {
  event.preventDefault();
  const email = document.getElementById("forgotEmail").value;
  
  if (email) {
    alert(`Wachtwoordherstel verzoek verzonden naar ${email}`);
  } else {
    alert("Vul je e-mailadres in.");
  }
}
