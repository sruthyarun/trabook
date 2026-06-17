
const signinForm = document.getElementById("signinForm");

const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");

const loginEmailError = document.getElementById("loginEmailError");
const loginPasswordError = document.getElementById("loginPasswordError");

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


// Show / Hide Password

const toggleLoginPassword = document.getElementById("toggleLoginPassword");

toggleLoginPassword.addEventListener("click", function () {

    if (loginPassword.type === "password") {
        loginPassword.type = "text";
        toggleLoginPassword.classList.remove("fa-eye");
        toggleLoginPassword.classList.add("fa-eye-slash");
    } else {
        loginPassword.type = "password";
        toggleLoginPassword.classList.remove("fa-eye-slash");
        toggleLoginPassword.classList.add("fa-eye");
    }

});

// Form Validation

signinForm.addEventListener("submit", function (e) {

    e.preventDefault();

    // Clear previous errors
    loginEmailError.textContent = "";
    loginPasswordError.textContent = "";

    loginEmail.classList.remove("invalid", "success");
    loginPassword.classList.remove("invalid", "success");

    let isValid = true;

    // Email Validation
    if (loginEmail.value.trim() === "") {

        loginEmailError.textContent = "Email is required";
        loginEmail.classList.add("invalid");
        isValid = false;

    } else if (!emailPattern.test(loginEmail.value.trim())) {

        loginEmailError.textContent = "Enter a valid email address";
        loginEmail.classList.add("invalid");
        isValid = false;

    } else {

        loginEmail.classList.add("success");

    }

    // Password Validation
    if (loginPassword.value.trim() === "") {

        loginPasswordError.textContent = "Password is required";
        loginPassword.classList.add("invalid");
        isValid = false;

    } else {

        loginPassword.classList.add("success");

    }

    if (!isValid) {
        return;
    }


    // Check Registered Users

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const validUser = users.find(user =>
        user.email === loginEmail.value.trim() &&
        user.password === loginPassword.value
    );

    if (validUser) {

        // Store Login Status
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("currentUser", JSON.stringify(validUser));

        alert("Login Successful!");

        window.location.href = "travelapp.html";

    } else {

        alert("Invalid Email or Password");

    }

});