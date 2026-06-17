// Signup Form Validation

const signupForm = document.getElementById("signupForm");

const fullname = document.getElementById("fullname");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const city = document.getElementById("city");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

// Error Elements
const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const phoneError = document.getElementById("phoneError");
const cityError = document.getElementById("cityError");
const passwordError = document.getElementById("passwordError");
const confirmPasswordError = document.getElementById("confirmPasswordError");

// Regular Expressions
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[0-9]{10}$/;
const cityPattern = /^[A-Za-z\s]+$/;
const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

// Show/Hide Password
const togglePassword = document.getElementById("togglePassword");
const toggleConfirmPassword = document.getElementById("toggleConfirmPassword");

togglePassword.addEventListener("click", () => {
    password.type = password.type === "password" ? "text" : "password";
    togglePassword.classList.toggle("fa-eye");
    togglePassword.classList.toggle("fa-eye-slash");
});

toggleConfirmPassword.addEventListener("click", () => {
    confirmPassword.type =
        confirmPassword.type === "password" ? "text" : "password";
    toggleConfirmPassword.classList.toggle("fa-eye");
    toggleConfirmPassword.classList.toggle("fa-eye-slash");
});

// Form Submit
signupForm.addEventListener("submit", function (e) {

    e.preventDefault();

    let isValid = true;

    // Reset Errors
    document.querySelectorAll(".error").forEach(error => error.textContent = "");
    document.querySelectorAll("input").forEach(input => {
        input.classList.remove("invalid");
        input.classList.remove("success");
    });

    // Full Name
    if (fullname.value.trim() === "") {
        nameError.textContent = "Full Name is required";
        fullname.classList.add("invalid");
        isValid = false;
    } else {
        fullname.classList.add("success");
    }

    // Email
    if (!emailPattern.test(email.value.trim())) {
        emailError.textContent = "Enter a valid Email";
        email.classList.add("invalid");
        isValid = false;
    } else {
        email.classList.add("success");
    }

    // Phone
    if (!phonePattern.test(phone.value.trim())) {
        phoneError.textContent = "Phone number must contain 10 digits";
        phone.classList.add("invalid");
        isValid = false;
    } else {
        phone.classList.add("success");
    }

    // City
    if (!cityPattern.test(city.value.trim())) {
        cityError.textContent = "City should contain only alphabets";
        city.classList.add("invalid");
        isValid = false;
    } else {
        city.classList.add("success");
    }

    // Password
    if (!passwordPattern.test(password.value)) {
        passwordError.textContent =
            "Password must be at least 8 characters and contain letters & numbers";
        password.classList.add("invalid");
        isValid = false;
    } else {
        password.classList.add("success");
    }

    // Confirm Password
    if (confirmPassword.value !== password.value) {
        confirmPasswordError.textContent = "Passwords do not match";
        confirmPassword.classList.add("invalid");
        isValid = false;
    } else {
        confirmPassword.classList.add("success");
    }

    if (!isValid) return;

    // Check if Email already exists
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const existingUser = users.find(user => user.email === email.value.trim());

    if (existingUser) {
        alert("This email is already registered.");
        return;
    }

    // Create User Object
    const user = {
        fullname: fullname.value.trim(),
        email: email.value.trim(),
        phone: phone.value.trim(),
        city: city.value.trim(),
        password: password.value
    };

    // Save User
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration Successful!");

    signupForm.reset();

    window.location.href = "index.html";
});