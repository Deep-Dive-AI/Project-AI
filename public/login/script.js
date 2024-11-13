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

function showLogin() {
  loginForm.classList.add("active");
  registerForm.classList.remove("active");
  forgotPasswordForm.classList.remove("active");
  loginBtn.classList.add("active");
  registerBtn.classList.remove("active");
}

function showForgotPassword() {
  forgotPasswordForm.classList.add("active");
  loginForm.classList.remove("active");
  registerForm.classList.remove("active");
  loginBtn.classList.remove("active");
  registerBtn.classList.remove("active");
}

async function handleRegister(event) {
    event.preventDefault();
    const username = document.getElementById("registerUsername").value;
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;
  
    try {
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
      });
      const result = await response.json();
      alert(result.message);
    } catch (error) {
      console.error("Fout bij registratie:", error);
    }
  }
  
  async function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
  
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
      const result = await response.json();
      alert(result.message);
    } catch (error) {
      console.error("Fout bij inloggen:", error);
    }
  }
  
  async function handleForgotPassword(event) {
    event.preventDefault();
    const email = document.getElementById("forgotEmail").value;
  
    try {
      const response = await fetch('http://localhost:3000/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });
      const result = await response.json();
      alert(result.message);
    } catch (error) {
      console.error("Fout bij wachtwoordherstel:", error);
    }
  }
  
  function showForgotPassword() {
    document.getElementById("loginForm").classList.remove("active");
    document.getElementById("forgotPasswordForm").classList.add("active");
  }
  
  function showLogin() {
    document.getElementById("forgotPasswordForm").classList.remove("active");
    document.getElementById("loginForm").classList.add("active");
  }